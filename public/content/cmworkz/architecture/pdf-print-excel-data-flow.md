# PDF, Print, Excel, and Export Data Paths

Templates are under resources/views. Controllers/jobs determine whether output is streamed immediately or created asynchronously. Exact payload fields are in the corresponding controller and Blade template.

## PDF templates
- resources/views/pdf/contract.blade.php
- resources/views/pdf/credit-note.blade.php
- resources/views/pdf/delivery_order.blade.php
- resources/views/pdf/expenses.blade.php
- resources/views/pdf/invoice.blade.php
- resources/views/pdf/oil_report_pdf.blade.php
- resources/views/pdf/payment.blade.php
- resources/views/pdf/project-costing.blade.php
- resources/views/pdf/purchase-order.blade.php
- resources/views/pdf/quotation.blade.php
- resources/views/pdf/quotation-last-page.blade.php
- resources/views/pdf/service_forms/images.blade.php
- resources/views/pdf/service_forms/service-report.blade.php
- resources/views/pdf/service_forms/work-order.blade.php
- resources/views/pdf/service_report_preview_pdf.blade.php
- resources/views/pdf/service_report_visit.blade.php
- resources/views/pdf/task.blade.php
- resources/views/pdf/ticket.blade.php

## Export and Excel templates
### resources/views/exports
- resources/views/exports/contract.blade.php
- resources/views/exports/contract-list.blade.php
- resources/views/exports/credit-note.blade.php
- resources/views/exports/customer.blade.php
- resources/views/exports/engineer.blade.php
- resources/views/exports/invoice.blade.php
- resources/views/exports/invoiceTemplateOne.blade.php
- resources/views/exports/job.blade.php
- resources/views/exports/leave.blade.php
- resources/views/exports/payment.blade.php
- resources/views/exports/product.blade.php
- resources/views/exports/property.blade.php
- resources/views/exports/quotation.blade.php
- resources/views/exports/quotation-24.blade.php
- resources/views/exports/quotation-signature.blade.php
- resources/views/exports/quotationTemplate1.blade.php
- resources/views/exports/quotationTemplateOne.blade.php
- resources/views/exports/service.blade.php
- resources/views/exports/service-report.blade.php
- resources/views/exports/supplier.blade.php
- resources/views/exports/visit-report.blade.php
### resources/views/excel
- resources/views/excel/contract.blade.php
- resources/views/excel/data.blade.php
- resources/views/excel/expenses.blade.php
- resources/views/excel/export-recurring-visits.blade.php
- resources/views/excel/invoice.blade.php
- resources/views/excel/payment.blade.php
- resources/views/excel/quotation.blade.php
- resources/views/excel/service_forms/abb.blade.php
- resources/views/excel/service_forms/batt_s1.blade.php
- resources/views/excel/service_forms/crau.blade.php
- resources/views/excel/service_forms/exl.blade.php
- resources/views/excel/service_forms/hw.blade.php
- resources/views/excel/service_forms/liebert.blade.php
- resources/views/excel/service_forms/service-report.blade.php
- resources/views/excel/task.blade.php
- resources/views/excel/ticket.blade.php
### resources/views/mails
- resources/views/mails/google-calendar.blade.php

## PDF and output jobs
- app/Jobs/GenerateBarcode.php
- app/Jobs/GenerateCloserPDF.php
- app/Jobs/GenerateContractPDF.php
- app/Jobs/GenerateCreditNotePDF.php
- app/Jobs/GenerateDeliveryPDF.php
- app/Jobs/GenerateInvoicePDF.php
- app/Jobs/GenerateLineItemQRCode.php
- app/Jobs/GenerateOilReportPDF.php
- app/Jobs/GeneratePaymentPDF.php
- app/Jobs/GenerateProjectCostingPDF.php
- app/Jobs/GeneratePurchaseOrderPDF.php
- app/Jobs/GenerateQuotationPDF.php
- app/Jobs/GenerateServiceFormPDF.php
- app/Jobs/GenerateVisitPDF.php
- app/Jobs/PrepareOilReportPDF.php
- app/Jobs/PreviewServiceFormPDF.php
- app/Jobs/SaveReportImage.php
