# Supplier Module

SupplierController manages supplier list/detail/options, supplier contacts/details, import, status, and selection in products and purchase orders.

Frontend pages are under frontend/src/view/pages/supplier. Models are under app/Models/Supplier. The workflow is supplier -> contacts/details -> products or purchase order -> receiving -> supplier history/documents.

Routes and validation are in routes/api.php and SupplierController. Supplier status meanings are Not verified as one central enum.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/supplier/create-or-update/Billing-Address.vue`
- `frontend/src/view/pages/supplier/create-or-update/Billing-Address-New.vue`
- `frontend/src/view/pages/supplier/create-or-update/Contact-Persons.vue`
- `frontend/src/view/pages/supplier/create-or-update/Notification.vue`
- `frontend/src/view/pages/supplier/create-or-update/Property-Address.vue`
- `frontend/src/view/pages/supplier/detail/overview/Billing-Address.vue`
- `frontend/src/view/pages/supplier/detail/overview/Contact-Person.vue`
- `frontend/src/view/pages/supplier/detail/overview/Notification.vue`
- `frontend/src/view/pages/supplier/detail/overview/Property-Address.vue`
- `frontend/src/view/pages/supplier/Supplier.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/supplier/create-or-update/Contact-Details.vue`
- `frontend/src/view/pages/supplier/create-or-update/Create-Contact-Persons.vue`
- `frontend/src/view/pages/supplier/Create-Supplier.vue`
- `frontend/src/view/pages/supplier/detail/overview/Contact-Detail.vue`
- `frontend/src/view/pages/supplier/Detail-Supplier.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/SupplierController.php`
- `importSupplier()` — line 44
- `updateOrCreate()` — line 339
- `updateOrCreatePerson()` — line 692
- `updateOrCreateDetails()` — line 802
- `updateSupplier()` — line 902
- `deleteSuppliers()` — line 1148
- `deletePersons()` — line 1210
- `deleteDetails()` — line 1249
- `getSuppliers()` — line 1287
- `getSupplierList()` — line 1357
- `getSupplierProjectContract()` — line 1418
- `getSupplierPersonList()` — line 1534
- `getSupplier()` — line 1563
- `getPersons()` — line 1613
- `getPerson()` — line 1680
- `getDetails()` — line 1708
- `getDetail()` — line 1775
- `updateStatusSuppliers()` — line 1802
- `updateStatusPersons()` — line 1872
- `updateStatusDetails()` — line 1927
- `bulkPersonDeleteAction()` — line 1981
- `bulkPersonUpdateAction()` — line 2018
- `createSupplierOnly()` — line 2056
- `patchContactPerson()` — line 2189
- `patchPropertyAddress()` — line 2278
- `patchBillingAddress()` — line 2335
- `getOptions()` — line 2388
- `getGroupList()` — line 2406
- `getSupplierDataByDays()` — line 2417
- `getServiceForms()` — line 2480
- `updateServiceForms()` — line 2500
- `updateSingleSupplierStatus()` — line 2546

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

