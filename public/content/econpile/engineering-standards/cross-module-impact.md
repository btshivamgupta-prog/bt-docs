# Cross-Module Impact

Econpile modules are connected operational aggregates. Changes need an impact review before implementation.

| Change to | Review these consumers |
| --- | --- |
| Customer or Site | Visits, enquiries, assets, rentals, delivery, documents, reports |
| Technician or Leave | Job/resource calendars, visit teams, attendance, visit timesheets |
| Visit | Calendar, team availability, tools, service forms, time tracking, reports, notifications, finance/document flows |
| Product or Part | Line-item pickers, inventory/movements, rental availability, delivery, asset conversion, pricing documents |
| Rental | Inventory reservation, returns, rental-to-visit, rental-to-delivery, movement history |
| Own/Sub Asset | Parent hierarchy, visit/service context, warranty, maintenance cost, QR portal, daily reports |
| Delivery | Stock/movements, source transaction, rental eligibility, documents, reporting |

## Release discipline

For each cross-module change, document the source of truth, status transition, permission boundary, event/observer/job side effects, historical-data treatment, and rollback/retry behaviour. Test the user interface and direct API paths. Where an operation changes stock, reservations, or status, make it idempotent and transactionally safe.
