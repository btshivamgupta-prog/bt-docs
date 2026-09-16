# Customer Assets — End-to-End Flow

> This page follows a customer asset from **registration** to **part replacement/removal**,
> listing for every step: who does it, which screen, which backend call, and every database row
> that is touched.

---

## 1. High-level flow diagram

```text
Register Asset (Create-Client-Equipment.vue)
   │  POST /api/equipment-new         → equipment + customer_equipment_config
   │  (composition rides the payload) → finished_unit_components (type = 2)
   │                                    → bom_product_components (mirror, is_asset = 1)
   ▼
Detail Page (Detail-Equipment.vue)
   │  GET /api/equipment/{id}         → detail + composition + has_assignments
   ▼
Manage Composition (only while nothing is assigned)
   │  POST/PUT/DELETE /api/equipment-component/{id}/composition[/{line}]
   ▼
┌─────────────── is_consumable ? ───────────────┐
│ No: lines pre-assigned → only Replace/Remove  │ Yes: lines Pending → Assign first
└───────────────┬───────────────────────────────┘
                ▼
   Assign (consumable)      Replace               Remove
   POST /api/equipment-     POST /api/equipment-  POST /api/equipment-
   component/component/     component/component/  component/component/
   assign                   replace               remove
                ▼
   finished_unit_component_assignments  (+1 new row)
   finished_unit_component_replacements (+1 history row on replace)
   serial_number_movements              (+1..N ledger rows)
   products.available_stock / initial_stock   (stock +/−)
   product_serial_numbers.status / activated  (serial in/out of stock)
   finished_unit_components.assigned_qty / status  (line refresh)
   equipment.activated                  (asset status re-derived)
                ▼
   Tabs: Composition · Replacements · Movements   (live refresh)
```

---

## 2. Step 1 — Register the customer asset

**Who:** Admin / service desk.
**Screen:** `Create | Client Equipment` (`Create-Client-Equipment.vue`).
**API:** `POST /api/equipment-new` (update mode: `POST /api/equipment-new/{id}`).

### What the frontend sends

- All asset master fields: `customer`, `property`, `name`, `serial_no`, `model`, `brand`,
  `category`, `location`, `barcode`, `warranty_*`, `delivery_*`, `end_life`, machine-specific
  config fields (stored in `customer_equipment_config`), tags, documents.
- `is_consumable` (0/1) — the flag that switches the component workflow.
- `composition` — a JSON string of the parts list. Lines are created **atomically** with the
  asset (the backend creates the asset, then its composition lines, then the mirror rows, then
  re-derives the asset status — all in one DB transaction).

### Rows created

| Table | What is written |
|---|---|
| `equipment` | The asset master row (type = machine/customer asset, `activated` computed) |
| `customer_equipment_config` | Machine specification fields (1:1 with the equipment) |
| `finished_unit_components` | One row per composition line with `type = 2 (customer asset)`, `parent_serial_id = equipment.id`, `bom_product_id = equipment.id`, `bom_component_id = NULL` |
| `bom_product_components` | **Mirror** of each line with `product_id = asset id`, `is_asset = 1` |
| `tags` / `transaction_documents` | Tags & attachments (if provided) |

### Asset status at creation (`equipment.activated`)

- No composition lines  → `2` (Pending)
- Non-consumable asset with lines → `1` (Active)
- Consumable asset with no mandatory lines → `1` (Active)
- Consumable asset with **mandatory** lines that are not yet assigned → `2` (Pending)
- `0` = Inactive, `3`/`4` handled by bulk status actions elsewhere

<!--
Related code: EquipmentController::updateOrCreateNew() — validates, saves equipment,
creates customer_equipment_config, processes composition, prunes removed lines, sets activated.
-->

---

## 3. Step 2 — View the asset & its composition

**Screen:** `Detail | Client Equipment` (`Detail-Equipment.vue`).
**API:** `GET /api/equipment/{equipment}`.

### Extra payload the detail endpoint adds

- `composition` — all composition lines with live assignment state
  (computed by `FinishedUnitComponentService::getComposition()`).
- `has_assignments` — `true` as soon as at least one *active* assignment row exists.
  Used by the UI to lock the composition editor.
- `status_value`, `retired`, `faulty`, `certificates`, `equipment_config`, customer/site/warranty
  relations.

### Composition row shape (what the Composition tab renders)

Each line returns: `id`, `component_product_id`, `component_name`, `code/barcode`,
`component_type` (`goods`/`parts`/`other`), `uom`, `is_serialized`, `is_mandatory`,
`required_qty`, `assigned_qty`, `status` (+ `status_text`/`status_color`), `warranty_start/end`,
`has_replacement`, and `serials[]` — the list of active assignment rows
`{assignment_id, assigned_serial_id, serial_number, assigned_qty, is_serialized, status}`.

---
## 4. Step 3 — Manage the composition (edit/delete lines)

**Allowed only while no component has actually been assigned** — once an assignment row exists,
the composition is "locked" and you can only Assign (consumable) / Replace / Remove.

