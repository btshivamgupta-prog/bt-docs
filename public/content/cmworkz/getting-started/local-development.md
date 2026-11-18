# Local Development & Operations

CM Werkz has two local applications: a Laravel backend in the repository root and a Vue 2 frontend in `frontend/`.

## Run locally

```powershell
# Backend — D:\cmworkz
php artisan serve

# Frontend — D:\cmworkz\frontend
npm run serve

# Required when testing report generation
php artisan queue:work
```

The frontend normally runs at `http://localhost:8080` and obtains its API base URL from `VUE_APP_API_URL`.

## Operational dependencies

| Dependency | Why it matters |
| --- | --- |
| Queue worker | Report preparation, chart rendering, and PDF generation are queued. |
| Writable `storage/` | Temporary report chart PNGs are generated below `storage/app/charts/`. |
| Object storage configuration | Generated PDFs are uploaded through the configured S3 disk. |
| Seed data | `database/seeder-data/menu-list.json` defines the initial visible menu. |

## Safe verification checklist

- Use a disposable/local database for migrations and seeders.
- Confirm a worker is running before testing a generated report.
- Verify the uploaded `sample_pdf_url`, not just the API success response.
- Test with a transformer that has both new and historical samples; a single sample does not create a trend chart.
- Check `storage/logs/laravel.log` and `debug_table` entries beginning `Oil Report PDF` or `Oil Report Chart` when generation fails.
