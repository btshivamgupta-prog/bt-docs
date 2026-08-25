# BOM Product — Finished Unit Component Management

**Backend:** `app/Http/Controllers/BomProductController.php` + `app/Traits/ProductTrait.php`
**Frontend:** `frontend/src/view/pages/bom-product/` (detail pages & dialogs)

This document explains, step by step, what happens when a user **Assigns**, **Replaces**,
**Removes** or **Marks Faulty** a component on a finished unit — every condition, every
side effect (DB rows, stock, statuses, movements) — so a new developer can follow the
whole flow without reading the code first.

---

## 1. Domain Model Overview

| Concept | Table | Purpose |
|---|---|---|
| BOM Product | `products` (`product_type = bom_product`) | A manufactured product built from components (e.g. *CCTV KIT*). Flag `is_consumable` decides the consumption model (see §4). |
| Manufacturing Batch | `bom_product_manufacturing_batches` | Produces N units of a BOM product in one run. |
| Finished Unit | `product_serial_numbers` (`product_type = bom_product`) | One serialised unit (e.g. `CCTV-NON-CONSUME-002`). |
| BOM Component | `bom_product_components` | Recipe line per unit: component product + required qty + `is_serialized` + `is_other` flags. |
| Finished Unit Component row | `finished_unit_components` | Per-unit copy of the recipe line; holds current `status` (PENDING/ASSIGNED/…) and `assigned_qty`. |
| Component Assignment | `finished_unit_component_assignments` | Which physical serial / qty is installed in which unit for which component. One row per serial. |
| Replacement History | `finished_unit_component_replacements` | Audit trail of every swap (old serial → new serial, reason, warranty action, replaced_by/at). |
| Movements | `serial_number_movements` | Inbound/Outbound log rendered by the Stock Movement tabs. |

### Unit Status Codes (`product_serial_numbers.status`)
`1` In Stock · `2` Rented · `3` Out of Stock · `4` Faulty · `5` Damaged · `6` Scrapped

### Key invariant
> **One serial can only be assigned once per (finished unit + BOM component).**
> Enforced at 3 levels:
> 1. Application check in `ProductTrait::createComponentAssignment()` using `lockForUpdate()` (race-safe against concurrent submits).
> 2. Silent sanitisation of `new_serial_ids` in `replaceComponentSerial()` before the transaction starts.
> 3. DB unique index `fuca_unit_component_serial_unique` on `(parent_serial_id, bom_component_id, assigned_serial_id)`.

---

## 2. Endpoint Map

| Endpoint | Method | Controller Method | Frontend Entry Point |
|---|---|---|---|
| `/api/bom-product/finished-unit/{unit}/composition` | GET | `getFinishedUnitComposition` | `Serials.vue` — composition table |
| `/api/bom-product/component/{product}/available-serials` | GET | `availableSerials` | Assign/Replace serial pickers |
| `/api/bom-product/finished-unit/component/assign` | POST | `assignComponentSerial` | `Serials.vue` — *Assign Serial* dialog |
| `/api/bom-product/finished-unit/component/replace` | POST | `replaceComponentSerial` | `Serials.vue` — *Replace* dialog |
| `/api/bom-product/finished-unit/component/remove` | POST | `removeComponentSerial` | `Serials.vue` — *Faulty / Rollback* row action |
| `/api/bom-product/finished-unit/status` | POST | `updateFinishedUnitStatus` | `Finished-Units.vue` — *Mark Faulty* (single & bulk) |
| `/api/bom-product/finished-unit/{unit}/replacements` | GET | `getFinishedUnitReplacements` | `Replacements.vue` — history tab |
| `/api/bom-product/finished-unit/{unit}/movements` | GET | movements listing | `Movements.vue` |

---

## 3. End-to-End Lifecycle

