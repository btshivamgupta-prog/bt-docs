# Oil Report Module

OilReportController manages report listing/options/detail/create-update, report result rows, Excel handling, sample deletion, visit lookup, PDF generation, and retry. Models include OilReport, OilSampleResult, ReportSummary, and OilReportHistory.

Workflow: select batch/samples -> create report/result data -> save report -> prepare PDF -> save report images -> generate PDF -> store URL/history -> download or retry. Jobs are PrepareOilReportPDF, SaveReportImage, and GenerateOilReportPDF.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/oil-report-generator/detail/GasCharts.vue`
- `frontend/src/view/pages/oil-report-generator/detail/OilAnalysisReport.vue`
- `frontend/src/view/pages/oil-report-generator/Oil-Report.vue`
- `frontend/src/view/pages/oil-report-generator/Summary.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/oil-report-generator/Create-Oil-Report.vue`
- `frontend/src/view/pages/oil-report-generator/detail/OilAnalysisReportDetail.vue`
- `frontend/src/view/pages/oil-report-generator/detail/TransformerSampleData.vue`
- `frontend/src/view/pages/oil-report-generator/Detail-Oil-Report.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/OilReportController.php`
- `hasProvidedValue()` — line 48
- `getOptions()` — line 55
- `getOilReports()` — line 86
- `getOilReport()` — line 275
- `getOilReportVisit()` — line 390
- `createOrUpdate()` — line 432
- `logOilReportHistory()` — line 552
- `createOilSample()` — line 584
- `manageReportExcel()` — line 1030
- `deleteReportSampleData()` — line 1081
- `generateOilReportPDF()` — line 1140
- `retryOilReportPDF()` — line 1151
- `prepareOilReportPDF()` — line 1164
- `debug()` — line 1533

### `app/Http/Controllers/CalculationController.php`
- `calculateTotalAmount()` — line 14

### `app/Http/Controllers/GeneratePdfController.php`
- `service_form()` — line 9

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.
## Graph and table print conditions

The exact frontend/PDF visibility rules are documented in [`PDF & Results`](./pdf-and-results.md). Important rules include: DGA, acid, and furan PDF graphs require qualifying data plus source document conditions; water and dielectric graphs require at least three qualifying rows; and every expected PNG must exist in `storage/app/charts/{report}/{sample}`. Water, acidity, and dielectric PDF tables can print placeholder rows even when no data is available. The backend chart job can generate a PNG with two numeric dated values, but the PDF may still omit that graph because its PDF threshold is stricter.
