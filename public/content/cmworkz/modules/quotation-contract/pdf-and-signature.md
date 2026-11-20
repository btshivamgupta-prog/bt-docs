# Quotation and Contract PDF/Signature Flow

QuotationController and ContractController expose print/download/signature routes. Templates are resources/views/pdf/quotation.blade.php, quotation-last-page.blade.php, quotation-signature export templates, and contract PDF/export views.

PDF jobs include GenerateQuotationPDF and GenerateContractPDF. Customer verification and submission routes are public-facing endpoints implemented by verifyCustomer and submitCustomer. Exact payload fields and signature storage must be read from the controller and Blade view.
