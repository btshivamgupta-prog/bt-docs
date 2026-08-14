# Product Stock Management

> **Purpose** — explain how inventory stock columns are managed across the modules that
touch stock, so developers can extend the code safely without double-counting or
corrupting the numbers.

---



## 1. The stock columns

Each row in the `products` table stores four stock columns. Three of them are
**inputs** we write directly; the last one, `available_stock`, is always **derived**.

| Column            | Meaning                                                            | Notes                                   |
|-------------------|--------------------------------------------------------------------|-----------------------------------------|
| `initial_stock`   | Opening / tracked base quantity (synced with movements)            | Reduced on commit, restored on release |
| `stock_on_hand`   | Physical stock actually in hand                                    | Never drops below 0                     |
| `committed_stock` | Quantity reserved by open visits/jobs (not yet consumed)           | Sum of all open reservations            |
| `available_stock` | Quantity you can commit / dispatch right now                       | **Derived**, never written directly     |

### The invariant

```php
available_stock = max(0, stock_on_hand - committed_stock)
```

**:eyes: Always route stock writes through a helper** (section 2) so this invariant
stays intact. Never set `available_stock` (or the others) directly with a raw query.

> **Note on `initial_stock`:** it is *not* always equal to `stock_on_hand`. It is
> decreased when stock is **committed** and restored when released. For "how much do we
> physically have" always read `stock_on_hand` / `available_stock` instead.

---

## 2. The stock helper methods

All live in `app/Traits/ProductTrait.php`. Each helper updates the relevant columns in a
single `$product->update([...])` call and always recomputes `available_stock`.

### 2.1 `commitProductStock($productId, $qty, ...)` — reserve stock

Called when a line item is booked on a visit/job. It **reserves** quantity, it does not
physically remove anything.

```php
$initial     = max(0, $product->initial_stock - $qty);
$committed   = max(0, $product->committed_stock + $qty);
$available   = max(0, $product->stock_on_hand - $committed);
// stock_on_hand is NOT changed
```

**Example:** start `stock_on_hand = 100`, `committed = 0`, `available = 100`.
Commit `qty = 40`:
`initial 100 → 60`, `committed 0 → 40`, `available 60`.

### 2.2 `releaseProductStock($productId, $qty, ...)` — un-reserve stock

Called on visit **edit** and **cancellation** to give reserved quantity back.

```php
$initial     = max(0, $product->initial_stock + $qty);
$committed   = max(0, $product->committed_stock - $qty);
$available   = max(0, $product->stock_on_hand - $committed);
// stock_on_hand is NOT changed
```

**Example (after the commit above):** release `qty = 40`:
`initial 60 → 100`, `committed 40 → 0`, `available 100`. Back to where we started.

### 2.3 `consumeProductStock($productId, $qty, ...)` — physically use stock

Called when a visit is marked **completed** (items are actually used). This is the only
flow that lowers physical stock.

```php
$stockOnHand = max(0, $product->stock_on_hand - $qty);   // physical reduction
$committed   = max(0, $product->committed_stock - $qty); // reservation cleared
$available   = max(0, $stockOnHand - $committed);
```

**Example:** `stock_on_hand = 100`, `committed = 40`, `available = 60`. Consume `qty = 40`:
`stock_on_hand 100 → 60`, `committed 40 → 0`, `available 60`.

> **Key mental model:** *commit* only reserves, *consume* actually removes.

### 2.4 `adjustProductStock($productId, $qty, $type)` — manual in/out

Used by manual stock adjustments. Does **not** touch `committed_stock`.

```php
if ($type === 'subtraction') { $initial -= $qty; $stockOnHand -= $qty; }
else                         { $initial += $qty; $stockOnHand += $qty; }
$available = max(0, $stockOnHand - $committed);
```

**Examples:**
- add `qty = 10` → `stock_on_hand 60 → 70`, `available 70`.
- subtract `qty = 15` → `stock_on_hand 70 → 55`, `available 55`.

### 2.5 `setProductStockAbsolute($productId, $currentQty)` — set to absolute value

Used by the serialized finished-goods flow to sync part stock. `committed_stock` is kept.

```php
$initial     = $currentQty;
$stockOnHand = $currentQty;
$available   = max(0, $currentQty - $committed);
```

---

## 3. Module: Visit / Job lifecycle

Stock is **reserved** when a visit is saved and **consumed** only when the visit completes.

| Stage          | Trigger                                                                 | What happens                                          | Helper                                              |
|----------------|-------------------------------------------------------------------------|-------------------------------------------------------|-----------------------------------------------------|
| Create         | `TicketController::updateOrCreateV1` → `VisitTrait::traitCreateOrUpdateLineItem` | Reserve for every line-item quantity                  | `commitProductStock`                |
| Edit / Update  | same method on an existing visit                                       | Release old quantities, then re-commit the new ones   | `restoreVisitLineItemsForUpdate` → `releaseProductStock` + `commitProductStock` |
| Cancel         | `VisitController::markAsCancel`                                        | Release all reserved quantities for the visit         | `restoreVisitLineItem` → `releaseProductStock`                |
| Mark complete  | `TicketController` `mark_as_complete` action (`status 4`)              | Physically deduct stock and clear reservations        | `consumeVisitLineItemStock` → `consumeProductStock`          |

### Why edit re-releases stock (`restoreVisitLineItemsForUpdate`)

On an **edit**, existing line items are deleted and recreated. To avoid leaking
reservations, `ProductTrait::restoreVisitLineItemsForUpdate`:

1. Builds old/new quantity and serial maps keyed by `product_id`.
2. For products whose quantity changed (or any non-serialized product), releases the
   **old** committed quantity.
3. Restores any serials that disappeared from the payload (clears outbound flags,
   `activated = 1`).
