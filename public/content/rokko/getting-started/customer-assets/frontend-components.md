# Customer Assets — Frontend & Components

> **Stack:** Vue 2 + Vuetify, Vuex (`request.module` store), Vue Router.
> The module uses the shared **BOM components** for composition — only the `context` prop differs.

---

## 1. Frontend routes (`frontend/src/router.js`)

| Path | Route name | Component |
|---|---|---|
| `client-equipment` | `admin.client-equipment` | `Equipment.vue` (listing) |
| `client-equipment/create` | `admin.client-equipment.create` | `Create-Client-Equipment.vue` |
| `client-equipment/update/:id` | `admin.client-equipment.update` | `Create-Client-Equipment.vue` (update mode) |
| `client-equipment/detail/:id` | `admin.client-equipment.detail` | `Detail-Equipment.vue` |

Menu / permission wiring: `database/seeder-data/menu-list.json` (menu `assets`, route
`admin.client-equipment`) and `permissions.json` (`client-equipment:view/create/update`).

---

## 2. Module pages

### 2.1 `Equipment.vue` — Listing (`view/pages/equipment-client/`)

- Uses `ListingTemplate` / `ListingHeader` / `PageHeaderCount` (shared listing framework).
- Data config: `pageModule: "equipment-listing"`, `routeAPI: "equipment"` (GET `/equipment`),
  `routeName: "client-equipment"`; current-view columns come from
  `database/seeder-data/tables.db.json` (`type = client_equipment` — "Customer Asset #",
  status, customer, site, warranty, etc.).
- Status filter + PageHeaderCount (`all_equipments`, `equipment_status_count`).
- Bulk action menu (mark active/pending/faulty/damaged/retired via `updateStatusEquipment`),
  export, Excel import (`equipment/import/customer-asset`), tag filter (`tags/client_equipment`).
- Barcode component links rows to `client-equipment.detail`.

### 2.2 `Create-Client-Equipment.vue` — Create / Update (`view/pages/new-equipment-client/`)

One large page used for both create and update (`equipmentId > 0` switches the URL to
`equipment-new/{id}`). It includes:

- Asset master form: customer (company / personal), site `property`, barcode, name, model,
  serial no., brand/category, delivery info, preventive maintenance, warranty block.
- **Machine Specification panel** bound to `customer_equipment_config` fields (axes, driver
  boards, options, PCs — options loaded from `equipment_machine_options` /
  `setting/equipment`).
- **Tags** (`TagAutoComplete type="client_equipment"`), **documents** (`DocumnetList` with
  `tag-type="client_equipment"`).
- **Composition editor**: the same component row editor used by BOM products, stored in
  `assetComposition`. `getCompositionPayload()` maps it to the `type = customer_asset` payload
  (`component_product_id`, `is_other`, `component_name`, `component_code`, `component_type`,
  `uom`, `is_serialized`, `is_mandatory`, `image`, `required_qty`, `remarks`).
- `is_consumable` toggle (`assetConsumable`) that switches the workflow and hides the
  "Consume" column for non-consumable assets.
- On save: `formData.append("composition", JSON.stringify(getCompositionPayload()))` so the
  asset **and** its lines are created atomically via `equipment-new`. Composition is skipped
  once `assetHasAssignments` is true (locked edits).
- In update mode it preloads the asset + composition; `assetHasAssignments` comes from the
  server's `has_assignments` flag.
### 2.3 `Detail-Equipment.vue` — Detail (`view/pages/equipment-client/`)

DetailTemplate layout. Header chips (status, customer-own / company, Faulty / Retired /
Damaged) + `BasicOverview` sidebar. Tabs:

| Tab id | Component / content |
|---|---|
| `basic` / overview | `BasicOverview` |
| `preventive-maintenance` | `PreventiveInternalList` |
| `visits` | `VisitInternal`, `VisitSpareInternal` |
| `warranty` | `WarrantyInternalList` |
| `attachment` | `AdditionalDocuments tag-type="client_equipment"` |
| `job` / `quotation` / `invoice` | `Tickets` / `Quotations` / `Invoices` (`type="product"`) |
| `history` | `InternalHistoryDetail` |
| **`composition`** | **`CompositionLifecycle context="customer_asset"`** |
| **`replacements`** | **`Replacements context="customer_asset"`** |
| **`movements`** | **`Movements context="customer_asset"`** |
| `machine-specifications` | Machine config display |

Glue logic:

- Loads the detail via `GET equipment/{id}`; reads `detail.has_assignments` and
  `detail.is_consumable` to drive tab behaviour.
- `ManageBomCompositionDialog context="customer_asset"` is bound at the page level
  (`v-model="manageCompositionDialog"`); the Composition tab's *Manage Composition* button
  emits `manage-composition` to open it.
- `@assigned` on the lifecycle refreshes the sibling Replacements + Movements tabs
  (`refreshLifecycleTabs`).
- Status dialogs (`statusConfirmation` / `retiredConfirmation`) handle Activate / Pending /
  Faulty / Retired / Damaged.

---

## 3. Shared components (from the BOM module) — the "identical BOM UI"

