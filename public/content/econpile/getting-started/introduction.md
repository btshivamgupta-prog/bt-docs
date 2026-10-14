# Econpile — Introduction

> **Purpose** — orient a new developer on what Econpile is and where the
> **QR Scan → Public Portal** feature lives, before they touch it.

Econpile is a field-service management (FSM) platform: customers, assets, rentals,
visits/jobs, quotations, invoices, and so on. The backend is **Laravel** (API + SPA
frontend in the same repo) and the frontend is **Vue 2 + Vuetify 2**.

This documentation covers one feature in depth: the **Public Service Portal** — the
login-free page that opens when somebody scans the QR sticker on a machine.

---

## What the feature is

Every **own asset** and **sub asset** carries a printed QR code. Scanning it with a
phone camera opens a public web page (no login, no app install) where anyone on site can:

1. **Submit Service Enquiry** (the "report a fault" path) — raise an enquiry with photos/videos and a preferred service window.
2. **Daily Asset Checklist** — tick off fluid/mechanical inspection items, add remarks,
   and sign with a finger on the screen.

Both paths write to the database and surface in the admin **Asset Checklist Report**.

---

## Where the code lives

| Layer | Path | What it is |
|-------|------|------------|
| QR generation | `app/Traits/ProductTrait.php` | `genrateBarcode()` / `generateAndUploadQrCode()` |
| Redirect | `app/Http/Controllers/PublicPortalController.php` | `redirectQrScan()` — backend URL → frontend URL |
| Public API | same controller | `getAsset`, `getChecklist`, `submitEnquiry`, `submitItemInspectionChecklist` |
| Public routes | `routes/api.php`, `routes/web.php` | the `public/portal/*` and `qr-scan/*` routes |
| Rate limits | `app/Providers/RouteServiceProvider.php` | `public-portal`, `public-portal-write` |
| Portal UI | `frontend/src/view/pages/public/PublicPortal.vue` | the whole public page |
| Portal route | `frontend/src/router.js` | `/qr-scan/:barcode?` → `public.portal` |
| Definitions | `database/seeder-data/item-inspection-checklists.json` | the checklist content |
| Seeder | `database/seeders/ItemInspectionChecklistsSeeder.php` | loads that JSON |
| Admin settings | `frontend/src/view/pages/profile/Setting/AssetChecklist.vue` | edit the checklist |
| Reports | `frontend/src/view/pages/asset-checklist-report/` | listing + detail |
| Report API | `app/Http/Controllers/ItemInspectionReportController.php` | listing, filters, detail |

---

## Read next

- [QR Scan → Public Portal — Overview](/econpile/qr-scan-portal/overview) — the full picture, indexed.
- [QR Codes & URLs](/econpile/qr-scan-portal/qr-codes) — what the sticker actually encodes.
- [Public Portal (Frontend)](/econpile/qr-scan-portal/public-portal) — the two forms, field by field.

---

## Conventions used in these docs

- **Asset** means a row in `equipment` with `main_type = 'main_company'` and
  `equipment_type IN ('asset','sub_asset')`. Those are the only rows that get a portal QR.
- **Definition** means a row in `item_inspection_checklists` — the configured checklist.
- **Submission** means a row in `item_inspection_submissions` — one filled-in inspection.
- The portal is **unauthenticated**. Anything that must be trusted is resolved on the
  backend, never taken from the browser payload.
