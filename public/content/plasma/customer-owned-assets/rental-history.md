# Customer-owned asset rental history

The asset-specific rental endpoint is:

`GET /api/get-rentals/{equipment}` → `EquipmentController::getAssetsRental()`.

It queries `asset_allocations` for the equipment ID and allocation `type = 1`, then loads the linked type-9 rental line item and rental. Returned data includes allocation dates/status, line-item condition/remarks, rental barcode/status, customer barcode, and property.

Supported filters are `status`, `filterDate`, `rental_status`, `condition`, `return_status`, `exclude_rental_id`, `current_page`, and `per_page`.

`return_status = pending_return` means allocation return status is null or not `1`; `returned` means `return_status = 1`. `condition` filters the linked line item's `asset_status`. `exclude_rental_id` is used to avoid considering the rental currently being edited.

The current `Detail-Equipment.vue` source does not visibly call this endpoint; whether a separate active tab consumes it is **Not verified**. The backend route is verified with `php artisan route:list`.

