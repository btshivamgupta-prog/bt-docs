# Developer Quick Reference

## URLs

| URL | Meaning |
|---|---|
| / | Vue redirects to authentication |
| /authenticate | Authentication page |
| /admin/* | Authenticated admin Vue routes |
| /api/* | Laravel API prefix |
| /api/auth/login | Main login |
| /api/v1/engineer/auth/login | Engineer login |
| /api/v1/customer/auth/login | Customer login |
| Docker :80 | Nginx/application entry |
| Docker :8080 | Vue development server |

## Files to open first

- Backend routing: bootstrap/app.php, app/Providers/RouteServiceProvider.php, app/Http/Kernel.php, routes/api.php.
- Auth: app/Http/Controllers/AuthenticateController.php, app/Http/Middleware/JwtMiddleware.php, config/auth.php.
- Frontend bootstrap: frontend/src/main.js, frontend/src/router.js, frontend/src/core/services/api.service.js, frontend/src/core/services/store/auth.module.js.
- Business entry points: TicketController.php, CustomerController.php, EquipmentController.php, QuotationController.php, PurchaseOrderController.php, InvoiceController.php, PaymentController.php, OilReportController.php.

## High-value models/tables

users, customers, engineers, tickets, ticket_visits, products, product_batches, line_items, quotations, contracts, purchase_orders, invoices, payments, projects, tasks, expenses, equipment, oil_samples, oil_batches, oil_reports, oil_sample_results, jobs, and failed_jobs.

## Commands

~~~bash
php artisan route:list
php artisan migrate
php artisan db:seed
php artisan test
php artisan queue:work
php artisan horizon
php artisan queue:failed
php artisan queue:retry all
php artisan schedule:run
cd frontend; npm run serve
cd frontend; npm run lint
cd frontend; npm run build
~~~

## Logs and operations

- Laravel: storage/logs/laravel.log
- Horizon: storage/logs/horizon.log in Docker Supervisor configuration
- Queue failures: failed_jobs
- Queue payloads: jobs when database driver is active
- Configuration: config/*.php, deployment environment, docker-compose.yml
- Migrations/seed data: database/migrations, database/seeders

## Safe-change checklist

Trace route -> controller -> FormRequest -> model/trait/service -> observer/job -> frontend caller. Check migrations and model relations before changing columns. Search all comparisons of status values. Run route:list, PHP tests, frontend lint/build, and the module regression matrix in 10-testing.md. Never place credentials or environment values in this KT.




## Documentation Notes

