# Service Forms, Closers, Notes, Files, and Line Items

Service forms use ServiceFormController, ServiceFormTemplateController, TicketDetailController, TicketServiceForm models, service-form templates, and frontend formBuilder/service-form pages. Ticket closers, notes, attachments, time tracking, and line items are managed from job/visit detail pages.

Workflow: attach template -> enter fields/files/signature -> save form -> add notes/parts/time -> create closer -> close visit -> generate PDF/Excel and retain documents/history.

Jobs include GenerateServiceFormPDF, PreviewServiceFormPDF, GenerateCloserPDF, GenerateVisitPDF, and mail/notification jobs.
