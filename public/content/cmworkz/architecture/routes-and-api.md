# Frontend Routes & API Surface

The Vue router is the source of truth for the browser screens; the Laravel API routes are the source of truth for server contracts. Do not infer an API endpoint from a screen title.

## Oil-analysis routes

| Capability | Admin route | Page component |
| --- | --- | --- |
| Report list | `oil-report` | `oil-report-generator/Oil-Report.vue` |
| Create report | `oil-report/create` | `oil-report-generator/Create-Oil-Report.vue` |
| Report detail | `oil-report/detail/:id` | `oil-report-generator/Detail-Oil-Report.vue` |
| Batch list/create/detail | `oilbatch`, `oilbatch/create`, `oilbatch/detail/:id` | `oil-batch/*` |
| Sample list/create/detail | `oilsample`, `oilsample/create`, `oilsample/detail/:id` | `oil-sample/*` |

## Important API endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /api/oil-report/options` | Options needed by report UI. |
| `GET /api/oil-report/{id}` | Retrieve a report. |
| `POST /api/oil-report` | Create or update a report. |
| `POST /api/oil-report/{id}/retry-pdf` | Requeue PDF work after resolving the cause. |
| `GET /api/oil-batch-details/{batchId}` | Load batch-specific context. |
| `GET /api/oil-batch-status` | Retrieve batch status information. |
| `GET /api/samplePDF/{id}` | Queues PDF generation; it is not a synchronous preview. |

When changing a route or request shape, update the Vue page, API route/controller, validation, permissions, queue effects, and documentation as one change.
