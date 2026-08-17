# 2. The Stock Helper Methods

[← Back to overview](overview.md)

All live in `app/Traits/ProductTrait.php`. Each helper updates the relevant columns in a
single `$product->update([...])` call and always recomputes `available_stock`.

> **Product type awareness:** Stock helpers are only invoked for `product_type` in
> `['goods', 'parts', 'finished_goods']`. Services, equipment, and tools have no
> physical inventory and are skipped. See
> [Visit / Job Lifecycle](visit-job-lifecycle.md#stock-tracked-product-types).

See [Stock Columns](stock-columns.md) for the columns and the invariant these
methods preserve.

---

## 2.1 commitProductStock — reserve stock

Called when a line item is booked on a visit/job. It **reserves** quantity; it does not
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

---

## 2.2 releaseProductStock — un-reserve stock

Called on visit **edit** and **cancellation** to give reserved quantity back.

```php
$initial     = max(0, $product->initial_stock + $qty);
$committed   = max(0, $product->committed_stock - $qty);
$available   = max(0, $product->stock_on_hand - $committed);
// stock_on_hand is NOT changed
```

**Example (after the commit above):** release `qty = 40`:
`initial 60 → 100`, `committed 40 → 0`, `available 100`. Back to where we started.

---

## 2.3 consumeProductStock — physically use stock

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

---

## 2.4 adjustProductStock — manual in/out

Used by manual stock adjustments. Does **not** touch `committed_stock`.

```php
if ($type === 'subtraction') { $initial -= $qty; $stockOnHand -= $qty; }
else                         { $initial += $qty; $stockOnHand += $qty; }
$available = max(0, $stockOnHand - $committed);
```

**Examples:**
- add `qty = 10` → `stock_on_hand 60 → 70`, `available 70`.
- subtract `qty = 15` → `stock_on_hand 70 → 55`, `available 55`.

---

## 2.5 setProductStockAbsolute — set to absolute value

Used by the serialized finished-goods flow to sync part stock. `committed_stock` is kept.

```php
$initial     = $currentQty;
$stockOnHand = $currentQty;
$available   = max(0, $currentQty - $committed);
```

Next: [3. Module: Visit / Job lifecycle →](visit-job-lifecycle.md)
