# Products and Parts Module

ProductController, Parts/PartController, LineItemController, ProductTrait, ProductBatchTrait, and product/batch observers manage catalogue items, services, parts, suppliers, tax, units, and line-item selection.

Frontend pages are under frontend/src/view/pages/product and part. Product types are goods, service, or equipment. Accounting modes are fifo, fefo, or none.

Workflow: create product -> configure master data and stock flags -> use in quote/PO/ticket/invoice/project line item -> receive/allocate/adjust/move/return/convert -> update stock and history.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/part/adjustment/adjustment.vue`
- `frontend/src/view/pages/part/detail/adjustmentListing.vue`
- `frontend/src/view/pages/part/detail/AdjustmentSpplierListing.vue`
- `frontend/src/view/pages/part/detail/InventoryListing.vue`
- `frontend/src/view/pages/part/detail/InventoryTab.vue`
- `frontend/src/view/pages/part/detail/ProductAdjustment.vue`
- `frontend/src/view/pages/part/detail/ProductPriceListing.vue`
- `frontend/src/view/pages/part/detail/ProductSpplierListing.vue`
- `frontend/src/view/pages/part/detail/Warranty.vue`
- `frontend/src/view/pages/part/Part.vue`
- `frontend/src/view/pages/part/search-template.vue`
- `frontend/src/view/pages/product/adjustment/adjustment.vue`
- `frontend/src/view/pages/product/detail/adjustmentListing.vue`
- `frontend/src/view/pages/product/detail/AdjustmentSpplierListing.vue`
- `frontend/src/view/pages/product/detail/ProductAdjustment.vue`
- `frontend/src/view/pages/product/detail/ProductPriceListing.vue`
- `frontend/src/view/pages/product/detail/ProductSpplierListing.vue`
- `frontend/src/view/pages/product/detail/Warranty.vue`
- `frontend/src/view/pages/product/Product.vue`
- `frontend/src/view/pages/product/search-template.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/part/adjustment/Create-Adjustment.vue`
- `frontend/src/view/pages/part/adjustment/Detail-Adjustment.vue`
- `frontend/src/view/pages/part/Create-Part.vue`
- `frontend/src/view/pages/part/Create-Partcopy.vue`
- `frontend/src/view/pages/part/detail/adjustmentOverview.vue`
- `frontend/src/view/pages/part/detail/Overview.vue`
- `frontend/src/view/pages/part/Detail-Part.vue`
- `frontend/src/view/pages/part/partials/Create copy.vue`
- `frontend/src/view/pages/part/partials/Create.vue`
- `frontend/src/view/pages/product/adjustment/Create-Adjustment.vue`
- `frontend/src/view/pages/product/adjustment/Detail-Adjustment.vue`
- `frontend/src/view/pages/product/Create-Product copy.vue`
- `frontend/src/view/pages/product/Create-Product.vue`
- `frontend/src/view/pages/product/detail/adjustmentOverview.vue`
- `frontend/src/view/pages/product/detail/Overview.vue`
- `frontend/src/view/pages/product/Detail-Product.vue`
- `frontend/src/view/pages/product/partials/Create copy.vue`
- `frontend/src/view/pages/product/partials/Create.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/ProductController.php`
- `uuid()` — line 60
- `import()` — line 64
- `importService()` — line 244
- `importProduct()` — line 381
- `updateOrCreate()` — line 593
- `createBatch()` — line 1340
- `getProducts()` — line 1411
- `getServices()` — line 1717
- `getAllSerialNumbersProduct()` — line 1938
- `getAllSNById()` — line 2038
- `getAllnumberById()` — line 2116
- `getServicesByCategory()` — line 2174
- `getEquipments()` — line 2331
- `getProduct()` — line 2459
- `getProductBatches()` — line 2557
- `getProductBatch()` — line 2620
- `updateStatusProducts()` — line 2644
- `updateStatusProductBatches()` — line 2707
- `createAdjustment()` — line 2756
- `createAdjustmentLineItems()` — line 2854
- `getAdjustments()` — line 2984
- `getAdjustment()` — line 3133
- `updateStatusAdjustments()` — line 3157
- `deleteAdjustments()` — line 3192
- `updateOrCreateEntity()` — line 3232
- `deleteEntity()` — line 3316
- `getOptions()` — line 3346
- `getSupplierContactAddress()` — line 3415
- `getadjustmentOptions()` — line 3436
- `searchLineItem()` — line 3490
- `getAllLineItem()` — line 3536
- `getProductLineItem()` — line 3726
- `getProductServiceLineItem()` — line 3761
- `getServiceLineItem()` — line 3796
- `getEquipmentLineItem()` — line 3819
- `getProductSummary()` — line 3838
- `getProductWarranty()` — line 3915
- `getProductWithWarranty()` — line 4064
- `deleteProductWarranty()` — line 4092
- `getWarrantyAttributes()` — line 4126
- `getTransactionProducts()` — line 4202
- `getTransactionEquipments()` — line 4364
- `getTransactionServices()` — line 4524
- `markImageAsPrimary()` — line 4633
- `markImageAsPrimaryService()` — line 4683
- `getLineItems()` — line 4734
- `getMobileLineItems()` — line 5176
- `getDBEquipments()` — line 5352
- `getProductSuppliers()` — line 5534
- `updateCreatePriceLogs()` — line 5591
- `getAllProducts()` — line 5808
- `deleteInventorySuppliers()` — line 5893
- `markImageAsPrimaryaddjustment()` — line 5964
- `getReportAdjustment()` — line 6019
- `importSerialNumber()` — line 6326

### `app/Http/Controllers/Parts/PartController.php`
- `uuid()` — line 56
- `updateOrCreate()` — line 61
- `getParts()` — line 686
- `getPart()` — line 950
- `getPartSuppliers()` — line 1025
- `updateStatusParts()` — line 1079
- `importParts()` — line 1125

### `app/Http/Controllers/CategoryController.php`
- `updateOrCreate()` — line 21
- `getCategories()` — line 77
- `deleteCategories()` — line 101
- `updateStatusCategories()` — line 138

### `app/Http/Controllers/BrandController.php`
- `updateOrCreate()` — line 20
- `getBrands()` — line 76
- `deleteBrands()` — line 100
- `updateStatusBrands()` — line 137

### `app/Http/Controllers/ManufacturerController.php`
- `updateOrCreate()` — line 20
- `getManufacturers()` — line 76
- `deleteManufacturers()` — line 100
- `updateStatusManufacturers()` — line 137

### `app/Http/Controllers/UnitController.php`
- `updateOrCreate()` — line 20
- `getUnits()` — line 76
- `deleteUnits()` — line 100
- `updateStatusUnits()` — line 137

### `app/Http/Controllers/WarehouseController.php`
- `updateOrCreate()` — line 20
- `getWarehouses()` — line 106
- `deleteWarehouses()` — line 130
- `updateStatusWarehouses()` — line 167

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

