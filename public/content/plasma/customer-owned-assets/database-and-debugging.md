# Asset database and debugging

The master model is `App\Models\Equipment\Equipment`, table `equipment`. Relevant fields are `barcode`, encrypted `serial_no`, `name`, `equipment_type`, `customer`, `property`, `activated`, `status`, `faulty`, `retired`, warranty fields, purchase fields, and audit fields.

`App\Models\AssetAllocation` represents `asset_allocations`. Its key fields are `asset`, `parent`, `line_item_id`, `type`, `start_date`, `cease_date`, `activated`, `asset_status`, `return_status`, `return_date`, and audit fields. The migration `2026_06_23_113157_create_customer_asset_allocations_table.php` documents type `1` as Own Asset and type `2` as Customer Asset.

When an asset is wrong in a rental, compare:

1. Equipment master state.
2. Rental line item `type`, `parent`, `product`, `product_type`, `asset_status`, `is_future_asset`, and `remarks`.
3. Allocation `asset`, `parent`, `line_item_id`, `type`, dates, `activated`, `asset_status`, and `return_status`.
4. Equipment activity and `rental_histories`.

For return propagation inspect `RentalController::bulkReturnItems()`. For equipment-button propagation inspect `EquipmentController::updateStatusEquipment()` and `syncActiveRentalLineItemStatuses()`.

## Legacy pages

`frontend/src/view/pages/new-equipment-client/Asset.vue` and `Detail-Asset.vue` use `asset`, `asset-count`, `asset/import`, and `single-customer` endpoints. Those routes were not present in the current route list, so these components are legacy/unwired until verified in the deployment.

