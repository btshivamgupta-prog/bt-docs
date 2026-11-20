# Recurring Invoice and Overdue Processing

Invoice recurrence models and jobs RecurringInvoiceCreate, InvoiceSchedulePair, InvoiceOverdueUpdate, and UpdateInvoiceAmount support recurring and overdue processing. InvoiceController provides recurrence/options methods.

The scheduler runs InvoiceOverdueUpdate daily at 01:00 Asia/Singapore. Recurring schedule creation may also be dispatched from invoice/visit flows. Exact recurrence eligibility and status values are Not verified.