```
Manufacture Batch ──► Units created (Pending) ──► components pre-assigned (non-consumable)
        │
        ▼  (consumable BOMs) OR partial assembly
  User ASSIGNS remaining components
        │            each assign: assignment row + serial Outbond + stock −1
        │            component PENDING → ASSIGNED when required_qty reached
        ▼
  ALL components ASSIGNED ⇒ unit IN_STOCK + batch completed + product/batch stock synced
        │
        ├── REPLACE component ──► old released to stock, new installed, history recorded

---

## 4. Component Types & Conditions (who can be assigned what)

Every BOM component has two flags that decide how the **Assign** and **Replace** forms behave:

| # | Component kind | Flags | `component_product_id` | How the user fills the form | Stock impact |
|---|---|---|---|---|---|
| A | Real product, serialized | `is_other=0`, `is_serialized=1` | set | Pick 1..N existing serials from *Available Serials* picker (`GET component/{product}/available-serials`) | Each serial → Out-of-Stock; product stock −1 per serial |
| B | Real product, non-serialized | `is_other=0`, `is_serialized=0` | set | Enter a quantity (`assigned_qty`) directly — no serial picker shown | Product stock −`assigned_qty` |
| C | "Other" type, serialized | `is_other=1`, `is_serialized=1` | **forced to NULL** | Type free-text serial numbers (`manual_serials[]`) | None (no real product exists) |
| D | "Other" type, non-serialized | `is_other=1`, `is_serialized=0` | **forced to NULL** | Enter a quantity | None |

### Form conditions

*Assign dialog* (`Serials.vue openAssignDialog / assignSerial`):
- Serial picker is loaded only when `!isOther && product_id > 0`.
- Header shows `remainingQty of requiredQty` where `remaining = required_qty − assigned_qty` → **partial assignment is allowed**.
- Manual serial inputs are trimmed; empty ones dropped; duplicates blocked client-side.
- `assigned_qty` field is only sent for non-serialized kinds (B, D).
- Warranty fields default from the parent BOM product; user may switch source.

*Backend mirrors/enforces these* (`assignComponentSerial`, lines ~9744–9811):
- `is_other` ⇒ `component_product_id` force-nullified → **no stock ever touched**.
- `is_other` + `serial_ids` present ⇒ 422 *"Serialized components cannot be assigned to an 'Other' type component. Please enter manual serials instead."*
- Already fully assigned (`alreadyAssigned >= requiredQty`) ⇒ 422 *"…Please use Replace instead."*
- Over-assignment (`selectedCount > remainingQty`) ⇒ 422 *"Only {n} component(s) can be assigned…"*

### Consumption model of the BOM product itself

| BOM product | Components are… | Consequence |
|---|---|---|
| **Non-consumable** (`is_consumable = 0`) | pre-assigned at manufacture time; parts stay inside the unit forever | Assign form rarely used; Replace = swap part; net stock change = new − released; component status NEVER returns to PENDING |
| **Consumable** (`is_consumable = 1`) | consumed as used | Stock deducted at assignment time; after replace, component status recalculates and unit can fall back to PENDING if a slot empties |


---

## 5. POST Assign — `/bom-product/finished-unit/component/assign`

**Objective:** Install a physical serial (or a quantity) into an empty/partial slot of a
component on a finished unit. This is the *first installation* action — for swapping an
existing part use **Replace** (§6).

### What the user does in the UI
1. Open finished unit → *Serials* tab → row shows `Assign` button when
   `assigned_qty < required_qty`.
2. Dialog opens: pick serial(s) from Available Serials **or** type manual serials **or**
   enter qty (depending on component kind A–D, see §4).
3. Optional: supplier, purchase date, warranty source/dates, remarks.
4. Confirm → POST → composition table refreshes; unit header may flip to In Stock.

### Request example (kind A — serialized real product)
```json
{
  "parent_serial_id": 590,
  "bom_component_id": 76,
  "component_product_id": 33,
  "serial_ids": [377],
  "manual_serials": [],
  "assigned_qty": null,
  "supplier_id": 12,
  "purchase_date": "2026-08-24",
  "warranty_source": "Invoice Date",
  "warranty_start": "2026-08-24",
  "warranty_end": "2027-08-24",
  "remarks": "Installed during assembly"
}
```
Kind B sends `"assigned_qty": 5, "serial_ids": []`; kind C sends
`"manual_serials": ["MAN-001","MAN-002"]`.

### What happens in the backend — every side effect, in order

| # | Step | Tables touched |
|---|---|---|
| 1 | Validate + resolve unit & component; apply §4 conditions | — |
| 2 | `createComponentAssignment()` per serial / one row for qty — duplicate guard (`lockForUpdate`) returns null ⇒ 422 *"Serial is already assigned…"* | `finished_unit_component_assignments` INSERT |
| 3 | Kind A: `handleSerializedComponentOutbond()` — each serial marked Out-of-Stock with outbond reference = the finished unit | `product_serial_numbers` UPDATE |
| 4 | Kind C: manual text saved straight into assignment (`serial_number` column). For real products: `createManualSerial()` creates a NEW serial record (+1 to that product's stock columns) then assigns it | `product_serial_numbers` INSERT |
| 5 | Per serial: Outbound movement *"…Serial: X \| Assigned to Finished Unit: #Y"* (Main Warehouse → Finished Unit) | `serial_number_movements` INSERT |
| 6 | `handleComponentStock('outbond', selectedCount)` — deducts component product stock by total assigned count (skipped for kind C/D — no product) | `products.available_stock` −N |
| 7 | Recalculate `totalAssigned`; component status → ASSIGNED if `totalAssigned >= required_qty`, else stays PENDING; saves assigned_qty + warranty/remarks onto the `finished_unit_components` row | `finished_unit_components` UPDATE |
| 8 | If component just became ASSIGNED: `autoCompleteFinishedUnit()` — ALL components assigned ⇒ unit status → **In Stock**; then if every unit of the batch is In Stock ⇒ batch status → `completed` | `product_serial_numbers`, `bom_product_manufacturing_batches` |
| 9 | Finished-unit history log per serial: *"Component #{code} \| Serial #{text} assigned to finished unit: #{unit}"* (with attributes JSON incl. user remarks, purchase_date) | product history |
| 10 | Commit. Response: *"Component assigned successfully."* | — |

> The user-entered **remarks** are stored on the assignment row and in the history-log
> attributes — they do NOT appear in movement rows (those use fixed audit templates, §10).


---

## 6. POST Replace — `/bom-product/finished-unit/component/replace`

**Objective:** Swap the installed part of a component for a different serial/qty, with a
full audit trail. Also serves as **first-time install** for non-consumable BOM products
(their components are pre-assigned at manufacture, but a slot may be empty — then there
is no old assignment yet and `assignment_id` is omitted).

### Replace form conditions

| Condition | Behaviour |
|---|---|
| `reason` | **required** (max 255) — e.g. *"Camera damaged on site"*. No reason ⇒ 422. |
| `warranty_action` | `continue` (keep parent warranty dates) · `reset` (start new warranty from today/new dates) · `none` (no warranty → start/end forced to null). Invalid value ⇒ 422. |
| Kind A (serialized real product) | Multi-select `new_serial_ids[]` for non-consumable BOMs; single `new_serial_id` also accepted. |
| Kind C ("Other" + serialized) | `manual_serials` free-text instead of picker; frontend blocks duplicates first. |
| Kind B/D (non-serialized) | `assigned_qty` number replaces all serial fields. |
| Old assignment | Resolved via `assignment_id`, or auto-found from `(parent_serial_id, bom_component_id)` when omitted. May be **null** (first install). |

### Request example
```json
{
  "parent_serial_id": 590,
  "bom_component_id": 76,
  "assignment_id": 292,
  "component_product_id": 33,
  "new_serial_ids": [377],
  "new_serial_id": null,
  "manual_serial": null,
  "manual_serials": null,
  "assigned_qty": null,
  "reason": "Camera damaged on site",
  "warranty_action": "continue",
  "warranty_start": "2026-08-24",
  "warranty_end": "2027-08-24",
  "remarks": "Replaced by technician"
}
```

### What happens in the backend — every side effect, in order

| # | Step | Notes |
|---|---|---|
| 1 | Validate + resolve old assignment (nullable) | — |
| 2 | **Silent sanitisation before the transaction**: dedupe `new_serial_ids`; drop serials already assigned to this unit+component (old assignment's own serial exempt); log skipped ids to Laravel log. Only fails if nothing new remains: *"Please select at least one new serial number."* | user never sees a duplicate error |
| 3 | Begin transaction. If old assignment exists: release old serial back to stock (`releaseSerialToInbond`) + Inbound movement *"…Replacement Released from Finished Unit: #Y \| Reason: {reason}"* | Main Warehouse ⇄ Finished Unit |
| 4 | Mark new serials Outbond (`handleSerializedComponentOutbond`) + create new assignments (race-safe duplicate guard). For kind C: manual text rows. For kind B/D: qty assignment | assignments INSERT |
| 5 | Per new serial: Inbound/Outbound movements for released + installed parts | movements INSERT |
| 6 | **Net component-stock deduction** = `count(new) − count(old)` (min 0), only if NOT consumable AND serialized AND product exists. Examples: first install 1−0=**deduct 1** · 1:1 swap 1−1=**0** · upgrade 2−1=**deduct 1** | `products.available_stock` |
| 7 | Record `finished_unit_component_replacements` row per new assignment: old serial, new serial (or `"N qty"` for non-serialized), reason, warranty_action, replaced_by/at. Delete the old assignment row | replacements INSERT, assignments DELETE |
| 8 | Component status: non-consumable ⇒ always stays ASSIGNED (`assigned_qty = required_qty`). Consumable ⇒ recalculated from actual totals (can return to PENDING) | `finished_unit_components` UPDATE |
| 9 | Consumable only: recompute unit status (ALL assigned ⇒ In Stock else Pending) and batch status (all units In Stock ⇒ completed else pending) | unit + batch UPDATE |
| 10 | Finished-unit history logs for release + installation. Commit → *"Component replaced successfully."* Frontend refreshes composition & Replacements tab | — |

> **Why duplicates used to happen:** two concurrent submits both passed a plain
> `exists()` check before either committed. Step 2's sanitisation + step 4's
> `lockForUpdate()` guard + the DB unique index now make that impossible.

---

## 7. POST Remove — `/bom-product/finished-unit/component/remove`

**Objective:** Pull a component out of a finished unit — because it is **faulty**, or to
**roll back** to the previous component using replacement history.

**Frontend payload** (`Serials.vue`, `confirmRemoveComposition`):

```json
{
  "parent_serial_id": 590,
  "bom_component_id": 76,
  "assignment_id": 292,
  "action": "faulty",
  "reason": "Component removed as faulty",
  "remarks": ""
}
```

**What happens:**
- **`action = faulty`** → all assigned serials of that component are marked Faulty;
  the component row stays Assigned; no component-product stock change;
  Outbound → Quarantine movement (*"…Marked Faulty on Finished Unit: #Y \| Sent to Quarantine"*)
  + replacement history entry.
- **`action = rollback`** → history-aware restore of the previous part from

---

## 8. POST Status Change — `/bom-product/finished-unit/status`

**Objective:** Change whole finished units' status (main use: **Mark Faulty**, single
unit or bulk selection from the Finished-Units grid).

**Frontend payload** (`Finished-Units.vue`, `confirmFaulty`):

```json
{
  "unit_ids": [581, 582, 583],
  "status": 4,
  "reason": "Physical Damage",
  "remarks": "dadad",
  "return_components": false,
  "components": [],
  "is_bulk": true
}
```

**Backend flow** (`updateFinishedUnitStatus`) — per unit:
1. **Skip if already in target status** — re-marking Faulty→Faulty logs nothing.
2. Capture `$wasInStock = (status === 1)` before changing; save new status + reason.
3. **Only if it was In Stock**: write Outbound movements worded
   *"Status changed to {Status} | Reason: {reason}"* (Main Warehouse → Quarantine).
   Units never In Stock produce **no** fake stock reduction.
4. Per-component actions: `is_bulk && return_components=true` → rollback all discovered
   components; `return_components=false` → mark all faulty (`mark_faulty`).
5. `syncBomProductStock()` keeps product + batch columns consistent:

| Column | Meaning |
|---|---|
| `products.initial_stock / stock_on_hand / available_stock` | Count of units currently In Stock (e.g. **4**) |

---

## 9. Stock Movement `remarks` — Formats & Examples

Movement remarks are **generated audit text** (`sprintf()` templates in the controller /
trait). The user-entered remarks field is stored on the assignment / replacement / unit
history record — it is NOT copied into movement rows.

Entity label rule (`movementEntityLabel()`): `parts` → **Part**, else **Product**.

| Action | Movement | Remarks template |
|---|---|---|
| Manufacture per unit | Inbound | `Finished unit manufactured with {N} component(s) and received into stock` |
| Manufacture pending unit | Inbound | `Finished unit manufactured — awaiting component assignment` |
| Manufacture aggregate | Inbound | `Manufactured In` (qty = batch size) |
| Unit auto-completed | Inbound | `Finished unit completed — all components assigned and received into stock` |
| Assign serial | Outbound | `{Part\|Product} Serial: {serial} \| Assigned to Finished Unit: #{unit}` |
| Assign manual serial (real product) | Outbound | `{Part\|Product}: {name} \| Serial: {text} (New) \| Assigned to Finished Unit: #{unit}` |
| Replace releases old | Inbound | `{Part\|Product} Serial: {old} \| Replacement Released from Finished Unit: #{unit} \| Reason: {reason}` |
| Remove → faulty | Outbound | `{entity} \| Marked Faulty on Finished Unit: #{unit} \| Sent to Quarantine` |
| Rollback remove | Outbound | `{entity} \| Replacement Rolled Back \| Removed from Finished Unit: #{unit}` |
| Rollback restore previous | Inbound | `{Part\|Product} Serial: {old} \| Replacement Rolled Back \| Previous Part Restored to Finished Unit: #{unit}` |
| Rollback → inventory | Inbound | `{entity} \| Rolled Back to Inventory from Finished Unit: #{unit}` |
| Non-serialized rollback | Inbound | `Non-serialized component (qty {qty}) rolled back to inventory from finished unit #{unit}` |
| Status change (serial row + product row) | Outbound | `{Part\|Product}: Finished Unit #{unit} \| Status changed to {Status} \| Reason: {reason}` |

