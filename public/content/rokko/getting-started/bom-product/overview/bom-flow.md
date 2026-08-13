# BOM (Bill of Materials) — End-to-End Flow

> This document describes the complete BOM lifecycle in this application — from creating a BOM product, defining its composition, manufacturing finished units, assigning components, handling faulty units, to stock adjustments — covering the backend logic, the database tables involved, and how the frontend drives each step.

---

## 1. Overview / High-Level Flow

```
Create BOM Product
   │  (updateOrCreate)  → products (product_type = 'bom_product')
   │
   ▼
Define BOM Composition
   │  (updateBomComposition / saveBomComponents)
   │  → bom_product_components                       (the "recipe")
   │
   ▼
Manufacture Batch
   │  (createManufactureBatch)
   │  → bom_product_manufacturing_batches            (the batch)
   │  → product_serial_numbers                       (finished unit per qty)
   │  → finished_unit_components                     (component rows per unit)
   │
   ▼
Assign Components (per unit)
   │  (assignComponentSerial)
   │  → finished_unit_component_assignments          (which serial went into which unit)
   │  → finished_unit_components.assigned_qty/status
   │  → serial_number_movements                      (outbound from stock)
   │
   ├── Replace Component (replaceComponentSerial)
   │      → finished_unit_component_replacements     (history)
   │      → stock adjustments
   │
   ├── Mark Unit Faulty / Rollback (updateFinishedUnitStatus)
   │      → product_serial_numbers.status = 4
   │      → finished_unit_components.status = faulty/removed
   │      → finished_unit_component_replacements
   │      → serial_number_movements                  (quarantine / inbound)
   │
   ▼
Finished Unit Detail / Adjustments
   │  (getFinishedUnitDetail, getFinishedUnitComposition, getFinishedUnitReplacements,
   │   getFinishedUnitMovements, createAdjustment, getStockMovements)
   │
   ▼
Stock Movements & Product Adjustment (createAdjustment / getStockMovements)
```

---

## 2. Database Tables

| Table | Purpose | Key columns |
|---|---|---|
| `products` | Master product list. BOM products have `product_type = 'bom_product'`. | id, name, barcode, product_type, is_consumable, initial/available/stock_on_hand |
| `product_serial_numbers` | Serial numbers. Stores **finished units** (`product_type = 'bom_product'`) and component serials. | id, text, product, product_type, status, batch, activated, bond_type, inbond/outbond fields, status_reason, remarks |
| `bom_product_components` | The BOM **definition** (recipe) for a product. Global, shared across units. | id, product_id, component_product_id, component_name, component_code, qty, is_mandatory, is_serialized, is_other, is_consumable, sort_order, status |
| `bom_product_manufacturing_batches` | A manufacturing run producing N finished units. | id, product_id, status, qty, completed_qty, ... |
| `finished_unit_components` | **Per-unit** component state for each finished unit (overrides the global recipe status). | id, parent_serial_id, bom_product_id, bom_component_id, is_other, component_product_id, component_name, component_code, required_qty, assigned_qty, status, warranty_*, remarks |
| `finished_unit_component_assignments` | Tracks **which serial/quantity** was assigned to a component on a finished unit. | id, bom_product_id, parent_serial_id, bom_component_id, component_product_id, assigned_serial_id, serial_number, assigned_qty, is_serialized, warranty_*, status |
| `finished_unit_component_replacements` | History of replacements / rollbacks for a component on a unit. | id, parent_serial_id, bom_product_id, bom_component_id, component_product_id, old/new_serial_*, reason, warranty_action, remarks, replaced_by, replaced_at |
| `serial_number_movements` | Audit trail of every stock movement. | id, product_type, module, module_id, serial_number_id, product_id, movement_type (Inbound/Outbound), bond_type, from_location, to_location, quantity, remarks, added_by |
| `product_adjustments` / `product_adjustment_line_items` | Stock adjustments (see §9). | id, product, adjustment_type, qty, reason, ... |

### Status enumerations

**`product_serial_numbers` serial status:**
| Code | Meaning |
|---|---|
| 1 | In Stock |
| 2 | Rented |
| 3 | Out of Stock |
| 4 | Faulty |
| 5 | Damaged |
| 6 | Scrapped |
| 7 | Pending |

