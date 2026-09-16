# Customer Assets — Backend Architecture

> **Stack:** Laravel 8 (PHP) + MySQL. All endpoints live in `routes/api.php` inside the
> authenticated API group (`auth:api` + permission middleware where applicable).

---

## 1. Component map

```text
┌────────────────────────── CONTROLLERS ──────────────────────────┐
│ EquipmentController           asset CRUD, list, detail, status, │
│   (app/Http/Controllers)      import — incl. the atomic          │
│                               composition save (equipment-new)   │
│ EquipmentComponentController  customer-asset COMPOSITION API —   │
│                               thin wrapper over the service      │
│ BomProductController          BOM flow (same service, type = 1)  │
└──────────────────────────────┬──────────────────────────────────┘
                               ▼
┌────────────────────────── SERVICE ─────────────────────────────┐
│ FinishedUnitComponentService  THE engine for BOTH flows          │
│   (app/Services)             composition CRUD, assign, replace,  │
│                               remove, status engine, movements   │
└──────────────┬───────────────────────────────┬──────────────────┘
               ▼                               ▼
┌────────────────────── TRAITS ────────────────────┐
│ ProductTrait          handleComponentStock,       │
│   (app/Traits)        handleSerializedComponentOutbond, ...
└──────────────────────┬───────────────────────────┘
                       ▼
┌────────────────────── MODELS ────────────────────┐
│ Equipment / CustomerEquipmentConfig               │
│ FinishedUnitComponent / Assignment / Replacement  │
│ BomProductComponent / ProductSerialNumber /       │
│ SerialNumberMovement / Product / ProductMovement  │
└──────────────────────┬───────────────────────────┘
                       ▼
                 MySQL (tables in Database Tables page)
```

## 2. Controllers

### 2.1 `EquipmentController`

| Method | Route | Purpose |
|---|---|---|
| `getEquipments` | `GET /api/equipment` | Listing (uses `type = client_equipment` column set from the seeder) |
| `getEquipment` | `GET /api/equipment/{equipment}` | Detail: eager loads customer/property/warranty/config/tags, appends `composition` (via service) + `has_assignments` |
| `getEquipmentList` | `GET /api/equipment-list` | Dropdown / lookup list |
| `updateOrCreate` | `POST\|PUT /api/equipment/{equipment?}` | Legacy equipment save (tools / sale assets) |
| `updateOrCreateNew` | `POST /api/equipment-new` and `POST /api/equipment-new/{id}` | **Customer-asset create/update**: validates, saves the asset, saves `customer_equipment_config`, processes `composition` atomically, prunes removed lines, derives `activated` |
| `updateStatusEquipment` | `PATCH /api/equipments/status` | Bulk status change with the mandatory-composition guard |
| `updateParticularField` | `PATCH /api/equipment/{equipment}` | Single-field patches |
| `deleteEquipments` | `DELETE /api/equipment` | Bulk delete |
| `getOptions` | `GET /api/equipment/options` | Dropdown options |
| PM / Warranty / Visit helpers | `equipment/preventive-maintenances`, `equipment/warranty`, `equipment/visits/{id}`, `.../spares` | Cross-module detail tabs |
| Import | `POST equipment/import/customer-asset` | Excel import of assets |

### 2.2 `EquipmentComponentController` (the customer-asset composition API)

A thin controller — every heavy lift is delegated to `FinishedUnitComponentService`
(injected via the constructor).

| Route | Method | Service call |
|---|---|---|
| `GET equipment-component/{equipment}/composition` | `getComposition` | `getComposition()` |
| `POST equipment-component/{equipment}/composition` | `addCompositionLine` | `addCompositionLine()` |
| `PUT equipment-component/{equipment}/composition/{line}` | `updateCompositionLine` | `updateCompositionLine()` |
| `DELETE equipment-component/{equipment}/composition/{line}` | `deleteCompositionLine` | `deleteCompositionLine()` |
| `POST equipment-component/component/assign` | `assignComponent` | `assignComponent()` |
| `POST equipment-component/component/replace` | `replaceComponent` | `replaceComponent()` |
| `POST equipment-component/component/remove` | `removeComponent` | `removeComponent()` |
| `GET equipment-component/{equipment}/replacements` | `getReplacements` | direct query on `finished_unit_component_replacements` |
| `GET equipment-component/{equipment}/movements` | `getMovements` | direct query on `serial_number_movements` |

Validation is done with inline `Validator::make` (422 with the first error message). All methods
return the standard Rokko JSON envelope (`success()` / `error()`).

### 2.3 `BomProductController`

The BOM counterpart. Its finished-unit endpoints
(`bom-product/finished-unit/...`) call the **same service**, so the asset flow and the BOM flow
can never drift apart.

---

## 3. Service — `FinishedUnitComponentService`

The single source of truth for composition state. Key public methods:

| Method | Responsibility |
|---|---|
| `getComposition(int $equipmentId)` | Composition lines + active assignments + `has_replacement` flags, formatted for the UI |
| `addCompositionLine(...)` | Create a line (`type = 2`), pre-assign if non-consumable, mirror |
| `updateCompositionLine(...)` | Update (guarded: no real assignments yet), regenerate mirror |
| `deleteCompositionLine(...)` | Delete (guarded), drop stale mirror |
| `assignComponent(Request)` | Serial / manual-serial / qty assignment with stock deduction + movements + serial stamping |
| `replaceComponent(Request)` | Old assignment matching by serial text, new assignment creation, stock delta, history row, warranty |
| `removeComponent(Request)` | Remove all active assignments; `good` → stock Inbound, `faulty`/`damaged` → quarantine |
| `markComponentsStatus(...)` | Reusable status engine (used by faulty/damaged bulk flows) |
| `releaseAllComponents(...)` / `markComponentsDamaged(...)` / `markComponentsFaulty(...)` | Bulk component status changes |
| `equipmentsWithIncompleteMandatoryComposition(array $ids)` | Guard used before marking assets Active |
| `logAssetComponentsMovement(...)` | Module-facing movement helper |

