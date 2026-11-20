# Setup and Deployment

## Requirements

- PHP 7.4 is the Docker runtime; Composer is required. Non-Docker production support is Not verified.
- Node/npm are required for the Vue CLI 4 frontend.
- MySQL-compatible database; Docker uses MariaDB 10.6 on host port 3307.
- Redis is used by Docker and supported by queue/cache configuration.
- Docker Compose is the verified full-stack path.

## Docker path

~~~bash
docker compose up --build
~~~

The stack contains Nginx on port 80, Laravel/PHP-FPM, Vue dev server on 8080, MariaDB, and Redis. Compose supplies frontend URLs and persistent mysql_data and frontend node_modules volumes.

~~~bash
docker compose exec app php artisan migrate
docker compose exec app php artisan db:seed
docker compose exec app php artisan route:list
docker compose exec frontend npm run serve -- --host 0.0.0.0
~~~

The exact seed order and required tenant/client data are defined by database/seeders/DatabaseSeeder.php and called seeders; inspect before resetting a database.

## Non-Docker path

~~~bash
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
cd frontend
npm install
npm run serve
~~~

The repository does not include a committed .env.example in the inspected file list, so exact non-Docker defaults are Not verified. Configure variable names from .env/.env.production without copying secrets into docs or source control.

## Environment variable groups

Names present include APP_ application settings, DB_ database, QUEUE_CONNECTION/CACHE_DRIVER/SESSION_DRIVER/REDIS_, MAIL_, AWS_, JWT_, maps/geocoder, Pusher, FCM, Outlook, Google Calendar, client/feature flags, and logging. The frontend reads VUE_APP_ values in frontend/src/main.js. Values are deployment secrets or tenant settings and are intentionally omitted.

## Storage and deployment notes

PDFs, uploads, generated images, Excel exports, and mail attachments depend on config/filesystems.php, storage, public assets, and relevant Blade views. Ensure filesystem and generated URLs agree with application/frontend URLs. PHP limits are customized in docker/php/local.ini; large oil-report payloads also affect MariaDB max_allowed_packet in Compose.

## Production checklist

1. Confirm application, database, Redis, mail, storage, JWT, maps, and calendar configuration without logging secrets.
2. Run migrations and seed only the intended environment.
3. Build frontend with npm run build from frontend.
4. Run PHP tests and php artisan route:list.
5. Confirm Horizon/queue workers, scheduler/cron, writable storage, and logs.
6. Smoke-test login, customer, visit, PDF, mail, and oil-report retry where enabled.




## Troubleshooting
# Testing and Regression

## Existing automated tests

The repository contains only Laravel example tests: tests/Unit/ExampleTest.php and tests/Feature/ExampleTest.php, with support in tests/TestCase.php and tests/CreatesApplication.php. No domain-specific test suite was found; coverage is Not verified.

## Commands

~~~bash
php artisan test
vendor/bin/phpunit
cd frontend
npm run lint
npm run build
~~~

## Manual smoke tests

1. Authenticate as the intended user channel and verify protected API calls.
2. Create/update a customer, contact/property details, and status.
3. Create a product/equipment record and verify options, detail, and status.
4. Create a ticket and visit; assign engineer/team, reschedule, check in/out, submit a form, and close the visit.
5. Create a quotation, send/verify/accept it, and verify PDF/mail behavior.
6. Create a purchase order, receive partial and complete quantities, and verify stock/history.
7. Create an invoice/payment and verify PDF, status, bad-debt/credit-note behavior if enabled.
8. Create an oil sample/batch/report and exercise report generation and retry.
9. Inspect queue/Horizon and failed_jobs after asynchronous actions.

## Regression matrix

| Change | Minimum regression |
|---|---|
| Ticket/visit/status | create, assignment, reschedule, check-in/out, reminder, form, close, invoice/PDF side effects |
| Line items/pricing/tax | quotation, contract, invoice, purchase order, ticket parts, totals and PDF |
| Product/stock | product CRUD, batch/serial, PO receive, allocation/return, equipment conversion |
| Invoice/payment | invoice lifecycle, recurrence, payment, credit note, PDF/mail, overdue update |
| Oil report | sample/batch/report CRUD, result data, image/PDF jobs, retry/failure state |
| Auth/permissions | login/refresh/verify/logout for channels and unauthorized protected route |
| Frontend shared API/mixin | every page importing helper, route guard, error and validation display |

## Testing gaps

There are no verified integration, browser, contract, queue, or migration tests for these modules. Add focused tests alongside feature changes only after database/test conventions are confirmed.




## Developer Quick Reference

