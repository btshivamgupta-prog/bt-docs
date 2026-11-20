# Payments and Credit Notes

PaymentController, PaymentCreditNoteController, CreditNoteController, payment/credit-note models, histories, refunds, and frontend payment/credit-note pages implement receipts and adjustments.

Workflow: select invoice -> validate amount/mode/date -> save payment/history -> update invoice balance -> create credit note/refund where supported -> generate payment or credit-note PDF/mail.

Failure points: locked invoice, duplicate/over payment, invalid credit amount, PDF/mail failure, and balance mismatch.