### 3.1 All writes are transactional

Every mutating method wraps its work in `DB::beginTransaction()` / `commit()` / `rollBack()`;
the rollback re-throws the exception so the controller returns a 500. This guarantees that
assignments, stock, movements, mirror rows and the asset status are written **atomically**.

### 3.2 Private helpers worth knowing

| Helper | What it does |
|---|---|
| `findEquipment()` / `findLine()` | Resolve the `equipment` and `finished_unit_components` rows |
| `getLineAssignedQty()` | Sum of active assignment quantities for a line |
| `createAssignment()` | Insert one assignment row (`type = 2`, status Assigned, warranty / purchase fields) |
| `refreshLineStatus()` | Recompute `assigned_qty` / `status` and re-sync the mirror |
| `syncAssetStatus()` | Re-derive `equipment.activated` from mandatory-line completion |
| `syncAssetMirror()` | Upsert `bom_product_components` mirror (`is_asset = 1`) |
| `logSerialMovement()` / `logProductMovement()` / `logAssetMovement()` | Ledger rows with `module = 'Customer Asset'` and stock snapshots |
| `movementStockSnapshot()` | Reads current product stock into `previous_qty` / `available_qty` |
| `movementEntityLabel()` / `replaceReasonText()` | Human-readable labels for ledger remarks |
| `assetModule()` | Identity object (asset id + barcode) stamped on serials & movements |
| `assignmentQty()` / `assignmentExists()` | Assignment math and duplicate detection |

---

## 4. Trait — `ProductTrait`

Reused wholesale from the product/BOM domain:

| Statics | Purpose |
|---|---|
| `handleComponentStock(...)` | Increment/decrement `products.available_stock` / `stock_on_hand` (+ batch stock where applicable) |
| `handleSerializedComponentOutbond(...)` | Stamp serials `activated = 0`, `status = Out of Stock`, bind to the asset (`outbond_module_type = 'equipment'`) |
| `releaseSerialToInbond(...)` | Reverse — serials back to In Stock |
| `logBomStockMovement(...)` / `syncBomProductStock(...)` | Shared stock movement logging / reconciliation |

---

## 5. Models

| Model | Table | Notes |
|---|---|---|
| `App\Models\Equipment\Equipment` | `equipment` | `$fillable` covers asset/master/PM/warranty/machine fields; relations: `customer`, `property`, `site_location`, `warranty`, `brand`, `location`, `client_tags`, `product_composition()` (`bom_product_components` where `is_asset = 1`), `equipment_config()` (1:1) |
| `App\Models\CustomerEquipmentConfig` | `customer_equipment_config` | Machine specifications (1:1 with `equipment_id`) |
| `App\Models\Product\FinishedUnitComponent` | `finished_unit_components` | **Constants:** `TYPE_BOM_FINISHED_UNIT = 1`, `TYPE_CUSTOMER_ASSET = 2`; `STATUS_*` 1..5 |
| `App\Models\Product\FinishedUnitComponentAssignment` | `finished_unit_component_assignments` | Per-serial / per-qty assignment; casts dates |
| `App\Models\Product\FinishedUnitComponentReplacement` | `finished_unit_component_replacements` | Swap history; `TYPE_CUSTOMER_ASSET = 2`; `replacedBy` relation |
| `App\Models\Product\BomProductComponent` | `bom_product_components` | **Constants:** `IS_ASSET_BOM = 0`, `IS_ASSET_ASSET = 1`; statics `syncAssetLine()`, `removeAssetLine()`, `statusMapping()` |
| `App\Models\Product\ProductSerialNumber` | `product_serial_numbers` | Component serials / finished-unit serials; serial status constants |
| `App\Models\SerialNumberMovement` | `serial_number_movements` | The movements ledger (module-scoped rows) |
| `App\Models\Product\ProductMovement` | `product_serials / product movement tables` | Product-level movement history |
| `App\Models\Product\ProductSerialHistory` | `product_serial_histories` | Serial lifecycle audit |

---

## 6. Request → database business flow (one example: Assign)

```text
POST /api/equipment-component/component/assign
   │
   ▼ EquipmentComponentController::assignComponent — Validator (422 on fail)
   │
   ▼ FinishedUnitComponentService::assignComponent — findLine, qty guards
   │  DB::beginTransaction()
   │  ├── createAssignment() × N                     → finished_unit_component_assignments
   │  ├── handleComponentStock('outbond')            → products.available_stock −qty
   │  ├── logSerialMovement / logProductMovement     → serial_number_movements (snapshot)
   │  ├── handleSerializedComponentOutbond           → product_serial_numbers (activated=0, out of stock)
   │  ├── refreshLineStatus()                        → finished_unit_components.assigned_qty/status
   │  ├── syncAssetMirror()                          → bom_product_components (is_asset = 1)
   │  └── syncAssetStatus()                          → equipment.activated
   │  DB::commit()
   │
   ▼ JSON success → frontend refreshes tab
```

---

## 7. Permissions & routes

- Permission names (seeded in `database/seeder-data/permissions.json`):
  `client-equipment:full-access`, `client-equipment:view`, `client-equipment:create`,
  `client-equipment:update`.
- Menu entry (seeded in `database/seeder-data/menu-list.json`): **Customer Asset**, menu
  `assets`, route `admin.client-equipment`.
- The UI hides buttons with `getPermission('client-equipment:view' | ...:update' | ...:create')`.
- Frontend route guards also lint on the frontend router (`router.js`) with `requiresAuth`.

