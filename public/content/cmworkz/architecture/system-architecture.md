# Application Architecture

## Purpose and product shape

The code implements a browser-based operations platform for customers, properties/equipment, engineers, service tickets and visits, quotations/contracts, purchasing, inventory, invoices/payments, projects/tasks, preventive maintenance, scheduling, reporting, and oil-analysis reporting. This is inferred from controllers, Vue routes, models, migrations, PDF views, and seeders; formal requirements are Not verified.

## Runtime components

| Layer | Implementation | Evidence |
|---|---|---|
| HTTP backend | Laravel 8 | composer.json, bootstrap/app.php, app/Http |
| PHP runtime | PHP 7.4 in Docker; Composer allows 7.3/8.x | Dockerfile, composer.json |
| API | Laravel routes mounted at /api | app/Providers/RouteServiceProvider.php |
| Browser UI | Vue 2, Router 3, Vuex 3, Vuetify 2, Bootstrap Vue | frontend/package.json, frontend/src/main.js |
| Database | MySQL-compatible; Docker uses MariaDB 10.6 | config/database.php, docker-compose.yml |
| Queue/cache | Redis, database, or sync; Docker runs Horizon | config/queue.php, docker/supervisor/supervisord.conf |
| Web serving | Nginx -> PHP-FPM and Vue dev server | docker-compose.yml |

## Request flow

~~~mermaid
flowchart LR
  B[Browser / Vue page] --> R[Vue Router]
  R --> A[ApiService / Axios]
  A --> N[Nginx or API base URL]
  N --> L[Laravel /api route]
  L --> M[JWT middleware where required]
  M --> C[Controller]
  C --> V[FormRequest / Rule]
  C --> S[Model, trait, or service]
  S --> D[(MariaDB/MySQL)]
  C --> Q[Dispatch job]
  Q --> H[Redis/database queue + Horizon/worker]
  H --> E[Mail, PDF, storage, Google, FCM, or DB]
~~~

routes/api.php uses the api middleware group. That group starts a session, shares errors, and substitutes bindings; throttle is commented out in app/Http/Kernel.php. Protected groups explicitly use jwt.verify.

## Authentication and authorization

- config/auth.php uses the api guard with jwt and App\Models\User.
- AuthenticateController implements admin login/refresh/verify/logout and engineer/customer entry points.
- Role/permission middleware aliases come from Spatie Permission and are registered in app/Http/Kernel.php.
- User channel values in the users migration are 1 Customer, 2 Engineer, 3 Company. Other status meanings are only documented where migrations or code state them.

## Integrations

The inventory shows Google Calendar/Google APIs, Outlook Calendar, Ably, Pusher, FCM, AWS S3, SMTP/mail, Google Maps/geocoding, OpenAI, Dompdf/mPDF, Excel/PhpSpreadsheet, QR/barcode generation, Slack logging, and activity logging. Configuration is in config/google.php, google-calendar.php, geocoder.php, openai.php, services.php, filesystems.php, mail.php, broadcasting.php, logging.php, and activitylog.php. Whether each provider is enabled in deployment is Not verified.

## Architectural characteristics

- Controllers are large and compose traits such as TicketTrait, InvoiceTrait, QuotationTrait, PDFTrait, MailTrait, ImportTrait, and ListingTrait.
- Domain providers and observers can add persistence side effects; inspect app/Providers and app/Observers before changing models.
- PDFs use controllers, Blade templates under resources/views/pdf, and queued Generate*PDF jobs.
- Legacy/duplicate files exist, including TicketController copy.php, ListingTraitbackup.php, old visit/preventive traits, and old Vue pages. Runtime use is Not verified.




## Project Structure
# Project Structure

## Backend

| Location | Responsibility |
|---|---|
| app/Http/Controllers | HTTP orchestration for tickets, customers, equipment, quotations, contracts, purchasing, invoices, payments, projects, products, and oil reports |
| app/Http/Controllers/Ticket | Ticket detail and visit-specific controllers |
| app/Http/Controllers/Mobile | Engineer/mobile APIs |
| app/Models | Eloquent models grouped by domain |
| app/Http/Requests | Form validation for Ticket, Quotation, PurchaseOrder, Payment, Invoice, Budget, Leave, and LineItem |
| app/Services | PurchaseOrderService, FilterService, AIService |
| app/Traits | Shared calculation, PDF, mail, notification, import/export, listing, inventory, ticket, visit, and calendar behavior |
| app/Jobs | Queued mail, PDF, calendar, status, reminder, inventory, tracking, and oil-report work |
| app/Observers | Model side effects for tickets, visits, documents, products, batches, payments, invoices, leaves, and service forms |
| app/Providers | Route setup, bindings, and domain service providers |
| app/Rules | ExpenseAmount and EntitledLessThanMaxAmount |
| routes/api.php | API routes, mounted at /api |
| app/Console/Kernel.php | Artisan command loading and scheduler timezone |
| database/migrations | Incremental schema history |
| database/seeders | Roles, permissions, statuses, menus, settings, and master/sample data |
| resources/views | Blade pages, PDFs, exports, email templates, import samples |
| storage/logs | Laravel and Horizon logs in a running deployment |

## Frontend

- frontend/src/main.js boots Vue, Router, Vuex, Axios ApiService, Vuetify, Bootstrap Vue, maps, charts, validation, and global components.
- frontend/src/router.js defines history-mode routes. Authenticated admin pages are under /admin; login is /authenticate.
- frontend/src/view/pages contains customer, engineer, equipment, oil report, quotation, contract, purchasing, invoice, payment, product, job, visit, service, project, and preventive-maintenance pages.
- frontend/src/view/components contains reusable selectors, line-item dialogs, upload, address/customer/product controls, and application inputs.
- frontend/src/core/services/api.service.js configures Axios; frontend/src/core/services/store contains auth, customer, job, invoice, quotation, visit, tracking, preventive, line-item, and request modules.
- frontend/src/core/lib contains domain API/mixin helpers. Important examples are job/api.request.job.mixin.js, invoice/invoice.lib.js, quotation/quotation.lib.js, product/product.lib.js, payment/payment.lib.js, service/service.lib.js, and line-item/line.item.lib.js.
- frontend/src/core/validations contains Joi/Vuelidate-related helpers. Backend FormRequests remain authoritative for server validation.

## Config and deployment

composer.json and composer.lock define PHP dependencies; frontend/package.json defines the Vue application; Dockerfile, frontend/Dockerfile, docker-compose.yml, docker/nginx/conf.d/default.conf, docker/php/local.ini, and docker/supervisor/supervisord.conf define the container topology. Never commit .env values.




## Database Schema

