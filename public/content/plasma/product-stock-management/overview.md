# Product Stock Management — Overview

> **Purpose** — how the application manages inventory stock columns across the modules
> that touch stock, so developers can extend the code safely without double-counting or
> corrupting the numbers.

These docs are split by topic. Start here, then jump to the module you care about.

---

## Index

| # | Page | What it covers |
|---|------|----------------|
| 1 | [Stock Columns](stock-columns) | The 4 stock columns (`initial`, `on_hand`, `committed`, `available`) and the invariant |
| 2 | [Stock Helper Methods](stock-helpers) | The 5 helper methods that mutate stock (`commit`, `release`, `consume`, `adjust`, `setAbsolute`) |
| 3 | [Visit / Job Lifecycle](visit-job-lifecycle) | **Module: Visit / Job** — create / edit / cancel / complete life cycle |
| 4 | [Serialized Products](serialized-products) | **Module: Serialized products** — serials in/out, pick & install, variance |
| 5 | [Stock Adjustments](stock-adjustments) | **Module: Stock adjustments** — manual stock in / out |
| 6 | [Audit Trail](audit-trail) | **Audit trail** — inventory history (`product_histories`) and consolidated logging |
| 7 | [Rules for Developers](rules-for-developers) | Quick guardrails to avoid corrupting stock |

---

## Suggested reading order

1. [Stock Columns](stock-columns) — understand the numbers.
2. [Stock Helper Methods](stock-helpers) — know the tools that change them.
3. [Visit / Job Lifecycle](visit-job-lifecycle) — the main flow (most developers work here).
4. Then read the module you're touching (serialized, adjustments) and the audit rules
   ([Audit Trail](audit-trail), [Rules for Developers](rules-for-developers)) before writing new stock code.
