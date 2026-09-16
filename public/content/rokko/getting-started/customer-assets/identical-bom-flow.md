# Identical BOM Flow — How Customer Assets Reuse the BOM Engine

> This page explains the **most important architectural idea** of the Customer Assets module:
> it does not build its own component engine. It **reuses the exact same tables, backend
> services and Vue components** as the BOM (Bill of Materials) / Finished Unit module, and
> simply switches a **context flag** from `bom` to `customer_asset`.

---

## 1. The idea in plain English

The BOM module already solves a hard problem: *"a finished product is made of parts — track
which specific part (serial) is on which unit, allow swapping parts, and keep the warehouse
stock correct."*

A customer asset is the **same shape of problem**: *"a machine at a customer site is made of
parts — track which specific part is on it, allow swapping parts during service, keep the
warehouse stock correct."*

So instead of writing a second engine, Rokko made the existing BOM engine **context-aware**.
One flag (`type`) in the database and one prop (`context`) in Vue tells the whole system
whether a row belongs to a BOM finished unit (`1`) or to a customer asset (`2`).

> **Because they are identical systems, every bug fix or improvement made to the BOM flow
> automatically improves the Customer Asset flow too — and vice-versa.**

---

## 2. The shared foundation

### 2.1 Shared database tables (the "engine")

| Table | Type 1 = BOM finished unit | Type 2 = Customer asset |
|---|---|---|
| `finished_unit_components` | `parent_serial_id` = `product_serial_numbers.id` of the finished unit; `bom_product_id` = the BOM product; `bom_component_id` = the recipe line | `parent_serial_id` = `equipment.id`; `bom_product_id` = the same `equipment.id`; `bom_component_id` = **NULL**; `type = 2` |
| `finished_unit_component_assignments` | Which serial/qty is installed in the unit | Which serial/qty is on the asset (`type = 2`) |
| `finished_unit_component_replacements` | Swap history for the unit | Swap history for the asset (`type = 2`) |
| `serial_number_movements` | Stock ledger | Same ledger with `module = 'Customer Asset'` |

The customer-asset rows ride the **same** tables; the `type` column keeps the two flows apart.
The `2026_09_09_000001_add_type_and_customer_asset_support_to_finished_unit_tables.php`
migration made the `bom_product_id` / `bom_component_id` columns nullable and added
`type`, `component_type`, `uom`, `is_serialized`, `is_mandatory`, `image` so customer-asset
lines (which have **no** BOM template) can be stored.

### 2.2 Shared backend service

`FinishedUnitComponentService` is the single engine. Both controllers call it:

```text
BOM product flow                    Customer asset flow
BomProductController                EquipmentComponentController
        │                                    │
        ▼                                    ▼
        └──────────► FinishedUnitComponentService ◄──────────┘
                          │
                          ├── getComposition()
                          ├── addCompositionLine() / update / delete
                          ├── assignComponent()
                          ├── replaceComponent()
                          ├── removeComponent()
                          ├── syncAssetMirror()          (BOM side also syncs)
                          └── syncAssetStatus()          (customer-asset only)
```

For the BOM flow the "parent" is a finished unit (a `product_serial_numbers` row); for the
customer asset flow the "parent" is an `equipment` row. The service resolves it via
`findEquipment()` — in the asset context, `line->parent_serial_id` **is** the asset id.

### 2.3 Shared frontend components

The same Vue components render both flows. They receive a `context` prop:

| Component | BOM usage | Customer-asset usage |
|---|---|---|
| `CompositionLifecycle.vue` | Finished-unit detail composition tab (`context` default `"bom"`) | Asset detail composition tab (`context="customer_asset"`) |
| `ManageBomCompositionDialog.vue` | BOM product composition editor (bulk PUT) | Asset composition editor (per-line API) |
| `AssignComponentSerialDialog.vue` | Assign serials to a unit | Assign serials to an asset |
| `Replacements.vue` | Unit replacement history | Asset replacement history |
| `Movements.vue` | Unit stock movements | Asset stock movements |

---
## 3. How the frontend switches context

### 3.1 The `context` prop

Every shared component accepts `context`:

```js
// CompositionLifecycle.vue — prop definition
context: { type: String, default: "bom" }   // "bom"   → parentId = product_serial_numbers.id
                                            // "customer_asset" → parentId = equipment.id
```

`context === "customer_asset"` is exposed to the template/methods as the computed `isAsset`.

### 3.2 Endpoint resolution — same payload, different base URL

The `api()` computed in `CompositionLifecycle.vue` resolves every endpoint by context
(identical request payloads; only the URL base + line-FK key change):