### Worked example — full unit lifecycle rendered as movement rows

Below is exactly what the **Movements** tab (`Movements.vue`) would show for finished
unit `CCTV-NON-CONSUME-002` (product *CCTV KIT - Copy*, batch `BB-001`) going through a
complete lifecycle. Each row = one `serial_number_movements` record:

| # | Date | Reference | Type | Qty | From → To | Serial | Remarks |
|---|---|---|---|---|---|---|---|
| 1 | 24/08/2026 16:49 | BB-001 | Inbound | 1 | Production → Main Warehouse | CCTV-NON-CONSUME-002 | *Finished unit manufactured — awaiting component assignment* |
| 2 | 24/08/2026 16:49 | BB-001 | Inbound | 10 | Production → Main Warehouse | — (aggregate) | *Manufactured In* |
| 3 | 24/08/2026 16:55 | CCTV-NON-CONSUME-002 | Outbound | 1 | Main Warehouse → Finished Unit | CAM-007 | *Product Serial: CAM-007 \| Assigned to Finished Unit: #CCTV-NON-CONSUME-002* |
| 4 | 24/08/2026 16:57 | CCTV-NON-CONSUME-002 | Inbound | 1 | Main Warehouse → Main Warehouse | CAM-008 (New) | *Product: CCTV Camera \| Serial: CAM-008 (New) \| Assigned to Finished Unit: #CCTV-NON-CONSUME-002* |
| 5 | 24/08/2026 17:05 | CCTV-NON-CONSUME-002 | Inbound | 1 | Finished Unit → Main Warehouse | CAM-007 | *Product Serial: CAM-007 \| Replacement Released from Finished Unit: #590 \| Reason: Camera damaged on site* |
| 6 | 24/08/2026 17:06 | CCTV-NON-CONSUME-002 | Outbound | 1 | Main Warehouse → Quarantine | CAM-007 | *Product Serial: CAM-007 \| Marked Faulty on Finished Unit: #CCTV-NON-CONSUME-002 \| Sent to Quarantine* |