**`finished_unit_components.status`:**
| Code | Meaning |
|---|---|
| 1 | Pending |
| 2 | Assigned |
| 3 | Installed |
| 4 | Faulty |
| 5 | Removed |

#### `bom_product_components.status` mirrors the same 1–5 scheme (PENDING=2, ASSIGNED=1, FAULTY=4, REMOVED=5).
---

## 3. Backend Entry Points (Routes)

All routes are in `routes/api.php` and handled by `BomProductController` (`app/Http/Controllers/BomProductController.php`).

| Method | Route | Purpose |
|---|---|---|
| POST | `bom-product` | Create / update a BOM product (`updateOrCreate`) |
| PUT | `bom-product/{product}` | Update a BOM product |
| PUT | `bom-product/{product}/composition` | Update BOM composition (`updateBomComposition`) |
| GET | `bom-product` | List BOM products (`getBomProducts`) |
| GET | `bom-product/{product}` | Get one BOM product (`getProduct`) |
| POST | `bom-product/manufacture` | Create a manufacturing batch (`createManufactureBatch`) |
| GET | `bom-product/{product}/components` | Get BOM components (`getBomComponents`) |
| GET | `bom-product/finished-unit/{unit}/composition` | Get a unit's composition (`getFinishedUnitComposition`) |
| GET | `bom-product/finished-unit/{unit}/replacements` | Replacement history (`getFinishedUnitReplacements`) |
| GET | `bom-product/finished-unit/{unit}/movements` | Unit movements (`getFinishedUnitMovements`) |
| GET | `bom-product/{product}/stock-movements` | Product stock movements (`getStockMovements`) |
| POST | `bom-product/finished-unit/component/assign` | Assign a component serial (`assignComponentSerial`) |
| POST | `bom-product/finished-unit/component/replace` | Replace a component serial (`replaceComponentSerial`) |
| POST | `bom-product/finished-unit/status` | Mark unit faulty / rollback components (`updateFinishedUnitStatus`) |
| GET | `bom-product/finished-unit/{id}` | Finished unit detail (`getFinishedUnitDetail`) |
| GET | `bom-product/component/{product}/available-serials` | Available serials for a component (`availableSerials`) |
| PATCH | `bom-product` | Update product statuses (`updateStatusProducts`) |
| POST | `bom-product/adjustment` | Stock adjustments (`createAdjustment`) |

---

## 4. Frontend Files

| File | Role |
|---|---|
| `bom-product.vue` | List of BOM products |
| `create-bom-product.vue` | Create / edit a BOM product + its composition |
| `detail-bom-product.vue` | BOM product detail with tabs |
| `detail-finished-unit.vue` | Finished unit detail (tabs: Serials, Replacements, Movements, History) |
| `detail-version.vue` / `Version.vue` | Versioning of BOM products |
| `detail/Finished-Units.vue` | List of finished units for a product, "Mark Faulty" entry |
| `detail/Manufacturing-Batches.vue` | Manufacturing batch list |
| `detail/Bom-Composition.vue` | Composition (recipe) table |
| `detail/Serials.vue` | **Composition table per finished unit** with Replace/Assign/Remove actions |
| `detail/Serials-Composition.vue` | Faulty dialog component; collects per-component actions |
| `detail/Replacements.vue` | Replacement history tab |
| `detail/Movements.vue` | Movement history tab |
| `detail/Stock-Movement.vue` | Stock movements view |
| `components/ManufactureDialog.vue` | Trigger manufacturing batch |
| `components/MarkFaultyDialog.vue` | "Mark Finished Unit as Faulty" dialog |
| `components/AssignComponentSerialDialog.vue` | Assign serial dialog |
| `components/ManageBomCompositionDialog.vue` | Manage BOM composition |
| `components/OtherComponentDialog.vue` | Add "Other" (non-product) component |

---

## 5. Step-by-Step Flow

### 5.1 Create / Update a BOM Product

**Backend:** `updateOrCreate()`
**Frontend:** `create-bom-product.vue`

