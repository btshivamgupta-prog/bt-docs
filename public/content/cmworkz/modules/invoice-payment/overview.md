# Invoice, Payment, and Credit Note Module

## Purpose

This module creates and manages invoices, records payments, handles credit notes, supports recurring/overdue workflows, and produces financial PDFs and exports.

## Listing page

- Invoice listing: `frontend/src/view/pages/invoice/Invoice.vue`.
- Payment and credit-note pages: `frontend/src/view/pages/payment/`, `frontend/src/view/pages/credit-note/`.
- Listing actions include loading rows, search/filter, opening an invoice/payment/credit-note item, create actions, export/download, and status/payment navigation where implemented.
- Exact button/event/API evidence is in [`listing-and-item-actions.md`](./listing-and-item-actions.md).

## Item page

- Invoice detail/create: `frontend/src/view/pages/invoice/Create-Invoice.vue`, `frontend/src/view/pages/invoice/Detail-Invoice.vue`.
- Payment create/detail flows: `frontend/src/view/pages/invoice/Create-Payment.vue`, `Create-Payment-Invoices.vue`, and related payment pages.
- Credit note create/detail: `frontend/src/view/pages/invoice/Create-Payment-Credit-Note.vue`, `frontend/src/view/pages/credit-note/`.
- Item actions include load invoice/customer data, add or remove line items, save, record payment, apply credit note, generate/download PDF, and navigate to related records where verified.

## Backend and dependencies

- Controllers: `app/Http/Controllers/InvoiceController.php`, `PaymentController.php`, `PaymentCreditNoteController.php`, `CreditNoteController.php`, `GeneratePdfController.php`.
- Depends on Customer, Jobs/Visits, Products/Parts, tax, line items, recurring schedules, PDF templates, mail, and reports.
- Payment and credit-note changes require regression tests for invoice totals, outstanding balances, status transitions, and PDF output.

## Button and feature reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event and exact source line. Recurring and overdue behavior is documented in `recurring-and-overdue.md`.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/InvoiceController.php`
- `__construct()` — line 67
- `updateOrCreate()` — line 81
- `updateOrCreateV1()` — line 240
- `creditNoteInvoice()` — line 658
- `getInvoiceV1()` — line 797
- `getInvoicesOld()` — line 835
- `getInvoices()` — line 1056
- `getAmountByStatus()` — line 1346
- `getInvoice()` — line 1369
- `deleteInvoices()` — line 1400
- `deleteInvoice()` — line 1428
- `getAllStatus()` — line 1470
- `updateStatusInvoices()` — line 1498
- `getOptionsOld()` — line 1555
- `getOptions()` — line 1695
- `getInvoiceRecurrence()` — line 1872
- `updateParticularField()` — line 1897
- `downloadPdf()` — line 1952
- `streamPdf()` — line 1981
- `streamPdfDemo()` — line 2002
- `getMailConfig()` — line 2023
- `sendInvoiceMail()` — line 2045
- `updateInvoiceStatus()` — line 2131
- `updateInvoiceBadDebt()` — line 2227
- `getCustomerInvoice()` — line 2296
- `getCustomerInvoiceStatus()` — line 2322
- `getBulkInvoice()` — line 2341
- `getCustomerSentInvoices()` — line 2382
- `downloadInvoiceV1Pdf()` — line 2401

### `app/Http/Controllers/PaymentController.php`
- `__construct()` — line 40
- `updateOrCreate()` — line 52
- `getPayments()` — line 195
- `getPayment()` — line 381
- `deletePayments()` — line 455
- `deletePayment()` — line 483
- `updateStatusPayments()` — line 552
- `updateStatusPayment()` — line 615
- `getOptions()` — line 653
- `getAllStatus()` — line 728
- `updateParticularField()` — line 749
- `downloadPdf()` — line 810
- `streamPdf()` — line 841

### `app/Http/Controllers/PaymentCreditNoteController.php`
- `__construct()` — line 41
- `updateOrCreate()` — line 53
- `getPayments()` — line 200
- `getPayment()` — line 391
- `deletePayment()` — line 468
- `deletePayment()` — line 535
- `updateStatusPayments()` — line 574
- `updateStatusPayment()` — line 640
- `getOptions()` — line 682
- `getAllStatus()` — line 760
- `updateParticularField()` — line 784
- `downloadPdf()` — line 848
- `streamPdf()` — line 882

### `app/Http/Controllers/CreditNoteController.php`
- `__construct()` — line 33
- `updateOrCreate()` — line 45
- `getCreditNotes()` — line 161
- `getCreditNote()` — line 354
- `deleteCreditNotes()` — line 399
- `updateStatusCreditNotes()` — line 437
- `updateOrCreateLineItem()` — line 475
- `updateCreditNoteDetails()` — line 563
- `getLineItem()` — line 628
- `deleteCreditNoteLineItems()` — line 656
- `getOptions()` — line 693
- `getAllStatus()` — line 739
- `updateOrCreateRefund()` — line 763
- `deleteRefund()` — line 856
- `getRefund()` — line 886
- `updateStatus()` — line 903
- `getMailConfig()` — line 935
- `sendCreditNoteMail()` — line 956
- `downloadPDF()` — line 1019
- `printPDF()` — line 1056

### `app/Http/Controllers/GeneratePdfController.php`
- `service_form()` — line 9

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

