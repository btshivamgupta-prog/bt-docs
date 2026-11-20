# Invoice Module

InvoiceController, InvoiceTrait, invoice models/history/reminders/recurrence/locking, and frontend invoice pages implement manual and converted invoices.

Workflow: source ticket/visit/quotation/contract/project or manual invoice -> line items/tax/discount -> due date/status -> PDF/mail -> payment -> balance/history -> bad debt, credit note, or closure. Exact invoice status values are Not verified.
