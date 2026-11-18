# Active Modules & Menu Seed

`database/seeder-data/menu-list.json` is the default menu definition consumed by `DefaultMenuSeeder`. The seeder truncates and rebuilds `menus`; it is bootstrap data, not a safe incremental configuration update.

## Default active modules

| Channel | Enabled areas |
| --- | --- |
| Admin | Dashboard, calendars, Customers, Sites, Transformers, Oil Batches, Oil Samples, Oil Report Generator, Jobs, Technicians, Projects, and Contracts. |
| Engineer | Customer, Job, and Leave. |
| Channel 3 | Project only; the seed does not declare the human role. |

`activated: "1"` means visible by default for that channel. Existing environments may have different persisted menus and permissions.

## Disabled does not mean absent

Invoices, sales, preventive maintenance, assets, and warranty remain in the codebase even where the default menu hides them. Before removing code or enabling a feature, inspect routes, permissions, tenant settings, background jobs, and deployed menu data.
