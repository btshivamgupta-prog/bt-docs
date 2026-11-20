# Calendar and Engineer Tracking Module

CalendarController, GoogleCalendarController, Calendar/GoogleController, Calendar/OutlookController, TrackingController, calendar models, GoogleCalendarTrait, and frontend calendar/live-tracking pages implement scheduling and tracking.

Workflow: authorize provider -> callback/token -> fetch/create/update event -> link event to visit/quotation/contract -> show resource calendar; engineer location/status updates feed maps, routes, and visit state.

Jobs include CreateCalendarEvent, DeleteCalendarEvent, CreateVisitICS, GoogleCalendarNotification, UpdateEngineerLocationJob, UpdateEngineerStatusJob, CheckEngineerStatusJob, OfflineEngineerJob, and OfflineVisitJob.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/AllCalendar.vue`
- `frontend/src/view/pages/calendar/Calendar.vue`
- `frontend/src/view/pages/calendar/ResourceCalendar.vue`
- `frontend/src/view/pages/calendar/ResourceCalendarMap.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/calendar/CreateEvent.vue`
- `frontend/src/view/pages/calendar/DetailDrawer.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/CalendarController.php`
- `index()` — line 31
- `getResourceEvents()` — line 38
- `getWorkingEngineers()` — line 192
- `getAllVisits()` — line 211
- `getNotAssignedVisits()` — line 329
- `getOpenVisits()` — line 377
- `getCustomerFilter()` — line 440
- `getTicketFilter()` — line 463
- `getTicketVisitFilter()` — line 497
- `reAssignVisit()` — line 535
- `fullCalendarResources()` — line 610
- `getCalendarResources()` — line 661
- `getVisitsOrDeliveryCalendar()` — line 748
- `fullCalendarEvents()` — line 807
- `fullCalendarEventResized()` — line 993
- `fullCalendarDropped()` — line 1031
- `fullCalendarClicked()` — line 1142
- `fullCalendarFilters()` — line 1163
- `fullCalendarUnAssignedVisits()` — line 1205
- `getPopupVisit()` — line 1292

### `app/Http/Controllers/TrackingController.php`
- `getEngineers()` — line 18
- `getMapEngineers()` — line 128
- `transformEngineers()` — line 211
- `getMapRoutes()` — line 270
- `getMapVisits()` — line 304
- `transformVisitRoutes()` — line 385
- `transformVisits()` — line 435
- `getVisitStatus()` — line 483
- `getEngineerStatus()` — line 583
- `updateEngineerLocation()` — line 621
- `updateEngineerLastOnline()` — line 650

### `app/Http/Controllers/GoogleCalendarController.php`
- No public method declaration was parsed.

### `app/Http/Controllers/GoogleAPIController.php`
- `__construct()` — line 14
- `autocomplete()` — line 20
- `googleAutocompleteApi()` — line 53
- `place_id()` — line 85
- `googlePlaceApi()` — line 106
- `lat_long()` — line 139
- `googleLatLongApi()` — line 166

### `app/Http/Controllers/Calendar/GoogleController.php`
- `getAuthLogin()` — line 24
- `testEvent()` — line 33
- `getGoogleStatus()` — line 99
- `disconnectGoogle()` — line 114
- `callback()` — line 129

### `app/Http/Controllers/Calendar/OutlookController.php`
- `__construct()` — line 23
- `getAuthLogin()` — line 31
- `callback()` — line 47
- `sync_events()` — line 95
- `get_token()` — line 145
- `refresh_token()` — line 172
- `create_events()` — line 197

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

