# Dashboard

The Dashboard is the operational starting point for authenticated users. It aggregates current work, rather than becoming a system of record. Treat every card, count, and chart as a drill-down into the owning module.

## Developer guide

- UI: `frontend/src/view/pages/Dashboard.vue`
- API/controller: `app/Http/Controllers/DashboardController.php`
- Route: `admin.dashboard`

When changing a dashboard metric, document its date range, status filters, tenant/company scope, permissions, and destination link. Do not calculate business truth only in the browser: keep the query and authorization on the server.

## Operational impact

Dashboard figures are decision aids for visits, technicians, rentals, deliveries, and enquiries. A changed status definition or timezone can therefore make a correct workflow appear overdue or incomplete. Test empty data, restricted roles, and cross-company data before releasing a new widget.
