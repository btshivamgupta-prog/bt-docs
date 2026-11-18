# Visit

Visit is the work-execution aggregate. It joins a customer/site request with scheduling, team allocation, service forms, tools, notes, attachments, time tracking, reminders, closure, and downstream documents.

## Implementation landmarks

- UI: `frontend/src/view/pages/visit/` and reusable `frontend/src/view/pages/job/partials/`
- Server: `TicketController.php`, `Ticket/VisitController.php`, `TicketVisitTrait.php`
- Related models/observers/providers: `TicketVisit*`

## Change impact

A visit transition can affect calendar entries, assigned technicians, equipment/tool movements, service-form reporting, timesheets, notifications, and invoicing/quotation flows. Define the allowed source and target statuses first, then test every side effect and idempotent retry. Never update a visit status directly in a component just to make the UI look complete.
