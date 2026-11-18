# Jobs, Visits & Line Items

Oil analysis sits alongside, rather than inside, the general field-service transaction model.

| Record | Table | Responsibility |
| --- | --- | --- |
| Job | `tickets` | Commercial and operational header: customer, site, project/contract links, totals, state, and scheduling intent. |
| Visit | `ticket_visits` | A scheduled execution unit with dates, teams, time sheets, service forms, and close-out data. |
| Line item | `line_items` | Chargeable/deliverable data; job lines use `type = 3` and `parent = ticket id`. |

## Relationship to the oil workflow

A job can have many visits. Oil batches and samples may store `visit_id` to make a field collection traceable to a particular visit. The direct link is the visit ID; a line item is **not** an oil batch.

When implementing job-to-oil automation, make it idempotent: a retry or repeated browser action must not silently create duplicate batches, samples, reports, or service artifacts.
