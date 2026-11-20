# Equipment and Assets Module

EquipmentController manages equipment creation, update, options, customer association, locations, serials, transformer sample data, status, allocation, returns, movement, linked visits, warranty, and preventive maintenance.

Frontend pages are under frontend/src/view/pages/equipment, equipment-client, new-equipment, and assetAssign. Models are under app/Models/Equipment.

Workflow: create equipment -> associate customer/property/product/location -> add serial/warranty/sample data -> allocate or return -> record movement -> link visits, spares, warranty, and preventive maintenance.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/equipment/detail/Warranty.vue`
- `frontend/src/view/pages/equipment/Equipment.vue`
- `frontend/src/view/pages/equipment/Equipment-Company.vue`
- `frontend/src/view/pages/equipment-client/detail/Warranty.vue`
- `frontend/src/view/pages/equipment-client/Equipment.vue`
- `frontend/src/view/pages/new-equipment/Asset.vue`
- `frontend/src/view/pages/new-equipment/reminder.vue`
- `frontend/src/view/pages/new-equipment-client/Asset.vue`
- `frontend/src/view/pages/new-equipment-client/reminder.vue`
- `frontend/src/view/pages/rental/detail/Warranty.vue`
- `frontend/src/view/pages/rental/Rental.vue`
- `frontend/src/view/pages/warranty/Extension-Log.vue`
- `frontend/src/view/pages/warranty/Terminat-Warranty.vue`
- `frontend/src/view/pages/warranty/Warranty.vue`
- `frontend/src/view/pages/warranty/WarrantyOld.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/equipment/Create-Equipment.vue`
- `frontend/src/view/pages/equipment/detail/BasicOverview.vue`
- `frontend/src/view/pages/equipment/detail/BasicOverviewCompany.vue`
- `frontend/src/view/pages/equipment/detail/Overview.vue`
- `frontend/src/view/pages/equipment/detail/Overview-Company-Eqp.vue`
- `frontend/src/view/pages/equipment/Detail-Company-Equipment.vue`
- `frontend/src/view/pages/equipment/Detail-Equipment.vue`
- `frontend/src/view/pages/equipment/Update-Equipment.vue`
- `frontend/src/view/pages/equipment-client/Create-Equipment.vue`
- `frontend/src/view/pages/equipment-client/detail/BasicOverview.vue`
- `frontend/src/view/pages/equipment-client/detail/Overview.vue`
- `frontend/src/view/pages/equipment-client/Detail-Equipment.vue`
- `frontend/src/view/pages/equipment-client/Update-Equipment.vue`
- `frontend/src/view/pages/new-equipment/Create-Company-Equipment.vue`
- `frontend/src/view/pages/new-equipment/Create-New-Equipment copy.vue`
- `frontend/src/view/pages/new-equipment/Create-New-Equipment.vue`
- `frontend/src/view/pages/new-equipment/Detail-Asset.vue`
- `frontend/src/view/pages/new-equipment/overview.vue`
- `frontend/src/view/pages/new-equipment-client/Create-Client-Equipment.vue`
- `frontend/src/view/pages/new-equipment-client/Create-Client-Equipment_06_04_2026.vue`
- `frontend/src/view/pages/new-equipment-client/Detail-Asset.vue`
- `frontend/src/view/pages/new-equipment-client/overview.vue`
- `frontend/src/view/pages/rental/Create-New-Rental.vue`
- `frontend/src/view/pages/rental/detail/ExtendedInformation.vue`
- `frontend/src/view/pages/rental/detail/Overview.vue`
- `frontend/src/view/pages/rental/Detail-Rental.vue`
- `frontend/src/view/pages/rental/partials/Create.vue`
- `frontend/src/view/pages/warranty/Extended-Warranty.vue`
- `frontend/src/view/pages/warranty/Renew-Warranty.vue`
- `frontend/src/view/pages/warranty/Warranty-Detail.vue`
- `frontend/src/view/pages/warranty/Warranty-DetailOld.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/EquipmentController.php`
- `updateOrCreate()` — line 44
- `getEquipments()` — line 134
- `deleteEquipments()` — line 272
- `getEquipment()` — line 294
- `getTransformerSampleData()` — line 363
- `saveTransformerSampleData()` — line 382
- `deleteTransformerSampleData()` — line 569
- `getEquipmentList()` — line 630
- `getEquipmentListWithCustomer()` — line 668
- `getOptions()` — line 719
- `updateParticularField()` — line 798
- `updateOrCreateNew()` — line 801
- `updateSerialNo()` — line 1283
- `addSubLocation()` — line 1297
- `getLatestSerialNo()` — line 1317
- `uuid()` — line 1329
- `updateStatusEquipment()` — line 1334
- `getAllPmsOfEquip()` — line 1430
- `getAllWarrantyOfEquip()` — line 1506
- `getAllVisitsOfEquip()` — line 1580
- `getAllVisitsOfEquipSpares()` — line 1690
- `import_customer_sample()` — line 1787
- `getAllocationOptions()` — line 1792
- `allocateEquipment()` — line 1810
- `returnEquipment()` — line 1922
- `allocatedEquipments()` — line 2012
- `equipmentMovementReport()` — line 2149

### `app/Http/Controllers/WarrantyController.php`
- `uuid()` — line 41
- `destroy()` — line 46
- `index()` — line 121
- `creatWarranty()` — line 189
- `extendWarrantyOld()` — line 356
- `extendWarranty()` — line 548
- `renewWarranty()` — line 638
- `terminateWarranty()` — line 815
- `getAllStatus()` — line 936
- `getWarrantyOptions()` — line 953
- `getWarranty()` — line 995
- `getExtensionLog()` — line 1060

### `app/Http/Controllers/RentalController.php`
- `updateOrCreate()` — line 31
- `getRentals()` — line 329
- `getOptions()` — line 384
- `rentalDetail()` — line 479
- `updateRentalStatus()` — line 520
- `cancelRental()` — line 700
- `getRentalItems()` — line 712
- `getAllRentalsOfEquipment()` — line 793
- `getSubRentalsOfEquipment()` — line 950
- `getRentalItemDetail()` — line 1169
- `statusSubRent()` — line 1267
- `getSubRentOption()` — line 1333
- `rentalLineItem()` — line 1368

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

