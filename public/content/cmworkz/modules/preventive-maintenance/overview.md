# Preventive Maintenance Module

PreventiveMaintananceController, PreventiveTrait, PreventMaintanance, PreventiveSchedule, recurrence models, equipment, and visits implement maintenance planning.

Workflow: select equipment -> define plan/frequency -> create schedule -> identify due work -> create/assign visit -> perform service -> record parts/forms/notes -> close -> schedule next occurrence.

Invalid recurrence dates, duplicate schedules, missing equipment, unavailable engineer, and incomplete visit are key failure points.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/preventive-maintanance/ManagePMSchedule.vue`
- `frontend/src/view/pages/preventive-maintanance/PMScheduleView.vue`
- `frontend/src/view/pages/preventive-maintanance/Preventive.vue`
- `frontend/src/view/pages/preventive-maintanance/PreventiveOld22-03-24.vue`
- `frontend/src/view/pages/preventive-maintanance/Terminat-Warranty.vue`
- `frontend/src/view/pages/preventive-maintanance/WarrantyOld.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/preventive-maintanance/Create-Preventive-Maintenace.vue`
- `frontend/src/view/pages/preventive-maintanance/Extended-Warranty.vue`
- `frontend/src/view/pages/preventive-maintanance/Preventive-Detail.vue`
- `frontend/src/view/pages/preventive-maintanance/Warranty-DetailOld.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/PreventiveMaintananceController.php`
- `uuid()` — line 45
- `destroy()` — line 50
- `index()` — line 126
- `creatWarranty()` — line 193
- `extendWarranty()` — line 327
- `terminatePm()` — line 488
- `getAllStatus()` — line 575
- `getWarrantyOptions()` — line 597
- `getWarranty()` — line 630
- `updateOrCreateP1Old()` — line 675
- `updateOrCreateP1()` — line 899
- `getPreventiveV1()` — line 1123
- `getPreventiveScheduleV1()` — line 1199
- `getPreventiveVisitScheduleV1()` — line 1317

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

