# Engineer Module

EngineerController manages field engineers and their profile, address, emergency contact, skills, certificates, leave, driver flag, online state, and tracking data.

Frontend pages are under frontend/src/view/pages/engineer. Models are under app/Models/Engineer. The engineer is used by teams, tickets, visits, preventive maintenance, tasks, leave, timesheets, and mobile APIs.

Workflow: create profile -> assign designation/skills/certificates -> configure leave/driver flags -> assign team/role -> use in visits/tasks/maintenance -> update location/online status -> retain history.

Related jobs include UpdateEngineerLocationJob, UpdateEngineerStatusJob, CheckEngineerStatusJob, OfflineEngineerJob, and OfflineVisitJob.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/engineer/Additional-Documents.vue`
- `frontend/src/view/pages/engineer/create-or-update/Color.vue`
- `frontend/src/view/pages/engineer/create-or-update/Emergency-Contact.vue`
- `frontend/src/view/pages/engineer/create-or-update/Engineer-Address.vue`
- `frontend/src/view/pages/engineer/create-or-update/Personal-Info.vue`
- `frontend/src/view/pages/engineer/create-or-update/Skilles-Certificate.vue`
- `frontend/src/view/pages/engineer/create-or-update/Skills-Certificate.vue`
- `frontend/src/view/pages/engineer/detail/Color.vue`
- `frontend/src/view/pages/engineer/detail/Emergency-Contact.vue`
- `frontend/src/view/pages/engineer/detail/Emergency-Contact-old.vue`
- `frontend/src/view/pages/engineer/detail/Engineer-Address.vue`
- `frontend/src/view/pages/engineer/detail/Engineer-Address-oldd.vue`
- `frontend/src/view/pages/engineer/detail/Personal-Info.vue`
- `frontend/src/view/pages/engineer/detail/Personal-Info-old.vue`
- `frontend/src/view/pages/engineer/Engineer.vue`
- `frontend/src/view/pages/leave/Leave.vue`
- `frontend/src/view/pages/leave/Leave2.vue`
- `frontend/src/view/pages/leave/LeaveKanban.vue`
- `frontend/src/view/pages/leave/LeaveKanbanOld.vue`
- `frontend/src/view/pages/leave/LeaveListing.vue`
- `frontend/src/view/pages/team/detail/Staff-Personal-Info.vue`
- `frontend/src/view/pages/team/Teams.vue`
- `frontend/src/view/pages/user/detail/LoginLog.vue`
- `frontend/src/view/pages/user/detail/LogsLoginActivity.vue`
- `frontend/src/view/pages/user/detail/RecentActivity.vue`
- `frontend/src/view/pages/user/User.vue`
- `frontend/src/view/pages/user/UserNew.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/engineer/Create-Engineer.vue`
- `frontend/src/view/pages/engineer/Detail-Engineer.vue`
- `frontend/src/view/pages/engineer/Internal-Engineer.vue`
- `frontend/src/view/pages/engineer/Leave-Update-Engineer.vue`
- `frontend/src/view/pages/engineer/PasswordUpdate.vue`
- `frontend/src/view/pages/leave/Create-Or-Update/CreateLeave.vue`
- `frontend/src/view/pages/leave/Create-Or-Update/Create-Leave.vue`
- `frontend/src/view/pages/leave/Create-Or-Update/Update-Leave.vue`
- `frontend/src/view/pages/leave/Detail/Detail-Leave.vue`
- `frontend/src/view/pages/team/Detail-Member.vue`
- `frontend/src/view/pages/user/Create-User.vue`
- `frontend/src/view/pages/user/detail/Leave-Update.vue`
- `frontend/src/view/pages/user/detail/PasswordUpdate.vue`
- `frontend/src/view/pages/user/Detail-User.vue`
- `frontend/src/view/pages/user/Detail-UserOld.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/EngineerController.php`
- `createEngineer()` — line 48
- `updateEngineer()` — line 392
- `getEngineer()` — line 527
- `getEngineers()` — line 590
- `resetPassword()` — line 823
- `updateStatusEngineers()` — line 859
- `updateParticularField()` — line 901
- `getEngineerProfile()` — line 1221
- `updateEngineerProfile()` — line 1277
- `updateEngineerPassword()` — line 1291
- `getEngineerList()` — line 1320
- `getStatus()` — line 1373
- `getDriverList()` — line 1409
- `getOptions()` — line 1428
- `getSettings()` — line 1547
- `getOptions()` — line 1562
- `getEngineerListFilter()` — line 1574
- `updateLeave()` — line 1596
- `getEngineerLeave()` — line 1631
- `getSettingLeaveCategory()` — line 1733
- `getEngineerLeaveCategory()` — line 1761
- `import()` — line 1824
- `getLoginActivity()` — line 2051

### `app/Http/Controllers/TeamController.php`
- `updateOrcreate()` — line 20
- `getTeams()` — line 97
- `getTeam()` — line 221

### `app/Http/Controllers/UserController.php`
- `getCompanyProfile()` — line 42
- `uploadImage()` — line 47
- `deleteRole()` — line 74
- `getRoles()` — line 107
- `getRole()` — line 129
- `getUser()` — line 161
- `getLoginActivity()` — line 195
- `getUsers()` — line 215
- `updateOrCreateRole()` — line 317
- `updatePassword()` — line 359
- `updateUserProfile()` — line 388
- `updateSignature()` — line 424
- `updateSignaturePad()` — line 455
- `updateEmailSignaturePad()` — line 504
- `resetOwnPassword()` — line 551
- `updateUser()` — line 597
- `createUser()` — line 689
- `singleUserInfo()` — line 775
- `recentActivity()` — line 816
- `assignPermissionToRole()` — line 837
- `getPermissions()` — line 911
- `postChangePassword()` — line 931
- `postforgotPassword()` — line 955
- `sendResetEmail()` — line 982
- `getPassworReset()` — line 1000
- `postPassworReset()` — line 1006
- `updateUserStatus()` — line 1038
- `updateSingleUserStatus()` — line 1061
- `get_user_designation()` — line 1093
- `getUserRoles()` — line 1108
- `getRolesNew()` — line 1129
- `postNewforgotPassword()` — line 1152
- `updateConformPassword()` — line 1205
- `getUserLeave()` — line 1251
- `updateLeaveUser()` — line 1317
- `getUserLeaveCategory()` — line 1358
- `getUsersCompany()` — line 1402

### `app/Http/Controllers/LeaveController.php`
- `index()` — line 37
- `leavekanban()` — line 99
- `updateOrCreateOLd()` — line 163
- `updateOrCreate()` — line 347
- `delete()` — line 767
- `updateParticularField()` — line 814
- `updateBulkStatus()` — line 876
- `getAllStatus()` — line 971
- `show()` — line 997
- `getOptions()` — line 1039
- `getLeaveCount()` — line 1073
- `getEngineerLeaves()` — line 1095
- `updateDragStatus()` — line 1128

### `app/Http/Controllers/LeaveManagementController.php`
- `createLeave()` — line 25
- `updateLeave()` — line 110
- `deleteCustomers()` — line 176
- `getLeaves()` — line 212
- `getLeaveDetailsById()` — line 334
- `getOptions()` — line 356
- `updateStatusEngineersLeaves()` — line 372
- `engineerLeaveCount()` — line 425
- `engineerLeaveListing()` — line 441

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

