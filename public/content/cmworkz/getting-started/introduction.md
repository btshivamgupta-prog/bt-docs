# cmwrkz Project Documentation

This documentation follows the structure used by the other bt-docs modules. It is generated from the current cmwrkz Laravel/Vue implementation. Secrets are excluded. Items that cannot be confirmed from the repository are marked Not verified.

## Documentation areas

- architecture: system architecture, database model, and API routes.
- field-service: modules, jobs, visits, line items, and end-to-end workflows.
- getting-started: introduction, local development, troubleshooting, testing, and quick reference.
- oil-analysis: oil samples, batches, reports, PDF generation, and oil workflow.

Start with architecture/system-architecture.md, then use the module workflow and API documents for the feature being changed.# Application Architecture

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

