# Job Calendar

Job Calendar schedules and visualizes visit/job work. It is reached through `admin.calendar` and is implemented by `frontend/src/view/pages/calendar/Calendar.vue`, with visit details shown through calendar components such as `DetailDrawer.vue`.

## What belongs here

- Scheduled ad-hoc and recurring visit occurrences.
- Their start/end windows, assignees, customer/site context, and status.
- Calendar-side conflict signals and navigation to the owning visit record.

Keep the visit as the source of truth. A calendar action must use the same validation as editing the visit directly; otherwise calendar edits can bypass recurrence, staffing, or status constraints.
