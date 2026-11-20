# Reports, Dashboard, Import, Export, and PDF Module

ReportController, DashboardController, NewDashboardController, ImportController, ExportController, ExportCurrentViewController, GeneratePdfController, and SampleDownloadController implement report and file output.

Templates are under resources/views/pdf, exports, excel, and mails. Flow: choose module/filter -> upload or request -> validate/map -> query/write/render -> return Excel/CSV/PDF/result -> retain history where implemented. Exact payloads are module-specific.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/report/Report.vue`
- `frontend/src/view/pages/report/ReportListing.vue`
- `frontend/src/view/pages/report/Report-services.vue`
- `frontend/src/view/pages/report/Show-Voice-Notes.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/report/Report-Detail.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/ReportController.php`
- `getFavorites()` — line 35
- `getReports()` — line 50
- `exportExcel()` — line 119
- `patchFavorites()` — line 146
- `getReportService()` — line 182
- `generate_service_excel()` — line 392

### `app/Http/Controllers/ExportController.php`
- `index()` — line 47
- `create()` — line 54
- `exportCustomer()` — line 57
- `exportSupplier()` — line 215
- `exportProperty()` — line 246
- `exportQuotations()` — line 461
- `exportEngineer()` — line 877
- `exportServices()` — line 1141
- `exportProducts()` — line 1366
- `exportParts()` — line 1677
- `exportInvoice()` — line 1934
- `exportJob()` — line 1998
- `exportPayment()` — line 2072
- `exportLeave()` — line 2129
- `exportContract()` — line 2159
- `getContractRemainingTime()` — line 2536
- `exportUser()` — line 2589
- `exportVisit()` — line 2752
- `exportIncident()` — line 2882
- `exportTimesheet()` — line 3063
- `exportVisitTimesheet()` — line 3319
- `exportPreventiveVisit()` — line 3606
- `store()` — line 3779
- `dateFormate()` — line 3781
- `show()` — line 3789
- `edit()` — line 3800
- `update()` — line 3812
- `destroy()` — line 3823

### `app/Http/Controllers/ExportCurrentViewController.php`
- `index()` — line 14
- `testExport()` — line 87

### `app/Http/Controllers/ImportController.php`
- `index()` — line 47
- `create()` — line 57
- `import_equipment()` — line 64
- `importCustomer1()` — line 373
- `store()` — line 440
- `dateFormate()` — line 444
- `show()` — line 455
- `edit()` — line 466
- `update()` — line 478
- `destroy()` — line 489
- `importCustomer()` — line 495
- `optimizeImportArrsamll()` — line 692
- `optimizeImportArrsamllNew()` — line 710
- `importProduct()` — line 732
- `importServices()` — line 871
- `importLeads()` — line 954
- `toString()` — line 1055
- `getAllCategoriesByField()` — line 1073

### `app/Http/Controllers/FilterController.php`
- `__construct()` — line 15
- `getFilter()` — line 20
- `getVisitStatus()` — line 46
- `getCustomer()` — line 61
- `getContactPerson()` — line 90
- `getProperty()` — line 121
- `getEngineer()` — line 152

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

