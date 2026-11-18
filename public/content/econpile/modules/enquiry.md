# Enquiry

Enquiry (`admin.enquiry`) manages inbound service requests. The application provides `EnquiryController.php` and pages under `frontend/src/view/pages/enquiry/` for create, detail, search, and download work.

Enquiries can originate internally or from the public asset QR portal. Intake must capture enough customer/site/asset/contact context to triage work without trusting client-supplied asset identity. An enquiry’s later conversion to operational work should preserve origin and attachments.
