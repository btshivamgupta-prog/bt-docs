# Quotation Module

QuotationController, QuotationTrait, QuotationObserver, quotation/line-item/terms/history models, and frontend quotation pages implement quotation creation, calculation, revision, sending, customer verification, signature, status changes, import, and conversion.

Workflow: customer/property/terms -> line items -> tax/discount totals -> draft -> PDF/mail/signature -> customer verify/submit -> accepted/rejected/closed -> contract, visit, invoice, or project conversion.

Migration-verified statuses: 1 Draft, 2 Accepted, 3 Rejected, 4 Pending, 5 Sent, 6 Cancelled, 7 Closed.
