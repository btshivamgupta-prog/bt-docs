# Customer Assets — Database Tables

> Every table used by the Customer Assets module, with key columns. All customer-asset
> composition rows ride the **same tables as the BOM flow** and are separated by the `type`
> column (`1` = BOM finished unit, `2` = customer asset).

---

## 1. Entity relationship overview

```text
customers 1─* equipment 1─1 customer_equipment_config
                 │
                 │ 1 ── *  finished_unit_components        (the parts list lines, type = 2)
                 │            │ 1 ── * finished_unit_component_assignments  (serials/qty on the line)
                 │            │ 1 ── * finished_unit_component_replacements (swap history)
                 │
                 │ is mirrored into:
                 ▼
          bom_product_components  (product_id = equipment.id, is_asset = 1)
                 │
                 ▼
          products  (component master — stock lives here)
          product_serial_numbers  (physical serials; stamped Out of Stock when on the asset)
          serial_number_movements (the ledger, module = 'Customer Asset')
```

## 2. `equipment` — the asset master

The row behind every customer asset (also used for tools and sale assets, differentiated by
`equipment_type` / `type` / `main_type`).

| Column | Notes |
|---|---|
| `id` | PK |
| `barcode` / `equipment_no` | Asset number plate shown in listings ("Customer Asset #") |
| `customer`, `property` | Customer & site address (FK to `customers`, `address`) |
| `name`, `serial_no`, `model`, `brand`, `category`, `location` | Master attributes |
| `main_type` | `main_customer` (customer-owned) vs `main_company` |
| `equipment_type` | `customer-asset` context vs `tool` / `asset` / `sale` |
| `is_consumable` | **The workflow switch** — 0 = pre-assign lines, 1 = assign over time |
| `activated` | Asset status: 0 Inactive · 1 Active · 2 Pending · 3/4 others |
| `faulty`, `retired`, `damage` | Lifecycle flags |
| `has_warranty`, `warranty_start_date`, `warranty_end_date`, `warranty_*` | Asset-level warranty (drives `parent` warranty action) |
| `ship_date`, `delivery_date`, `delivery_remark` | Delivery info |
| `added_by`, `added_at`, `updated_by`, `updated_at`, `deleted_at` | Audit & soft-delete |

> Many columns are encrypted (`ESolution\DBEncryption\EncryptedAttribute` trait), e.g.
> names and serial numbers, so raw SQL needs AES_DECRYPT (see `getMovements`).

## 3. `customer_equipment_config` — machine specifications (1:1)

| Column group | Fields |
|---|---|
| Machine | `machine_model`, `machine_serial_number`, `dicing_engine_model`, `dicing_engine_serial_number`, `electrical_requirements`, `offloading_option`, `z_pickers` |
| Software | `dicer_engine_software_version`, `handler_software_hmi`, `handler_software_sequence`, `win_os` |
| PCs | `system_pc_model_no`, `system_pc_serial_no`, `system_pc_runtime_license_pac_no`, `vision_pc_model_no`, `vision_pc_serial_no` |
| Linear ways | `x1_axis_linear_way_*`, `x2_axis_linear_way_*`, `x3_axis_linear_way_*` |
| Driver boards | `driver_board_identifications`, `x1/x2/x3_axis_driver_board_*` |
| Vision/Vacuum | `vision_system_config_type`, `vacuum_pump` |
| Warranty | `warranty_start_date`, `dicing_engine_mfg_date` |

Unique constraints on `machine_serial_number` and `dicing_engine_serial_number` prevent
duplicating the same machine under two assets.

## 4. `finished_unit_components` — the composition lines

One row per part on the asset (`type = 2`).

| Column | Notes |
|---|---|
| `type` | **2 = customer asset** (1 = BOM finished unit) |
| `parent_serial_id` | **= `equipment.id`** in the asset context |
| `bom_product_id` | Mirrors `parent_serial_id` (= equipment id) for the asset context |
| `bom_component_id` | **NULL** for asset lines (no BOM recipe) |
| `component_product_id` | FK `products.id` (NULL when `is_other = 1`) |
| `is_other`, `component_name`, `component_code`, `component_type`, `uom` | Free-form/write-in part metadata |
| `required_qty`, `assigned_qty` | Requested vs currently assigned qty |
| `is_serialized`, `is_mandatory`, `image` | Slot behaviour flags |
| `status` | 1 Assigned · 2 Pending · 3 Installed · 4 Faulty · 5 Removed |
| `warranty_start` / `warranty_end` / `warranty_source` | Line-level warranty |
| `purchase_date`, `remarks`, `added_by`/`updated_by`, timestamps | Audit |

## 5. `finished_unit_component_assignments` — what is actually on the line

| Column | Notes |
|---|---|
| `type` | 2 = customer asset |
| `parent_serial_id` | `equipment.id` |
| `finished_unit_component_id` | The composition line this assignment belongs to |
| `bom_component_id` | NULL for asset rows |
| `component_product_id` | The part product |
| `assigned_serial_id` | FK `product_serial_numbers.id` for serialized assignments |
| `serial_number` | Plain-text serial for manually typed serials |
| `assigned_qty`, `is_serialized` | Quantity mode |
| `supplier_id`, `purchase_date`, `purchase_price` | Procurement info |
| `warranty_source`, `warranty_start`, `warranty_end` | Assignment-level warranty |
| `status` | 1 Assigned · (removal marks 3 Removed / 4 Faulty) |
| `added_by`, `assigned_at`, timestamps | Audit |

## 6. `finished_unit_component_replacements` — swap history