**Screen:** the *Manage Composition* button inside the Asset Composition tab opens
`ManageBomCompositionDialog` with `context="customer_asset"`.

**API (per-line, because a customer asset has no BOM template):**

| Action | Endpoint | Controller method |
|---|---|---|
| Add a line | `POST /api/equipment-component/{equipment}/composition` | `EquipmentComponentController::addCompositionLine` |
| Update a line | `PUT /api/equipment-component/{equipment}/composition/{line}` | `updateCompositionLine` |
| Delete a line | `DELETE /api/equipment-component/{equipment}/composition/{line}` | `deleteCompositionLine` |

The dialog diffs the edited list against the server snapshot: kept lines are updated, new lines
are POSTed, removed lines are DELETEd (deletes happen last, so a failure leaves the old data).

### Rules enforced on write

1. A line needs a `component_product_id` (a real product) **or** `is_other = 1` with a typed
   `component_name` (a "write-in" part).
2. `required_qty` must be ≥ 1.
3. A line that already has assigned items **cannot be updated or deleted** — you must use
   Replace/Remove instead.
4. `is_serialized` decides whether this slot accepts serial numbers or plain quantities.
5. `is_mandatory = 1` means the asset cannot be marked *Active* until this line is fully assigned.

### Rows touched

- `finished_unit_components` — the line itself (`component_product_id`, name/code, type, uom,
  `is_serialized`, `is_mandatory`, `is_other`, `required_qty`, status).
- Non-consumable assets keep the line **pre-assigned**: `assigned_qty = required_qty`,
  `status = Assigned (1)`. Consumable assets set `assigned_qty = 0`, `status = Pending (2)`.
- Deleting / switching a line also deletes its stale mirror row.
- `bom_product_components` mirror is re-synced (upsert) after every change.

---

## 5. Step 4 — Assign components (consumable assets)

**Screen:** Asset Composition tab → *Assign* button on a Pending line → `AssignComponentSerialDialog`
(`context="customer_asset"`).
**API:** `POST /api/equipment-component/component/assign`
**Backend:** `EquipmentComponentController::assignComponent` →
`FinishedUnitComponentService::assignComponent()`.

### Validation before any write

- `parent_serial_id` + `finished_unit_component_id` must resolve to a real customer-asset line.
- Cannot assign past `required_qty`: already-assigned + new count must not exceed required qty.
- Duplicate serial / manual-serial assignments are rejected.

### Three kinds of assignment supported (mirrors BOM)

| Kind | Payload | How it is stored |
|---|---|---|
| Serialized stock serials | `serial_ids[]` | `finished_unit_component_assignments` row per serial with `assigned_serial_id` |
| Manual (typed) serials | `manual_serials[]` | Assignment row with plain-text `serial_number` (no stock effect) |
| Non-serialized quantity | `assigned_qty` | One assignment row `is_serialized = 0`, `assigned_qty = N` |

### Side effects (all inside one transaction)

1. **Assignments** — one `finished_unit_component_assignments` row per serial/qty
   (`type = 2`, `status = 1` Assigned).
2. **Component stock reduced** — `handleComponentStock(..., 'outbond')` decrements
   `products.available_stock`/`stock_on_hand` for real (non-"other") components.
3. **Movements ledger** — `serial_number_movements` rows:
   - per serial: `Component Stock → Customer Asset` (`product_type = 'equipment'`,
     `module = 'Customer Asset'`, `reference_no = asset barcode`, remark
     `"<Product/Part> Serial: X | Assigned to Asset: #<barcode>"`);
   - for quantity assignments: an aggregate row with `serial_number_id = 0`.
4. **Serial stamping** — `handleSerializedComponentOutbond` marks each assigned serial
   `product_serial_numbers` as `activated = 0`, `status = Out of Stock`, bound to the asset
   (`outbond_module_type = 'equipment'`).
5. **Line refresh** — `assigned_qty` and `status` (Assigned once full, else Pending) updated on
   the composition line + mirror.
6. **Asset status re-derived** — `syncAssetStatus()` recomputes `equipment.activated`
   (see §8).

### Warranty capture

Each assignment can carry `warranty_source` (`parent` / `component` / `new` / `none`) and dates
`warranty_start` / `warranty_end`; they land on both the assignment and the composition line.

---

## 6. Step 5 — Replace a component

**Screen:** Asset Composition tab → *Replace* → the replace dialog (inside `CompositionLifecycle`).
**API:** `POST /api/equipment-component/component/replace`
**Backend:** `FinishedUnitComponentService::replaceComponent()`.

### What a replace does

1. Looks up the OLD assignment(s). The UI can send the old **serial text** (`old_serial_numbers[]`);
   each is matched on the line (union of `product_serial_numbers.text` and
   `assignments.serial_number`). Legacy mode: a single `old_assignment_id`.
2. Creates **new** assignment rows: stock serials (`new_serial_ids`/`serial_ids`), typed manual
   serials, or a new quantity.
3. Records **active-assignment status**: old rows keep existing ids; new rows get `status = 1`.

### Stock & movement effects (per old/new part)