- Creates/updates the product row in `products` with `product_type = 'bom_product'`, `is_consumable`, pricing, warranty, etc.
- The product header (name, barcode, category, stock, price) lives in `products`.

### 5.2 Define the BOM Composition (the "recipe")

**Backend:** `updateBomComposition()` → `saveBomComponents()` / `getBomComponentsData()`
**Frontend:** `create-bom-product.vue`, `detail/Bom-Composition.vue`, `ManageBomCompositionDialog.vue`, `OtherComponentDialog.vue`

- Each component row is stored in `bom_product_components`:
  - Real product component → `component_product_id` set, `is_other = 0`.
  - "Other" component (manual, no product) → `is_other = 1`, `component_product_id = NULL`, holds `component_name` / `component_code`.
- Fields: `qty` (required per unit), `is_mandatory`, `is_serialized`, `is_consumable`, `sort_order`, `status`.
- This is the **global template**; individual units copy these into `finished_unit_components`.

### 5.3 Manufacture a Batch (create finished units)

**Backend:** `createManufactureBatch()`
**Frontend:** `ManufactureDialog.vue`, `detail/Manufacturing-Batches.vue`

For each requested quantity:
1. Create a row in `bom_product_manufacturing_batches`.
2. Create a **finished unit** in `product_serial_numbers` (`product_type = 'bom_product'`, `batch = <batch id>`, `status = In Stock` or Pending for consumable).
3. Copy every BOM component into `finished_unit_components` for that unit:
   - `bom_component_id` = the recipe component id.
   - `component_product_id` = recipe's product (or `NULL` for "Other").
   - `required_qty` = recipe `qty`.
   - `assigned_qty` = `0` for consumable, or `qty` for non-consumable (pre-assigned).
   - `status` = `Pending` (consumable) or `Assigned` (non-consumable).
4. Each unit is now ready for component assignment / replacement.

### 5.4 Assign Components to a Finished Unit

**Backend:** `assignComponentSerial()` (`ProductTrait::createComponentAssignment`, `updateFinishedUnitComponent`)
**Frontend:** `AssignComponentSerialDialog.vue`, `detail/Serials.vue` → "Assign"

Only relevant for **consumable** BOM products (components start as `Pending`).

1. Validate `parent_serial_id`, `bom_component_id`, `component_product_id`; prevent over-assignment beyond `required_qty`.
2. Create a row in `finished_unit_component_assignments`:
   - Real serialized → `assigned_serial_id` set.
   - "Other" serialized → `serial_number` set.
   - Non-serialized → `assigned_qty` set.
3. Update `finished_unit_components.assigned_qty` and `status` (→ `Assigned` when full).
4. Record an **Outbound** serial movement (stock → finished unit).
5. When all components are assigned, `autoCompleteFinishedUnit` may set the unit to `In Stock` and complete the batch.

### 5.5 Replace a Component

**Backend:** `replaceComponentSerial()`
**Frontend:** `detail/Serials.vue` → "Replace", `Replacements.vue`

1. Identify the old assignment (by serial id / serial number / product id).
2. Create new assignment(s), delete old assignment.
3. Adjust stock (deduct for new serials, restore for old).
4. Insert a history record in `finished_unit_component_replacements` (old/new serial, reason, warranty action).
5. `finished_unit_components` status is set to `Assigned`/`Installed`; the serial is moved Inbound/Outbound accordingly.

### 5.6 Mark a Finished Unit Faulty / Rollback Components

**Backend:** `updateFinishedUnitStatus()`
**Frontend:** `MarkFaultyDialog.vue`, `detail/Serials-Composition.vue`, `detail/Finished-Units.vue`

Payload example:
```json
{
  "unit_ids": [201],
  "status": 4,
  "reason": "Failed Quality Inspection",
  "remarks": "",
  "return_components": false,
  "components": [
    { "bom_component_id": 72, "component_product_id": 26, "assigned_qty": 2, "action": "rollback" },
    { "bom_component_id": 73, "serial_number": "SDF", "action": "mark_faulty" }
  ]
}
```