4. Returns the diffs so the create step re-commits only the truly-new quantities/serials.

**Why per-product release?** `committed_stock` is a product-wide total shared across
*all* open visits. Releasing by this visit's *old* quantity keeps other visits untouched.

**Example (multiple visits):** `stock_on_hand = 100`.

| Step                            | committed | available |
|---------------------------------|-----------|-----------|
| Visit 1 commits 50              | 50        | 50        |
| Visit 2 commits 20              | 70        | 30        |
| Edit visit 1: release its 50    | 20        | 80        |
| Re-commit visit 1 at 10         | 30 (20 + 10) | 70    |

Final state is correct: **visit 1 = 10 + visit 2 = 20 → committed 30, available 70**.

---

## 4. Module: Serialized products

Serialized products keep one row per serial number in `product_serial_numbers`
(`text`, `activated`, `is_inbond`, `is_outbond`, `outbond_id`, `outbond_barcode`,
`outbond_module_type`, `out_bond_date`, `bond_type`).

### 4.1 Product creation — `ProductController::updateOrCreate`

Each serial is created as **inbound** and active:

```sql
activated = 1, product = <product_id>, is_inbond = 1,
inbond_id = <product_id>, inbond_barcode = <product barcode>,
inbond_module_type = 'product'
```

Stock totals for finished-goods parts are set via `setProductStockAbsolute`.

### 4.2 Booking a serialized item — `handleSerializedOutbond`

Serials are marked as **outbound** (assigned to the visit):

```sql
activated = 0,
outbond_id = <visit id>, outbond_barcode = <visit barcode>,
outbond_module_type = <'visit' | ...>,
is_outbond = 1, bond_type = 'outbond', out_bond_date = today
```

`committed_stock` is also reserved in parallel via `commitProductStock`. Edit / cancel
reset the serials back to `activated = 1, is_outbond = 0`.

### 4.3 Pick / install — `LineItemController::addVisitLineItemsByType`

Route: `POST /api/visit/{visit}/{type}` (`type = pickup|install`). Validations:

- `serial_numbers` are required and must belong to the product.
- Serial count must equal the picked / installed quantity.
- Duplicate serials are rejected.
- `install` cannot exceed remaining picked qty (`picked - alreadyInstalled`).
- Variance: `variance_quantity = max(0, line_item.quantity - install_quantity)`,
  plus a free-text `reason`.

---

## 5. Module: Stock adjustments

Manual stock in/out via `adjustProductStock` (`AdjustmentController`).

| Type          | Effect                                                        |
|---------------|---------------------------------------------------------------|
| `subtraction` | `initial_stock -= qty`, `stock_on_hand -= qty`, recompute available |
| `addition`    | `initial_stock += qty`, `stock_on_hand += qty`, recompute available |

`committed_stock` is **never** changed here — adjustments only affect physical stock.

---

## 6. Audit trail (inventory history)

Every stock change is written to `product_histories` through
`ActivityTrait::logProductActivity($request, $product, $description, $attributes)`
(backed by the `ProductHistory` model).

### 6.1 Recent improvement: consolidated logging

To avoid flooding the history table with one row per serial number, logging was
aggregated to **one row per action**:

- **Product serial creation** (`ProductController::updateOrCreate`): was one row per
  serial (1000 serials = 1000 rows); now a single row with a count + preview, full list
  in `attributes`:
  `Product #PRD-0008 | 1000 Serial Numbers Added (DSW-1, DSW-2, DSW-3, DSW-4, DSW-5, ...)`
- **Serialized outbond** (`ProductTrait::handleSerializedOutbond`): same consolidation:
  `Visit #VISIT-X | 1000 Serial Numbers Removed (DSW-11, ...)` — 1 row instead of 1000.
- **Visit update logging**: non-serialized products keep the accurate
  `Committed Qty | Available Qty` row as the sole update record; the intermediate
  `Released Qty` row is kept only for **serialized** products. This yields exactly one
  history row per action and avoids showing the pre-commit available number.

### 6.2 Example history messages

| Action                               | Message                                                               |
|--------------------------------------|----------------------------------------------------------------------|
| Visit created (commit)               | `Visit #VISIT-21 | Previous Committed Qty: 0 | Committed Qty: 50 | Available Qty: 50` |
| Visit edited, quantity lowered to 10 | `Visit #VISIT-21 | Previous Committed Qty: 0 | Committed Qty: 10 | Available Qty: 90` |
| Visit cancelled                      | `Visit #VISIT-21 Cancelled | Previous Qty: 50 | Restored Qty: 50 | Available Qty: 100` |
| Serials added to product             | `Product #PRD-0008 | 5 Serial Numbers Added: DSW-11, DSW-12, ...`    |
| Serials removed (outbond)            | `Visit #VISIT-X | 5 Serial Numbers Removed: DSW-11, DSW-12, ...`     |

---

## 7. Rules for developers

1. **Never write `available_stock` directly.** Always go through a helper from section 2
   so the invariant `available = stock_on_hand - committed` holds.
2. **Commit reserves; consume removes.** Use `commitProductStock` for reservations and
   `consumeProductStock` only when stock physically leaves (visit completion).
3. **Editing already releases + re-commits.** Don't hand-fix `committed_stock` in new
   code — reuse `restoreVisitLineItemsForUpdate` and its returned diffs.
4. **Aggregate history.** Prefer one `ProductHistory` row with a count + preview over N
   rows when an action touches many serials; keep the full list in `attributes`.
5. **Serialized products need both tracks in step.** Keep the quantity columns *and* the
   `product_serial_numbers` outbound flags consistent — use `handleSerializedOutbond` to
   mark outbound and reset them inline on release (as `restoreVisitLineItemsForUpdate` does).
