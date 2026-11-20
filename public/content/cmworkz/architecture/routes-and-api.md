# API Documentation

## Common contract

RouteServiceProvider mounts routes/api.php at /api. Public and protected routes coexist. Protected routes are normally inside middleware jwt.verify; login/refresh/verify routes are under /api/auth, /api/v1/engineer/auth, or /api/v1/customer/auth. There is no shared OpenAPI contract in the repository, so exact response fields must be read from the controller method. Validation comes from named FormRequests where present and otherwise controller logic.

## Authentication and platform routes

| Method | Endpoint | Controller method | Purpose |
|---|---|---|---|
| POST | /api/auth/login | AuthenticateController@login | Main login and JWT creation |
| POST | /api/auth/logout | AuthenticateController@logout | Logout |
| POST | /api/auth/refresh-token | AuthenticateController@refresh | Refresh JWT |
| GET | /api/auth/verify | AuthenticateController@verify | Verify auth |
| POST | /api/v1/engineer/auth/login | AuthenticateController@engineer_login | Engineer login |
| POST | /api/v1/engineer/auth/logout | engineer_logout | Engineer logout |
| POST | /api/v1/engineer/refresh-token | engineer_refresh | Engineer refresh |
| GET | /api/v1/engineer/verify | engineer_verify | Engineer verify |
| POST | /api/forgot-password | UserController@postforgotPassword | Start password reset |
| PUT | /api/forgotnew-password | UserController@postNewforgotPassword | Set forgotten password |
| PUT | /api/confirm-password | UserController@updateConformPassword | Change/confirm password |
| GET/POST | /api/password/reset | UserController@getPassworReset / postPassworReset | Password reset |
| GET | /api/configuration, /api/get-config | SettingController@getConfiguration / getConfig | App configuration |

## Core resource route groups

| Domain | Implemented route patterns | Controller |
|---|---|---|
| Customers | customer/import, customernew/import, customer/export, customer/sample-download, search-customer, alphabet-customer, customer/person/detail CRUD and status routes | CustomerController |
| Tickets/visits | ticket, ticket/{ticket}, visit, visit/{visit}, visit-v1, uploads, status, assignment, recurrence, reminders, service forms, timers, closers, check-in/out, PDFs | TicketController, TicketDetailController, VisitController |
| Equipment | equipment, equipment/{equipment}, equipment-new, options, status, sample-data, preventive/warranty/visit lookups | EquipmentController |
| Oil samples | oilsample, oilsample/{oilsample}, options, used-sampling-dates, status | OilSampleController |
| Oil batches | oilbatch, oilbatch/{oilbatch}, options, status, oil-batch-details/{batchId} | OilBatchesController |
| Oil reports | oilreport, oil-report, oil-report/{oilreport}, oil-report/visit/{visit}, retry-pdf, sample delete, Excel, samplePDF/{pdf} | OilReportController |
| Quotations | quotation, status/options/import, quotation/{quotation}/print, authenticated PDF/signature, public verify/submit | QuotationController |
| Contracts | contract, status/options, contract/{contract}/pdf/download, contract/{contract}/print, public verify/submit | ContractController |
| Purchasing | purchase-order, detail/options/status, receiving, pending/received items, PDF download/print | PurchaseOrderController |
| Invoices/payments | invoice, detail/options/status, recurrence, PDF download/print, mail, bad debt; payment and payment PDFs | InvoiceController, PaymentController |
| Products/parts | product, detail/options/status/import/export and part routes | ProductController, Parts\PartController |
| Projects/tasks/expenses | project, milestone, costing download, task, expense, status/listing routes | ProjectController, TaskController, ExpenseController |
| Tracking | tracking/engineers, engineer status, map engineers/routes/visits, visit status, engineer location/online | TrackingController |

## Verified route anchors

~~~text
GET    /api/oilsample                         OilSampleController@getOilSamples
PUT    /api/oilsample                         OilSampleController@createOrUpdate
GET    /api/oilsample/{oilsample}             OilSampleController@getOilSample
PATCH  /api/oilsample/status                  OilSampleController@updateStatusOilSample
GET    /api/oilreport                         OilReportController@getOilReports
POST   /api/oil-report                        OilReportController@createOrUpdate
POST   /api/oil-report/{oilreport}/retry-pdf  OilReportController@retryOilReportPDF
GET    /api/equipment                         EquipmentController@getEquipments
POST   /api/equipment                         EquipmentController@updateOrCreate
PUT    /api/equipment/{equipment}             EquipmentController@updateOrCreate
GET    /api/invoice                           InvoiceController@getInvoices
GET    /api/invoice/{invoice}                 InvoiceController@getInvoice
POST   /api/customer/import                   CustomerController@import_customer
GET    /api/customer/export                   CustomerController@export_customer
~~~

## Validation and side effects

Relevant request classes include CreateOrUpdateTicket, CreateOrUpdateVisit, CreateOrUpdatePayment, CreateUpdatePurchaseRequest, PurchaseOrderStatusRequest, CreateUpdateLineItemRequest, and invoice/quotation/payment/leave/budget update requests. Responses may dispatch mail/PDF/calendar/notification jobs, update histories, write documents, or alter stock. To document a new endpoint accurately, start at routes/api.php, then read the controller method, FormRequest, model/trait calls, and dispatch calls.




## Complete Functional Workflows

