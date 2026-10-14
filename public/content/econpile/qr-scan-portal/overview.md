# QR Scan → Public Portal — Overview

> **Purpose** — the map of the feature: how a printed QR on a machine turns into a
> database row, and which page to read for each part.

The whole point of the design is **one stable URL**. The printed sticker never has to be
reprinted, and the backend decides what the barcode means.

---

## Index

| # | Page | What it covers |
|---|------|----------------|
| 1 | [QR Codes & URLs](qr-codes) | What the QR encodes, how it is generated, S3 storage, the redirect |
| 2 | [Public Portal (Frontend)](public-portal) | The two forms, sections, signature pad, what the page does |
| 3 | [Checklist Definitions & JSON Seeder](checklist-definitions) | The JSON file, its shape, the seeder, how the active definition is picked |
| 4 | [Settings (Admin)](settings) | The admin screen that edits the checklist, and its API |
| 5 | [Submissions & Database](submissions) | The two tables, every column, what gets stored |
| 6 | [API Reference](api-reference) | Every public endpoint, payload and validation rule |
| 7 | [Reports](reports) | The admin listing + detail, filters, signed/not-signed |
| 8 | [Security & Rate Limits](security-and-rate-limits) | No-auth model, throttling, the trap that 429s everything |
| 9 | [Troubleshooting](troubleshooting) | Symptoms → cause → fix |

---

## The flow, end to end

```
   ┌──────────────────────────────────────────────────────────────────────┐
   │ 1. QR is generated when an asset / sub asset is created or updated   │
   │    ProductTrait::genrateBarcode()                                    │
   │      -> only when equipment_type IN ('asset','sub_asset')            │
   │      -> QR content = {APP_URL}/qr-scan/{barcode}      (BACKEND url)  │
   │      -> PNG uploaded to S3, saved on equipment.barcode_image         │
   └──────────────────────────────────────────────────────────────────────┘
                                   │
                          sticker printed & stuck
                                   │
   ┌──────────────────────────────────────────────────────────────────────┐
   │ 2. Someone scans it with a phone                                     │
   │    GET  {APP_URL}/qr-scan/{barcode}                                  │
   │      -> PublicPortalController::redirectQrScan()                     │
   │      -> 302 to {APP_FRONTEND_URL}/qr-scan/{barcode}   (FRONTEND url) │
   └──────────────────────────────────────────────────────────────────────┘
                                   │
   ┌──────────────────────────────────────────────────────────────────────┐
   │ 3. Public portal opens — no login                                    │
   │    Vue route  /qr-scan/:barcode?   ->  PublicPortal.vue              │
   │      -> GET  api/public/portal/asset/{barcode}   resolve the machine │
   │      -> GET  api/public/portal/checklist         the active checklist│
   └──────────────────────────────────────────────────────────────────────┘
                                   │
                 ┌─────────────────┴──────────────────┐
                 │                                    │
   ┌─────────────────────────┐        ┌──────────────────────────────────┐
   │ 4a. Submit Service      │        │ 4b. Daily Asset Checklist        │
   │  POST api/public/portal │        │  POST api/public/portal/         │
   │       /enquiry          │        │       item-inspection-checklist  │
   │  -> an Enquiry          │        │  -> an item_inspection_submission│
   └─────────────────────────┘        └──────────────────────────────────┘
                                                        │
   ┌────────────────────────────────────────────────────┴─────────────────┐
   │ 5. Admin side                                                        │
   │    Asset Checklist Report  (listing + detail)                        │
   │      status = signed / not signed, derived from the `signatures` col  │
   └──────────────────────────────────────────────────────────────────────┘
```

---

## Key decisions worth knowing before you change anything

| Decision | Why it matters |
|----------|----------------|
| The QR holds the **backend** URL, not the frontend one | `APP_FRONTEND_URL` can move (staging → prod) without reprinting stickers. The redirect does the swap. |
| The barcode is the **only** thing in the URL | `{base}/qr-scan/{barcode}`. Adding a second parameter would break already-printed stickers. |
| The **entity type is resolved on the backend** | `resolveRelated()` looks the barcode up and decides equipment vs product. The browser never tells the server what it scanned. |
| **No authentication** | Anyone who can reach the URL can submit. The only defences are the rate limiters and the audit columns. |
| Only **one** checklist definition is active | `buildChecklistDefinition()` takes the first row with `status = 1`, ordered by `id`. Editing a second definition has no effect. |
| Signed / not signed comes from `signatures` | The stored `status` column on submissions is **not** used by the report. |
| A definition is **JSON in one column** | `item_inspection_checklists.attributes`. The seeder and the admin screen both write that shape. |

---

## Suggested reading order

1. [QR Codes & URLs](qr-codes) — get the URL/redirect model straight first.
2. [Checklist Definitions & JSON Seeder](checklist-definitions) + [Settings](settings) —
   the data that drives the form.
3. [Public Portal](public-portal) — the form itself.
4. [Submissions & Database](submissions) + [API Reference](api-reference) — what lands.
5. [Reports](reports) — the admin side.
6. [Security & Rate Limits](security-and-rate-limits) and
   [Troubleshooting](troubleshooting) before you deploy.
