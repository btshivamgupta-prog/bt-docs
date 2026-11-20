# Database Schema

The schema is migration-driven. This page focuses on tables central to business flows; it is not a replacement for reading all migrations.

## Core entities

| Table | Model(s) | Purpose / verified key fields |
|---|---|---|
| users | App\Models\User | Login identity, channel, activation/ban flags, role, linked customer/engineer/company, audit fields |
| customers | Customer\Customer | Customer/company master, barcode, group/entity, activation and reminder flags |
| engineers | Engineer\Engineer | Field staff, driver/online/tracking fields, leave and certificates |
| equipment | Equipment\Equipment | Assets associated with customers, products, locations, warranty, rental, and sample data |
| products, product_batches, movement/serial tables | Product\Product, ProductBatch | Goods/services/equipment catalogue and stock; accounting is fifo, fefo, or none; type is goods, service, or equipment |
| tickets, ticket_visits | Ticket models | Service/job records and scheduled visits; supporting team, engineer, address, reminder, form, time, trip, and closer tables |
| line_items and related tables | LineItem\LineItem | Transaction items shared by quotations, contracts, invoices, purchase orders, tickets, and projects |
| quotations, contracts | Quotation/Contract models | Commercial documents; status 1 Draft, 2 Accepted, 3 Rejected, 4 Pending, 5 Sent, 6 Cancelled, 7 Closed |
| purchase_orders | PurchaseOrder\PurchaseOrder | Supplier procurement and receiving; GRN/required/received-history tables also exist |
| invoices, payments, credit-note tables | Invoice/Payment/CreditNote models | Billing, receipts, credit notes, histories, recurrence, and locking |
| projects, project_members, project_costings | Project models | Projects, members, costing, tasks, and linked transactions |
| tasks, task_members, task_timesheets | Task models | Work planning, assigned members/managers, time, and history |
| expenses, expense_categories, user_expense_amounts | Expense models | Expense claims, amount rules, customer/project links, payment modes, documents |
| preventive_maintanance, preventive_schedules, recurrence tables | Preventive models | Preventive maintenance plans and recurrence |
| oil_samples, oil_batches, oil_reports, oil_sample_results, report_summaries | Oil models | Sample lifecycle, batching, analysis results, and reports |
| statuses, app_settings, module_settings, menus | Corresponding models | Configurable status/settings/menu data |
| jobs, failed_jobs, job_batches | Laravel queue tables | Queue payloads, failures, and batches |

## Verified relationships and cautions

- Task belongs to User via added_by/updated_by, Engineer via assign, Lead, Customer, and Project; it has members and transaction documents.
- Expense belongs to User, Customer, Project, and PaymentMode, and has transaction documents.
- OilReport has many OilSampleResult and OilReportHistory, belongs to OilBatch, and has typed transaction-document relations.
- Invoice and transaction models define relations to customer, contact persons, quotation/ticket/visit/project, line items, payments, histories, reminders, and recurrence as implemented in their files.
- Ticket and visit relationships are distributed between models and Ticket*Trait classes; inspect app/Models/Ticket and app/Traits/TicketTrait.php, TicketVisitTrait.php, and VisitTrait.php together.
- Legacy integer columns such as customer, engineer, project, visit, and parent are not consistently database foreign keys. Never infer a relationship from a column name alone.

## ER diagram

~~~mermaid
erDiagram
  USERS ||--o{ TICKETS : creates
  CUSTOMERS ||--o{ TICKETS : owns
  TICKETS ||--o{ TICKET_VISITS : schedules
  ENGINEERS ||--o{ TICKET_VISITS : assigned
  CUSTOMERS ||--o{ EQUIPMENT : owns
  PRODUCTS ||--o{ LINE_ITEMS : referenced
  QUOTATIONS ||--o{ LINE_ITEMS : contains
  QUOTATIONS ||--o| CONTRACTS : converts
  TICKETS ||--o{ LINE_ITEMS : contains
  PROJECTS ||--o{ TASKS : contains
  PROJECTS ||--o{ EXPENSES : incurs
  CUSTOMERS ||--o{ INVOICES : billed
  INVOICES ||--o{ PAYMENTS : receives
  OIL_BATCHES ||--o{ OIL_SAMPLES : groups
  OIL_REPORTS ||--o{ OIL_SAMPLE_RESULTS : contains
~~~

Exact cardinality for every edge is not verified because many links are legacy integer references without database foreign-key constraints. Ticket, invoice, visit, purchase-order, and oil status meanings must be checked in StatusSeeder.php, relevant controller/model code, and frontend labels.




## Modules and Business Logic