Reading the story row by row:
- **Row 1–2:** batch of 10 units manufactured → one per-unit row + one aggregate
  product-level row (`serial_number_id = 0`).
- **Row 3:** technician assigns serial `CAM-007` to the camera slot → component stock −1.
- **Row 4:** replace with a brand-new manual serial `CAM-008` — created on the fly, so
  the remark carries "(New)" and the product name.
- **Row 5:** next replace releases the old `CAM-007` back to stock (+1) with the
  replace dialog's reason.
- **Row 6:** component later removed as faulty → Quarantine.

And a status-change example from real data (unit marked faulty in bulk):

> `Outbound · qty 1 · Main Warehouse → Quarantine`
> **Product: Finished Unit #CCTV-NON-CONSUME-002 | Status changed to Faulty | Reason: Physical Damage**

This row is written twice by design: once bound to the unit's own `serial_number_id`
(per-unit trail) and once with `serial_number_id = 0` (product-level trail). Both carry
the same wording; never sum them together.

---

## 10. GET Replacements — `/bom-product/finished-unit/{unit}/replacements`

Powers the *Replacements* tab (`Replacements.vue`): date, component, old serial → new
serial, reason, warranty action, replaced-by name. Refreshed via
`PaginationEventBus.$emit("replacement:updated")` after replace/remove succeed.