All located in `frontend/src/view/pages/bom-product/` and re-used by the asset detail page.

### 3.1 `bom-product/detail/CompositionLifecycle.vue`

The composition tab for both BOM finished units and customer assets.

- **Props:** `context` (`"bom"` default / `"customer_asset"`), `parentId`, `title`,
  `parentHasAssignments`, `isConsumable`, `parentWarranty`, `finishedUnitStatus`.
- Computed `isAsset() { return this.context === "customer_asset" }`.
- **API resolver** (`api()` computed) switches the base URL
  (`equipment-component` vs `bom-product/finished-unit`) while keeping payloads identical.
- Fetches rows (`fetchComponents()`), normalises asset rows via `mapAssetRow()` onto the
  shared contract, renders serials + "req X of Y", status chips (`BomStatusChip`),
  warranty columns.
- Row actions in the asset context: **Assign** (consumable, opens
  `AssignComponentSerialDialog`), **Replace** (replace dialog with reason + warranty-action
  options), **Remove** (good / faulty confirmation → `POST equipment-component/component/remove`).
- `canManageComposition = isAsset && !hasAssignments` — only the asset context shows the
  *Manage Composition* entry, and only while nothing is really assigned.

### 3.2 `bom-product/components/AssignComponentSerialDialog.vue`

- Props include `context`; `isAsset` hides the "Finished Unit" info row.
- Stock gating identical to BOM: `availableStock` = component product `initial_stock`,
  `maxAssignable` = min(remaining, stock), manual-serial mode for "other" parts.
- Warranty options (`parent` / `component` / `new` / `none`) with locked date display.
- Emits the assign payload to the parent, which POSTs to
  `equipment-component/component/assign` (or the BOM assign endpoint).

### 3.3 `bom-product/components/ManageBomCompositionDialog.vue`

- Props: `context`, `parentId`, `isConsumable`, `components`.
- **BOM path:** single bulk `PUT bom-product/{productId}/composition`.
- **Asset path (`isAsset`):** diffs edited rows vs the server snapshot and calls per-line
  `POST` / `PUT` / `DELETE equipment-component/{ownerId}/composition[/{line}]`
  (`saveAssetComposition`), deleting removed lines last.
- `buildAssetLinePayload()` maps a dialog row to the asset line payload.

### 3.4 `bom-product/detail/Replacements.vue`

- Props: `context`, `parentId`. URL ternary:
  `equipment-component/{unitId}/replacements` when `isAsset`.
- Renders the swap history (date, item, old serial → new serial, reason, warranty impact,
  replaced-by).

### 3.5 `bom-product/detail/Movements.vue`

- Props: `context`, `unitId`. URL ternary to `equipment-component/{unitId}/movements`.
- Filters: module dropdown, `DateRangePicker`, free-text search.
- Renders the ledger with a movement-direction arrow and module colour chips
  (`Customer Asset` → indigo), highlights error remarks.

---

## 4. How data flows in the UI

```text
Detail-Equipment.vue (context="customer_asset")
   │ CompositionLifecycle ──fetch──► GET equipment-component/{id}/composition
   │     │  Assign / Replace / Remove (POST equipment-component/component/*)
   │     ▼
   │  emits "assigned" / "replaced" / "removed"
   │
   ├── Replacements.vue ──refetch──► GET equipment-component/{id}/replacements
   └── Movements.vue    ──refetch──► GET equipment-component/{id}/movements
```

- All HTTP goes through the `request.module` Vuex store (`GET` / `POST` / `PUT` / `DELETE` /
  `QUERY` actions → `ApiService`).
- Cross-tab refresh uses Vue component refs (`this.$refs.replacementsTab`, `movementsTab`)
  and the shared `PaginationEventBus` for listing pagination.

---

## 5. Component → file index (quick lookup)

| File (in `frontend/src/`) | Role |
|---|---|
| `view/pages/equipment-client/Equipment.vue` | Customer asset listing |
| `view/pages/equipment-client/Detail-Equipment.vue` | Asset detail + composition/replacements/movements tabs |
| `view/pages/new-equipment-client/Create-Client-Equipment.vue` | Create / edit asset + atomic composition |
| `view/pages/bom-product/detail/CompositionLifecycle.vue` | **Shared** composition lifecycle tab |
| `view/pages/bom-product/detail/Replacements.vue` | **Shared** replacements history tab |
| `view/pages/bom-product/detail/Movements.vue` | **Shared** movements ledger tab |
| `view/pages/bom-product/components/ManageBomCompositionDialog.vue` | **Shared** composition editor dialog |
| `view/pages/bom-product/components/AssignComponentSerialDialog.vue` | **Shared** assign-serial dialog |
| `view/components/History-Logs.vue`, `History-Logs-Bom.vue` | Audit rendering (`customer asset` chip colour) |
| `view/pages/partials/Line-Item-V2.vue` / `Line-Item-Projects.vue`etc. | Add customer-asset lines to jobs/projects (`relatedType` 7 / `type = equipment`) |
| `core/plugins/genic-setting.js` | "Client Equipment" label mapping |

