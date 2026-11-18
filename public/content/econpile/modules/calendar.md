# Calendar

Calendar is the planning surface for scheduled work. It is not an independent job store: it visualizes visit and resource scheduling data owned by the underlying modules.

## Routes and implementation

- Job calendar: `admin.calendar` → `frontend/src/view/pages/calendar/Calendar.vue`
- Resource calendar: `admin.calendar-resource` → `frontend/src/view/pages/calendar/ResourceCalendar.vue`
- Supporting API/controller: `app/Http/Controllers/CalendarController.php`

Use the calendar to inspect schedule conflicts and dispatch capacity. Any drag, resize, create, or delete operation must update the source visit/resource and must retain the normal permission, timezone, audit, and notification rules.

## Design rules

Render dates in the company/user timezone consistently; clearly distinguish all-day work from timed work; and expose conflict handling rather than silently overwriting a schedule. See the child pages for the two views.
