# Reports

> **Purpose** — the admin side of the feature: where a portal submission shows up and what
> you can filter on.

---

## 1. Where it lives

| Thing | Path |
|-------|------|
| Listing | `frontend/src/view/pages/asset-checklist-report/AssetChecklistReport.vue` |
| Detail | `frontend/src/view/pages/asset-checklist-report/Detail-AssetChecklistReport.vue` |
| API | `app/Http/Controllers/ItemInspectionReportController.php` |
| Routes | `routes/api.php` — `asset-checklist-report`, `/filter-options`, `/{id}` |
| Permission | `asset-checklist-report:view` |

---

## 2. Status chips — signed vs not signed

The header shows counts for **All / Signed / Not Signed**, plus per-status counts on each chip.

> The chips are derived from the **`signatures`** column, **not** the stored `status` column
> on `item_inspection_submissions` (which is unused here). A submission with a signature URL
> is "Signed"; one without is "Not Signed".

The counts are computed **after** the filters are applied, so they reflect the current
filter selection rather than the whole table.

---

## 3. Filters

The funnel button opens the filter dialog.

| Filter | Control | Param | Notes |
|--------|---------|-------|-------|
| Date range | date picker + presets | `daterange` | see presets below |
| Asset Type | dropdown | `asset_type` | `asset` = Own Asset, `sub_asset` = Sub Asset |
| **Own Asset** | searchable dropdown | `asset_id` | submits the equipment **id** |
| **Sub Asset** | searchable dropdown | `sub_asset_id` | submits the equipment **id** |
| **Category** | dropdown | `category` | from `equipment.category` |
| Barcode | text | `barcode` | |
| Asset barcode | text | `asset_barcode` | |
| IP address | text | `ip_address` | |

### Date presets

Today · This Week · Last Week · Last 7 Days · This Month · **Last Month** · Last 3 Month ·
**Last Quarter** · This Year.

*Last Quarter* means the previous **complete calendar quarter** (in October it is 1 Jul – 30 Sep).

### How the asset filters combine

```
asset_id  ─┐
           ├── OR   (picking both means "this asset OR this sub asset")
sub_asset_id ─┘

asset_type, category, barcode, ip_address, daterange  ── AND
```

- **AND is impossible between `asset_id` and `sub_asset_id`** — a submission has a single
  `type_id`, so it can never be both. That is why they are OR'd.
- **`asset_type` still ANDs with the id filters.** "Asset Type = Own Asset" plus a specific
  *Sub Asset* returns nothing, because a sub asset is not an own asset. Use the specific
  pickers and leave Asset Type alone.

### Why the dropdowns submit ids, not names

`equipment.name` is **encrypted at rest** (`$encryptable = ['name','serial_no']`), so it cannot
be listed or searched in SQL. The filter-options endpoint decrypts the names in PHP for
display, and the listing filters on the plaintext id.

### Why Sub Asset is not narrowed by Own Asset

It briefly was, but `equipment_sub_assets` holds very few links in practice, so narrowing by
the chosen asset produced an empty dropdown ("No sub assets found"). The two dropdowns are
independent; both selections still apply.

---

## 4. The detail page

Opened from a row. Shows the submission's **snapshot** — the items exactly as they were
answered (name, unit, guidance, tick, observation, quantity), the remarks, the signature
image(s), and the related customer / site / asset.

Because the snapshot is stored on the submission, the detail page keeps rendering correctly
even after the checklist definition is edited or the asset is renamed.

---

## 5. Report API

| Method | URL | Returns |
|--------|-----|---------|
| `GET` | `api/asset-checklist-report` | paginated listing + status counts + `searchable` fields + theads |
| `GET` | `api/asset-checklist-report/filter-options` | `assets[]`, `sub_assets[]`, `categories[]` for the dropdowns |
| `GET` | `api/asset-checklist-report/{id}` | one submission |

### Listing parameters

```
status        all | signed | not_signed        (required)
per_page, current_page, sort_column, sort_order
search        free text over barcode / type_barcode / ip_address / remarks
barcode, asset_barcode, ip_address, category
asset_type    asset | sub_asset
asset_id, sub_asset_id
daterange[]   two Y-m-d dates
```

`filter-options` returns each asset/sub asset as:

```json
{ "id": 101, "text": "Own Asset 1 (AEQP-019)", "name": "...", "barcode": "AEQP-019",
  "category": "...", "asset_ids": [] }
```

`asset_ids` is the real `equipment_sub_assets` link map (which assets a sub asset is fitted
to). Nothing in the report UI narrows by it today — it is there if you want the cascade back.

---

## 6. Gotchas

| Gotcha | Detail |
|--------|--------|
| Signed/not-signed ignores `status` | only `signatures` counts |
| Asset Type + a specific Sub Asset = 0 rows | see above |
| Asset names are decrypted per request | the options endpoint loads every asset/sub asset and decrypts names, so it is a heavier call — fine at hundreds, consider a server-side search at thousands |
| `searchable` drives the generic text inputs | fields listed in the API's `searchable` array that are drawn as dropdowns must be skipped by the page's loop (`dropdownFilterFields`) |