Per unit:
1. Validate `unit_ids` (array), `status` (1–6), `reason`, `components[].action` (`mark_faulty` | `rollback`).
2. Load the finished unit(s) from `product_serial_numbers` where `product_type = 'bom_product'`.
3. **Update unit status** → `product_serial_numbers.status = 4`; if Faulty, store `status_reason` + `remarks`.
4. Record 2 unit-level serial movements (Outbound, Main Warehouse → Finished Unit).
5. For each component `action`:
   - **`mark_faulty`** → `markComponentFaulty()`:
     * serial → `status = 4` (Faulty)
     * `finished_unit_components.status` → `Faulty (4)`
     * Outbound movement to **Quarantine**
     * no qty / stock change
   - **`rollback`** → `rollbackComponent()` dispatches by identifier:
     * real serialized (`assigned_serial_id`) → `rollbackSerializedComponent()`: restore serial to **In Stock**, delete assignment, decrement qty, mark component `Faulty`, restore product stock, Inbound movement.
     * "Other" serialized (`serial_number`) → `rollbackOtherSerializedComponent()`: delete assignment, decrement qty, mark component `Faulty`, Inbound movement.
     * real non-serialized (`component_product_id` + qty) → `rollbackNonSerializedComponent()`: mark `Removed`, restore stock, Inbound movement.
     * "Other" non-serialized (`bom_component_id` + qty) → `rollbackOtherNonSerializedComponent()`: mark `Removed`, Inbound movement.
6. Each rollback records a `finished_unit_component_replacements` history row (reason = "Rollback", warranty_action = "continue").
7. Wrap everything in a **DB transaction**; commit or rollback on exception.

**Key helper methods** (all in `BomProductController`):
| Method | Role |
|---|---|
| `markComponentFaulty` | Mark a component + its serial faulty |
| `rollbackComponent` | Dispatcher → picks the right rollback strategy |
| `rollbackSerializedComponent` | Restore real serial to stock, remove from unit |
| `rollbackOtherSerializedComponent` | Remove manual-serial component |
| `rollbackNonSerializedComponent` | Restore a real product's qty |
| `rollbackOtherNonSerializedComponent` | Remove an "Other" quantity component |
| `findFinishedUnitAssignment` | Locate the assignment by serial id/serial no/product/bom id |
| `insertSerialMovement` | Shared movement audit writer |
| `recordComponentReplacement` | Shared replacement-history writer |
| `restoreComponentProductStock` / `deductComponentProductStock` | Stock adjustments |
| `updateFinishedUnitComponentRow` / `decrementFinishedUnitComponentQty` | Update the per-unit component row |

### 5.7 Finished Unit Detail & Audits

**Backend:** `getFinishedUnitDetail()`, `getFinishedUnitComposition()`, `getFinishedUnitReplacements()`, `getFinishedUnitMovements()`
**Frontend:** `detail-finished-unit.vue` + `detail/Serials.vue`, `detail/Replacements.vue`, `detail/Movements.vue`

- **Composition** (`getFinishedUnitComposition` → `getBomComponentsData`): joins `bom_product_components` (recipe) with `finished_unit_components` (per-unit overrides) keyed by `bom_component_id`, plus a serial sub-query from `finished_unit_component_assignments`.
- **Replacements** (`getFinishedUnitReplacements`): reads `finished_unit_component_replacements`.
- **Movements** (`getFinishedUnitMovements`): reads `serial_number_movements` for the unit.

---

## 6. How the Frontend Drives the Faulty Flow

`detail/Finished-Units.vue`
- "Mark Faulty" button → `makeFaulty(row)` → sets `selectedUnit = { ...row }` and opens `MarkFaultyDialog`.

`MarkFaultyDialog.vue`
- Renders `Serials-Composition` (only for a single, non-bulk unit).
- On submit → `collectActions()` builds the `components[]` array from the composition rows, then emits `confirm` with `{ unit, units, reason, remarks, returnComponents, components }`.

`Serials-Composition.vue`
- `fetchComponents()` calls `bom-product/finished-unit/{unit}/composition`.
- Builds grouped rows; **each serial row carries `bom_component_id`, `component_product_id`, `assigned_serial_id`, `serial_number`, `assigned_qty`** so the backend can target the right `finished_unit_components` row.
- `collectActions()` emits only rows that have an identifier and a chosen action, and never lets a sparse external `serials` prop clobber the fetched data.

