# CM Werkz (Tnine)

CM Werkz, referred to as **Tnine** in the repository, is a field-service platform built around customers, sites, equipment, jobs, technician visits, and transformer oil analysis.

Its active configuration focuses on the lifecycle of transformer-oil sampling: register a transformer, collect samples into a batch, record test results, and issue a trend-aware PDF report.

## Product vocabulary

| Product term | Code / storage term | Meaning |
| --- | --- | --- |
| Transformer | `equipment` | Customer equipment with transformer-specific metadata. |
| Job | `tickets` | Work header; the code often uses *ticket*. |
| Visit | `ticket_visits` | A scheduled, assigned execution of a job. |
| Oil batch | `oil_batches` | A collection or laboratory-processing group of samples. |
| Oil sample | `oil_sample` | A physical sample from one transformer at one point in time. |
| Oil report | `oil_reports` | Report header for a batch and its selected sample results. |

## Start here

1. Read [System Architecture](/cmworkz/architecture/system-architecture) to understand the Laravel/Vue split.
2. Read [End-to-End Workflow](/cmworkz/oil-analysis/workflow) before changing oil functionality.
3. Use [Core Data Model](/cmworkz/architecture/core-data-model) when tracing ownership or adding a relationship.
4. Follow [Local Development & Operations](/cmworkz/getting-started/local-development) before running migrations, seeds, or queues.

> **Safety note:** the default menu seeder truncates and recreates `menus`. Never run fresh migrations or seeders against shared data without explicit approval.
