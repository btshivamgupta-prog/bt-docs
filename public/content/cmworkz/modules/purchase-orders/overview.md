# Purchase Order Module

PurchaseOrderController, PurchaseOrderService, PurchaseOrderTrait, purchase-order request classes, models, observers, and frontend purchase-order pages implement procurement.

Workflow: select supplier -> add line items -> validate CreateUpdatePurchaseRequest -> save PO -> change status -> receive partial/complete quantities -> update GRN/required/received histories and stock -> generate/send PDF.

Purchase-order status meanings are Not verified as one universal enum.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/purchase-order/Detail/Pending-Line-Item.vue`
- `frontend/src/view/pages/purchase-order/Detail/Received-Line-Item.vue`
- `frontend/src/view/pages/purchase-order/Purchase-Order.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/purchase-order/Create-Or-Update/Create-Purchase-Order.vue`
- `frontend/src/view/pages/purchase-order/Create-Or-Update/Update-Purchase-Order.vue`
- `frontend/src/view/pages/purchase-order/Detail/Detail-Purchase-Order.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/PurchaseOrderController.php`
- `getPurchaseOrders()` — line 35
- `createOrUpdatePurchaseOrder()` — line 97
- `getPurchaseOrder()` — line 167
- `updateParticularField()` — line 222
- `getOptions()` — line 272
- `getAllStatus()` — line 343
- `receiveItem()` — line 365
- `getPendingItem()` — line 528
- `getReceivedItem()` — line 603
- `updateBulkStatus()` — line 657
- `downloadPdf()` — line 704
- `streamPdf()` — line 742
- `changeStatus()` — line 780

### `app/Http/Controllers/LineItemReceivedHistoryController.php`
- `__construct()` — line 23
- `createLineItemHistory()` — line 28
- `createUpdateGRN()` — line 43
- `lineItemOptionsPO()` — line 107
- `getGRNDetailByUuid()` — line 163

### `app/Http/Controllers/WarehouseController.php`
- `updateOrCreate()` — line 20
- `getWarehouses()` — line 106
- `deleteWarehouses()` — line 130
- `updateStatusWarehouses()` — line 167

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