`detail/Serials.vue`
- Shows the composition table per unit with **Replace / Assign / Remove** actions.
- When the finished unit status is **Faulty (4)**, these actions are disabled (guarded by `!isUnitFaulty`), so no component edits are allowed on a faulty unit.

`detail-finished-unit.vue`
- `confirmFaulty(data)` builds the final payload:
  ```js
  {
    unit_ids: data.units.length ? data.units.map(u => u.id) : [data.unit.id],
    status: 4,
    reason: data.reason,
    remarks: data.remarks,
    return_components: data.returnComponents,
    components: data.components || [],
  }
  ```
- POSTs to `bom-product/finished-unit/status`, then refreshes detail + movements.

---

## 7. Matching Strategy & Null Handling (important)

The `finished_unit_components` row is keyed by `parent_serial_id` + `bom_component_id` (and optionally `component_product_id`). In production, some rows (especially "Other" components) may have a **NULL `bom_component_id`**. The backend helpers handle this:

- `updateFinishedUnitComponentRow()` / `decrementFinishedUnitComponentQty()` match by `bom_component_id` **and fall back to `component_product_id`** when available, so a NULL `bom_component_id` row is still updated.
- `recordComponentReplacement()` resolves `bom_component_id` from the assignment → the payload (`$componentAction['bom_component_id']`) → the `$data`, and **skips the history insert with a `Log::warning` if it cannot resolve a value** (avoids a NOT NULL constraint error).
- The frontend `Serials-Composition.vue` sends `bom_component_id`/`component_product_id` for every component row so the backend always has an identifier.

---

## 8. Finished-Unit Faulty "Standards"

When a finished unit is marked **Faulty (status 4)**:

1. **Fault metadata** is stored: `product_serial_numbers.status_reason` + `remarks`.
2. **Quarantine movement**: components marked faulty move Outbound to Quarantine; rolled-back components move Inbound back to Main Warehouse.
3. **Component status**:
   - `mark_faulty` → `finished_unit_components.status = 4 (Faulty)`.
   - `rollback` (serialized / Other-serialized) → `status = 4 (Faulty)`.
   - `rollback` (non-serialized / Other-qty) → `status = 5 (Removed)`.
4. **Stock**: real serialized components are restored to In Stock + product stock incremented; non-serialized real products have qty restored; "Other" components have no product stock to restore.
5. **History & audit**: each rollback writes a `finished_unit_component_replacements` row and a `serial_number_movements` row.
6. **Lockdown**: a Faulty unit disables Replace/Assign/Remove in the UI until the unit is repaired and its status is changed back (e.g. to In Stock).

---

## 9. Stock Adjustments (Post-Production)

**Backend:** `createAdjustment()`, `createAdjustmentLineItems()`, `getStockMovements()`, `getReportAdjustment()`, `updateStatusAdjustments()`
**Frontend:** product detail → Adjustments; `detail/Stock-Movement.vue`

- `product_adjustments` holds the adjustment header (product, type, reason, status).
- `product_adjustment_line_items` holds per-item qty changes.
- `serial_number_movements` records every Inbound/Outbound movement for audit.
- Adjustments can be created/updated, line items added, statuses changed, and deleted.

---

## 10. Common Pitfalls / Troubleshooting

| Symptom | Likely cause | Fix / check |
|---|---|---|
| `finished_unit_components` status not updating | Row keyed by NULL `bom_component_id` | Use `component_product_id` fallback (handled) |
| `finished_unit_component_replacements` NOT NULL violation on `bom_component_id` | No assignment + no payload `bom_component_id` | Payload must send `bom_component_id`; helper skips with `Log::warning` |
| Serial not restored to stock on rollback | Wrong/no assignment match | `findFinishedUnitAssignment` priority: serial id → serial number → product id → bom id |
| Faulty unit still allows edits | Frontend not passing unit status | `Serials.vue` uses `finished-unit-status` prop + `isUnitFaulty` guard |
| Phantom movements (qty 1) for empty components | Frontend sent all-null component rows | `collectActions()` skips rows with no identifier |