```js
const base = this.isAsset ? "equipment-component" : "bom-product/finished-unit";
api = {
  composition:  () => `${base}/${id}/composition`,
  assign:       () => this.isAsset
                    ? "equipment-component/component/assign"
                    : "bom-product/finished-unit/component/assign",
  replace:      () => this.isAsset
                    ? "equipment-component/component/replace"
                    : "bom-product/finished-unit/component/replace",
  remove:       () => this.isAsset
                    ? "equipment-component/component/remove"
                    : "bom-product/finished-unit/component/remove",
  replacements: () => `${base}/${id}/replacements`,
}
```

- `Movements.vue` and `Replacements.vue` do the same ternary on their `fetch` URL.
- `ManageBomCompositionDialog.vue` uses the asset URL pattern only when `isAsset`:
  per-line `equipment-component/{assetId}/composition[/{line}]` instead of the bulk
  `bom-product/{productId}/composition` PUT.
- `AssignComponentSerialDialog.vue` hides the "Finished Unit" header row when `isAsset`
  (the parent is a customer asset, not a finished unit). Stock gating is identical — it reads
  the component product's `initial_stock`.

### 3.3 Row-shape normalisation

BOM and asset endpoints return slightly different key names, so `fetchComponents()` maps rows
onto one shared contract. In the asset context it calls `mapAssetRow(item, toISO)` which
normalises the `FinishedUnitComponentService` row shape onto the BOM-style row that the
template, assign dialog and replace dialog expect.

### 3.4 `parentHasAssignments` lock

`Detail-Equipment.vue` passes the server-computed `has_assignments` flag so the UI can lock the
composition editor based on **real assignment rows** — important for non-consumable assets whose
lines are "pre-assigned" (assigned_qty = required_qty) in the DB but have **no** real assignment
rows yet. Pre-assigned quantity is never treated as an assignment; only an active row in
`finished_unit_component_assignments` counts.

---

## 4. Where the two flows deliberately differ

| Aspect | BOM finished unit | Customer asset |
|---|---|---|
| Parent record | `product_serial_numbers` (finished unit serial) | `equipment` row |
| Recipe template | **Yes** — `bom_product_components` of the BOM product (`is_asset = 0`) copied onto each unit | **No** — lines are built ad-hoc on the asset itself; `bom_component_id = NULL` |
| Composition save | Bulk `PUT bom-product/{id}/composition` | Per-line POST/PUT/DELETE `equipment-component/{asset}/composition[/{line}]` |
| Line mirror | `bom_product_components` is the source | `bom_product_components` rows with `is_asset = 1`, `product_id = asset id` mirror the real lines (`finished_unit_components`) |
| Non-consumable behaviour | Units manufactured from a batch pre-populate lines; assignment follows | Lines are pre-assigned at creation (no Assign phase — only Replace/Remove) |
| Asset status | Unit status on `product_serial_numbers.status` | Derived `equipment.activated` from mandatory-line completion |
| Movements module label | Manufacturing / component stock wording | `module = 'Customer Asset'`, `product_type = 'equipment'` |
| "Manage Composition" entry | On the BOM product create/edit page | On the asset detail composition tab, `canManageComposition = isAsset && !hasAssignments` |

---

## 5. The mirror table — `bom_product_components.is_asset`

The asset's composition is also mirrored into `bom_product_components` so existing code that
reads `bom_product_components` (stock helpers, listings, product detail composition views) can
see asset lines without changes:

- `is_asset = 0` → a real BOM product component (the recipe),
- `is_asset = 1`, `product_id = <asset id>` → a mirrored customer-asset line.

`BomProductComponent::syncAssetLine()` upserts a mirror row; `removeAssetLine()` removes it;
`scopeAssetComponents()` reads them. The asset model exposes
`product_composition()` (`hasMany BomProductComponent where is_asset = 1`).

---

## 6. Why "identical" is the right word

Both flows share **100% of these behaviours**:

- one serial can only be assigned once per (parent + component line) — duplicate guards,
- assign serials / typed manual serials / non-serialized quantity on the same endpoints,
- replace with reasons (`faulty`, `warranty_replacement`, `upgrade`) + warranty actions,
- remove good → back to stock; remove faulty/damaged → quarantine,
- stock deduction/restore through the same `ProductTrait` helpers
  (`handleComponentStock`, `handleSerializedComponentOutbond`, `releaseSerialToInbond`),
- stock ledger rows with `previous_qty` / `available_qty` snapshots at write time,
- line status + parent status re-derived after every write.