| Case | Stock effect | Movement ledger |
|---|---|---|
| New serialized part added | component stock −1 (`outbond`) | `Component Stock → Customer Asset` |
| Extra non-serialized qty (delta > 0) | stock −delta | aggregate row `Component Stock → Customer Asset` |
| Freed non-serialized qty (delta < 0) | stock +delta | aggregate row `Customer Asset → Component Stock` |
| Old serial removed / "good" | released to In Stock (+1) | `Customer Asset → Component Stock` |
| Old serial removed faulty | serial marked Faulty | `Customer Asset → Quarantine` |

### History & warranty

- One `finished_unit_component_replacements` row per replace:
  `old_serial_id/old_serial_number → new_serial_id/new_serial_number`, `reason`
  (`faulty | warranty_replacement | upgrade | rollback`), `warranty_action`
  (`continue | reset | none | parent`), dates, `replaced_by`, `replaced_at`.
- Warranty action recalculates the new part's warranty dates:
  - `parent` → use the customer asset's own warranty,
  - `continue` → keep the old part's warranty,
  - `reset` → new warranty period,
  - `none` → no warranty.

### After the write

- Line status re-refreshed (`refreshLineStatus`), mirror (`bom_product_components`) synced,
  asset status re-derived (`syncAssetStatus`), and the Replacements + Movements tabs are
  refreshed via a Vue event bus.

---

## 7. Step 6 — Remove a component

**Screen:** Asset Composition tab → *Remove* row action.
**API:** `POST /api/equipment-component/component/remove`
**Backend:** `FinishedUnitComponentService::removeComponent()`.

### Behaviour

- Removes **every active assignment** on the line (the whole component, not just the first serial —
  same as the BOM serialized remove).
- The UI sends an `action`:
  - `good` → the part returns **to stock** (`Inbound`, In Stock, `status = Removed (3)`)
  - `faulty` / `damaged` → the part goes to **Quarantine** (`Outbound`, `status = Faulty (4)`)
- `prodhuct_serial_numbers` rows are released (`releaseSerialToInbond`, `activated = 1`,
  `status = In Stock`) on good removals, or marked Faulty/Damaged otherwise.
- Stock decrement/increment only happens when the component is a real product (not "other").
- Line warranty dates are cleared, the line is re-refreshed, mirror re-synced, and
  `syncAssetStatus()` re-derives the asset status.

| Line status after remove | Condition |
|---|---|
| `3 = Removed` | action `good` — part back to Component Stock |
| `4 = Faulty` | action `faulty`/`damaged` — part to Quarantine |

---

## 8. Asset status derivation (`equipment.activated`)

The asset's own status is **never typed manually for composition reasons** — it is derived
(`FinishedUnitComponentService::syncAssetStatus()`, also mirrored in the create/update endpoint):

```text
No composition lines                              → activated = 2 (Pending)
Has lines AND (non-consumable OR no mandatory
lines OR every mandatory line is full)            → activated = 1 (Active)
Has mandatory lines, some unfinished              → activated = 2 (Pending)
```

Bulk "Mark as Active" is additionally guarded:
`equipmentsWithIncompleteMandatoryComposition()` filters out / rejects assets whose mandatory
lines are not fully assigned.

---

## 9. The two read-only tabs

### Replacements tab

- **API:** `GET /api/equipment-component/{equipment}/replacements`
- Reads `finished_unit_component_replacements` where `type = 2` and `parent_serial_id = asset`.
- Columns shown: Date, component image + name, old serial → new serial, reason, warranty impact,
  replaced-by user, remarks.
- `warranty_action` values are translated for display:
  `reset` → "New warranty Period", `none` → "No warranty", `parent` → "Reset to parent warranty",
  `continue` → "Component warranty continues".

### Movements tab

- **API:** `GET /api/equipment-component/{equipment}/movements`
- Reads `serial_number_movements` where `module = 'Customer Asset'` and `module_id = asset id`
  (both serial-level rows and `serial_number_id = 0` aggregate rows).
- Filters: module dropdown, date range (`dates`), free-text search (`search`).
- The backend decrypts the acting user's name from the `users` table for display.
- Movement remarks identify the direction: *assigned* → `Component Stock → Customer Asset`,
  *removed good* → `Customer Asset → Component Stock`, *removed faulty* → `Customer Asset → Quarantine`.

---

## 10. Lifecycle state machine — quick reference

```text
                     ┌────────────────────────── as (consumable) ──► Assigned
 Create asset ──► Pending/Active   (lines defined at creation)
                     │
                     ├── (non-consumable) pre-assigned ──► Assigned
                     │
                     ▼
              Assigned ──replace──► Assigned (new serial/qty)
                 │
                 └──remove──► Removed (→ stock)  OR  Faulty (→ quarantine)
                                 │                       │
                                 └─► line can be replaced / re-assigned later
```

> **Invariant:** every write that changes assignments also re-runs line refresh + mirror sync +
> asset status sync, so `composition`, `has_assignments`, the Replacements and Movements tabs and
> `equipment.activated` always stay consistent after a page refresh.

