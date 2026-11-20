# Projects, Tasks, Costing, and Expenses

ProjectController, ProjectMilestoneController, TaskController, ExpenseController, and their models/frontend pages implement project planning and operational cost tracking.

Workflow: create project -> add members/milestones/costing -> create and assign tasks -> record timesheets -> submit expenses/documents -> validate amount/entitlement -> report cost/progress -> link transactions or invoice where supported.

Rules include ExpenseAmount and EntitledLessThanMaxAmount. Exact approval sequence is Not verified.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/expense/Expense.vue`
- `frontend/src/view/pages/project/partials/Project-Oil-Reports.vue`
- `frontend/src/view/pages/project/Project.vue`
- `frontend/src/view/pages/task/Canban-Task.vue`
- `frontend/src/view/pages/task/Task.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/expense/Create-Or-Update/Create-Expense.vue`
- `frontend/src/view/pages/expense/Create-Or-Update/Update-Expense.vue`
- `frontend/src/view/pages/expense/Detail/Detail-Expense.vue`
- `frontend/src/view/pages/project/costing/CreateCosting.vue`
- `frontend/src/view/pages/project/costing/DetailCosting.vue`
- `frontend/src/view/pages/project/Create-Project.vue`
- `frontend/src/view/pages/project/Detail-Project.vue`
- `frontend/src/view/pages/project/partials/Overview-Create.vue`
- `frontend/src/view/pages/project/Update-Project.vue`
- `frontend/src/view/pages/task/Create-Or-Update/Create-Task.vue`
- `frontend/src/view/pages/task/Create-Or-Update/Update-Task.vue`
- `frontend/src/view/pages/task/Detail/Detail-Task.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/ProjectController.php`
- `index()` — line 45
- `store()` — line 113
- `show()` — line 258
- `getOilReports()` — line 345
- `update()` — line 400
- `updateManagers()` — line 544
- `getOptions()` — line 597
- `getAllStatus()` — line 712
- `getMembers()` — line 734
- `updateMembers()` — line 752
- `deleteManager()` — line 804
- `deleteMember()` — line 839
- `getLoggedHoursGraph()` — line 877
- `getTimesheets()` — line 961
- `updateProjectStatus()` — line 1007
- `updateBulkProjectStatus()` — line 1044
- `createOrUpdateCosting()` — line 1095
- `getCostings()` — line 1223
- `getCosting()` — line 1255
- `getCostingAttributes()` — line 1329
- `downloadCostingPdf()` — line 1369

### `app/Http/Controllers/ProjectMilestoneController.php`
- `uuid()` — line 20
- `updateCreate()` — line 24
- `getMilestones()` — line 159
- `getFiles()` — line 180
- `getMilestone()` — line 231
- `updateStatus()` — line 247
- `getMilestoneDelete()` — line 274
- `createOrUpdateInvoice()` — line 295
- `getInvoice()` — line 389
- `updateCreateQuoMilestone()` — line 407
- `getQuotationMilestones()` — line 550
- `getQuotationMilestone()` — line 573
- `updateQuotationStatus()` — line 589
- `getQuotationMilestoneDelete()` — line 616

### `app/Http/Controllers/TaskController.php`
- `index()` — line 38
- `store()` — line 112
- `show()` — line 460
- `update()` — line 608
- `deleteTask()` — line 753
- `updateStatus()` — line 790
- `updateBulkStatus()` — line 831
- `getAllStatus()` — line 881
- `getOptions()` — line 903
- `getMembers()` — line 928
- `getTaskMembers()` — line 946
- `updateMembers()` — line 981
- `deleteMember()` — line 1033
- `destroy()` — line 1077
- `assignEngineer()` — line 1087
- `exportTask()` — line 1104
- `downloadTask()` — line 1172
- `getTaskChecklistItem()` — line 1233
- `saveTaskChecklistItem()` — line 1258
- `updateTaskChecklistItem()` — line 1303
- `deleteTaskChecklistItem()` — line 1348
- `getTaskTimesheet()` — line 1387
- `saveTaskTimesheet()` — line 1434
- `deleteTaskTimesheet()` — line 1479
- `getTaskComment()` — line 1511
- `saveTaskComment()` — line 1569
- `deleteTaskComment()` — line 1616
- `getTaskAttachment()` — line 1649
- `saveTaskAttachment()` — line 1693
- `deleteTaskAttachment()` — line 1731

### `app/Http/Controllers/ExpenseController.php`
- `index()` — line 30
- `updateOrCreate()` — line 84
- `delete()` — line 146
- `updateParticularField()` — line 192
- `updateBulkStatus()` — line 253
- `getAllStatus()` — line 328
- `show()` — line 351
- `getExpenseType()` — line 383
- `updateExpenseType()` — line 404
- `getOptions()` — line 437

### `app/Http/Controllers/ExpenseCategoryController.php`
- `index()` — line 19
- `updateOrCreate()` — line 30
- `showBudget()` — line 58
- `deleteBudget()` — line 70
- `userExpenseAmount()` — line 91
- `ShowUserExpenseAmount()` — line 131

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

