# Troubleshooting

## First checks

Inspect storage/logs/laravel.log, storage/logs/horizon.log, browser network requests, the matching route in routes/api.php, controller, FormRequest, model/trait, and failed_jobs. Use php artisan route:list to confirm effective route and middleware.

| Symptom | Investigate | Verified facts / next step |
|---|---|---|
| 401 or redirect after login | AuthenticateController, JwtMiddleware, frontend API/JWT services, config/auth.php | API guard is JWT. Verify token storage/header and route membership in jwt.verify. |
| 404 or wrong API handler | RouteServiceProvider, routes/api.php, frontend router and domain lib | Backend prefix is /api; frontend history routes and API routes are separate. |
| Validation failure | Relevant FormRequest, controller, frontend validation | Compare payload names and conditional rules. |
| Queue work never completes | Queue environment, Redis/database, Horizon, jobs, failed_jobs, Horizon log | Docker starts Horizon, but active driver depends on environment. |
| PDF missing/broken | Matching Generate*PDF, controller, resources/views/pdf, filesystem, storage | PDF generation is often asynchronous. |
| Oil report stuck/failed | OilReportController and three oil-report jobs; report/history tables | Current oil jobs have three tries/backoff and failure handlers. |
| Stock/count mismatch | Product/PO controllers, line-item traits, observers, movement tables | Trace receipt, allocation, conversion, and observer side effects. |
| Visit assignment/status mismatch | Ticket controller, visit models/traits, tracking jobs | Check assignment/status requests and queued offline/status work. |
| Mail not delivered | Matching Send*Mail, mail.php, MailTrait, failed jobs | Verify queue and mail transport configuration. |
| Frontend build failure | frontend/package.json, Node/npm, main.js imports, router/page paths | Frontend uses Vue 2/Vue CLI 4; check peer dependencies. |

## Known codebase risks

- Large controllers contain duplicate/old methods and commented routes.
- Operational/test-like routes exist (test, test-put, test-audio, test-zip, run-events, view-pdf); review exposure before production use.
- API throttling is commented out in app/Http/Kernel.php despite a limiter definition in RouteServiceProvider.
- Foreign-key conventions are inconsistent; migrations and model relations must be checked together.
- Automated tests do not cover business modules in this repository snapshot.




## Testing and Regression
# Jobs, Queues, and Scheduler

## Queue configuration

config/queue.php defines sync, database, redis, beanstalkd, and sqs. The default is QUEUE_CONNECTION with fallback sync. Redis uses REDIS_QUEUE with default default and retry_after 90 seconds. Failed jobs use failed_jobs by default. Docker starts php /var/www/artisan horizon under Supervisor.

## Job families

| Family | Classes/examples | Trigger/result |
|---|---|---|
| PDFs | GenerateQuotationPDF, GenerateContractPDF, GeneratePurchaseOrderPDF, GenerateInvoicePDF, GeneratePaymentPDF, GenerateVisitPDF, GenerateServiceFormPDF, GenerateOilReportPDF, PrepareOilReportPDF, SaveReportImage | Generate and store document output |
| Mail | SendQuotationMails, SendContractMails, SendInvoiceMails, SendPaymentMails, SendJobMails, SendVisitMails, reminder/welcome/password jobs | Send templates and attachments |
| Calendar | CreateCalendarEvent, DeleteCalendarEvent, CreateVisitICS, GoogleCalendarNotification | Sync or produce calendar artifacts |
| Status/reminders | UpdateContractStatus, UpdateQuotationStatus, InvoiceOverdueUpdate, WarrantyStatus, WarrantyReminderJob, VisitReminderJob, ReminderVisitJob, SendTaskReminderMails | Apply time/status rules and notify |
| Tracking | UpdateEngineerLocationJob, UpdateEngineerStatusJob, CheckEngineerStatusJob, OfflineEngineerJob, OfflineVisitJob | Update online state, location, and visits |
| Inventory/transactions | CalculateParentDetails, ConvertProductToEquipment, GenerateBarcode, GenerateLineItemQRCode, RecurringInvoiceCreate, InvoiceSchedulePair, ProcessSchedulePair | Recalculate, allocate, identify, or create recurring records |

## Oil-report retry policy

PrepareOilReportPDF, GenerateOilReportPDF, and SaveReportImage declare three tries, backoff [30, 60, 120], retryUntil(), and failed(Throwable) handling. Confirm each class's stored failure state before changing retry behavior.

## Scheduler

app/Console/Kernel.php loads app/Console/Commands and routes/console.php; its scheduler timezone is explicitly Asia/Singapore. Verified schedules are: UpdateQuotationStatus daily at 00:15; WarrantyStatus, WarrantyReminderJob, VisitReminderJob, UpdateContractStatus, and ContractReminderJob daily at 00:01; InvoiceOverdueUpdate daily at 01:00; StatusChangeJob and OfflineEngineerJob every minute. The actual server trigger for schedule:run is deployment-specific and Not verified. CronJobController also exposes event/reminder operations, so inspect both paths before changing recurrence.

## Operations commands

~~~bash
php artisan migrate
php artisan db:seed
php artisan queue:work
php artisan horizon
php artisan queue:failed
php artisan queue:retry all
php artisan schedule:run
php artisan route:list
php artisan test
~~~

CronJobController exposes operational routes such as run-events, run-reminder-events, and restart-queue; authorization should be checked before use.

## Troubleshooting jobs

Check storage/logs/laravel.log, storage/logs/horizon.log, failed_jobs, Redis/database connectivity, and the job handle()/failed() method. For PDFs, inspect the matching Blade view under resources/views/pdf and writable storage/public URL configuration.



## Setup and Deployment