---

## 11. Capability Summary

- ✅ Manufacture batches; auto-complete units & batches when fully assembled.
- ✅ Assign single/multiple serials, manual serials, or plain qty — per component kind (§4).
- ✅ Partial assignment with live remaining-qty display.
- ✅ 1:1 swaps, upgrades (1→N), first installs via one *Replace* endpoint.
- ✅ Duplicate protection at 3 layers — silently absorbed, never shown as an error.
- ✅ Bulk mark-faulty with automatic per-component handling.
- ✅ Rollback to the previous part from replacement history.
- ✅ Warranty carry-over options on replace (continue / reset / none).
- ✅ Stock columns (product + batch) always reconcile with actual In-Stock counts.

## 12. Known Constraints / Notes

- Historical movement rows keep their pre-fix wording (*"Stock reduced"*); only new entries use current formats.
- Non-serialized components cannot be rolled back (no serial to match in history).
- The DB unique index covers serialized assignments; manual-text serials rely on application-level guards.
- Run `php artisan migrate` once for `2026_08_24_000001_add_unique_index_to_finished_unit_component_assignments.php`
  (it also cleans pre-existing duplicate rows automatically).

*Product: Finished Unit #CCTV-NON-CONSUME-002 | Status changed to Faulty | Reason: Physical Damage*

Sources: `{unit}` ← finished unit's `text`; `{serial}` ← serial `text` (fallback `#<id>`);
`{Status}` ← `statusText()`; `{reason}` ← the dialog's `reason` field.

> Rows with `serial_number_id = 0` are product-level aggregates. Per-serial and
> aggregate rows must not be summed together when deriving stock from movements.

| `batch.stock_on_hand / available_stock` | In-Stock count within that batch |
| `batch.initial_stock` / `batch.qty` | Manufactured quantity (audit value, unchanged) |

**Worked example (verified against live data):**
10 units manufactured → mark 1 faulty → **9 available** → mark 5 faulty →
**4 available**, 6 faulty. Product columns, batch columns and movements agree.

  `finished_unit_component_replacements`: installed serial released, previous serial
  restored to the unit (movements + history recorded). Non-serialized components cannot
  be matched to history and are skipped.


        ├── REMOVE component ──► faulty (→Quarantine) or rollback (restore previous part)