| Column | Notes |
|---|---|
| `type` | 2 = customer asset |
| `parent_serial_id` | `equipment.id` |
| `finished_unit_component_id` | The line that was swapped |
| `old_assignment_id`, `old_serial_id`, `old_serial_number` | The departing part |
| `new_assignment_id`, `new_serial_id`, `new_serial_number` | The arriving part |
| `reason` | `faulty`, `warranty_replacement`, `upgrade`, `rollback` |
| `warranty_action` | `continue`, `reset`, `none`, `parent` |
| `warranty_start`, `warranty_end`, `remarks` | Final state |
| `replaced_by`, `replaced_at` | User & time |
## 7. `bom_product_components` — the BOM recipe table (also the asset mirror)

| Column | Notes |
|---|---|
| `product_id` | BOM product id (`is_asset = 0`) **or asset id** (`is_asset = 1`) |
| `is_asset` | **0 = BOM recipe · 1 = mirrored customer-asset line** |
| `component_product_id` | The part product |
| `is_other`, `component_name`, `component_code`, `component_type`, `qty`, `uom` | Part metadata (mirrors the composition line) |
| `is_consumable`, `is_mandatory`, `is_serialized`, `serial_no`, `image`, `remarks` | Behaviour flags |
| `status`, `added_by`, timestamps, soft deletes | Audit |

> `BomProductComponent::syncAssetLine()` keeps a mirror per composition line so existing BOM-Area
> readers (stock helpers, product composition views) work for assets without changes.

## 8. `product_serial_numbers` — physical serials

Component serials assigned to assets, and (for BOM) finished-unit serials.

| Column | Notes |
|---|---|
| `id`, `text` | Serial id + display text |
| `product` | FK to the owning product |
| `product_type` | `goods` / `parts` / `bom_product` / `equipment` |
| `status` | 1 In Stock · 2 Rented · 3 Out of Stock · 4 Faulty · 5 Damaged · 6 Scrapped |
| `activated` | 1 = usable; 0 = currently bound elsewhere (asset/unit/quarantine) |
| `outbond_id`, `outbond_barcode`, `outbond_module_type`, `is_outbond`, `bond_type`, `out_bond_date` | Where the serial is currently held (asset binding uses module type `equipment`) |
| `barcode_image`, `serial_image` | QR/barcode visuals |
| `batch`, `status_reason`, `remarks` | Batch + status audit |

## 9. `serial_number_movements` — the movements ledger

| Column | Notes |
|---|---|
| `serial_number_id` | The serial (0 = product-level aggregate row) |
| `product_id`, `product_type` | Component product; `product_type = 'equipment'` for asset rows |
| `module` | **`Customer Asset`** for this module (Rental/Visit/Manufacturing/… for others) |
| `module_id` | `equipment.id` |
| `reference_no` | Asset barcode |
| `movement_type` | `Inbound` / `Outbound` |
| `from_location`, `to_location` | `Component Stock` ⇄ `Customer Asset` ⇄ `Quarantine` |
| `previous_qty`, `available_qty` | Stock snapshot at write time |
| `remarks` | Human-readable summary (`<Product/Part> Serial: X | Assigned to Asset: #<barcode>`) |
| `status`, `added_by`, `added_at` | Audit |

## 10. Supporting tables (touched but owned by other modules)

| Table | Role here |
|---|---|
| `products` | The component master; `available_stock` / `stock_on_hand` / `initial_stock` are incremented/decremented |
| `customers` / `address` (`property`, `site_location`) | Asset ownership + site |
| `tags` | `client_tags` rows (`type = 'client_equipment'`) |
| `transaction_documents` | Asset images / attachments (`type` 9, 10, 23, 80) |
| `users` | `added_by` / `updated_by` / `replaced_by` |
| `warranties` | Asset-level warranty row (parent warranty source) |
| `equipment_machine_options` | Dropdown option lists for machine specification fields |
| `equipment_histories` | Audit of asset master changes |

---

## 11. Status & type constants (quick reference)

```text
finished_unit_components.type          1 = BOM finished unit · 2 = customer asset
finished_unit_components.status        1 Assigned · 2 Pending · 3 Installed · 4 Faulty · 5 Removed
bom_product_components.is_asset        0 = BOM recipe · 1 = asset mirror
equipment.activated                    0 Inactive · 1 Active · 2 Pending
product_serial_numbers.status          1 In Stock · 2 Rented · 3 Out of Stock · 4 Faulty · 5 Damaged · 6 Scrapped
```

## 12. Migration files that build this module

| Migration | Purpose |
|---|---|
| `2022_01_03_153819_create_equipment_table.php` | `equipment` master |
| `... (multiple equipment ALTERs)` | barcode image, machine number, is_consumable, damaged, ship date, etc. |
| `2026_08_08_102357_create_customer_equipment_config_table.php` | Machine specs (1:1) |
| `2026_07_17_085328_create_bom_product_components_table.php` | Recipe table (+ `2026_09_11_000000_add_is_asset...`) |
| `2026_08_03_144420_create_finished_unit_component_assignments_table.php` | Assignments |
| `2026_08_04_094643_create_finished_unit_components_table.php` | Lines |
| `2026_08_04_134500_create_finished_unit_component_replacements_table.php` | Replacements |
| `2026_09_09_000001_add_type_and_customer_asset_support_to_finished_unit_tables.php` | Adds `type`, makes `bom_*` nullable, adds asset columns |
| `2026_07_23_090000_create_serial_number_movements_table.php` | Ledger |
| `2026_05_01_113604_create_product_serial_numbers_table.php` | Serials |
| `2026_08_10_135230_create_equipment_machine_options_table.php` | Machine option dropdowns |

