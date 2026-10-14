# API Reference

> **Purpose** — every endpoint the portal touches, with payloads and validation rules.

Base prefix: `{APP_URL}/api`. Everything under `public/portal/*` is **unauthenticated**.

---

## 1. Public endpoints (no login)

| Method | URL | Handler | Limiter |
|--------|-----|---------|---------|
| `GET` | `api/qr-scan/{barcode}` | `redirectQrScan` | `public-portal` |
| `GET` | `api/public/portal/asset/{barcode}` | `getAsset` | `public-portal` |
| `GET` | `api/public/portal/checklist` | `getChecklist` | `public-portal` |
| `POST` | `api/public/portal/enquiry` | `submitEnquiry` | `public-portal-write` |
| `POST` | `api/public/portal/item-inspection-checklist` | `submitItemInspectionChecklist` | `public-portal-write` |

Plus one non-API route (what the QR actually points at):

| Method | URL | Handler |
|--------|-----|---------|
| `GET` | `{APP_URL}/qr-scan/{barcode}` | `redirectQrScan` → 302 to the frontend |

`{barcode}` is constrained to `[A-Za-z0-9\-_]+` on every route that takes one.

---

## 2. `GET api/public/portal/asset/{barcode}`

Resolves a scanned barcode to an asset. The **entity type is decided server-side** — the
browser never tells the API what it scanned.

```json
{
  "id": 101,
  "barcode": "AEQP-034",
  "name": "...",
  "brand": "...",
  "category": "...",
  "model": "...",
  "location": "...",
  "is_on_rent": false,
  "rental_id": 0,
  "customer_id": 4,
  "property_id": 10,
  "company_name": "...",
  "company_logo": "..."
}
```

| Field | Meaning |
|-------|---------|
| `is_on_rent` / `rental_id` | the active rental, if the unit is out |
| `customer_id` / `property_id` | **resolved server-side** — either the rental's customer, or your own company + its default site. The form echoes these back on submit, so the stored submission is attributed to the same customer/site the page showed. |
| `company_name` / `company_logo` | portal branding, from `Company::where('id', 1)` |

| Status | When |
|--------|------|
| `404` | `Asset not found.` — the barcode resolves to nothing |
| `422` | `Asset barcode is required.` |
| `429` | rate limited |

---

## 3. `GET api/public/portal/checklist`

Returns the active definition, already normalised (see
[Checklist Definitions](checklist-definitions)).

```json
{
  "id": 1,
  "label": "Item Inspection Checklist",
  "value": "item_inspection_checklist",
  "title": "Item Inspection Checklist",
  "subtitle": "Record mechanical fluid levels, ...",
  "items": [
    { "name": "Battery Water", "type": "quantity", "unit": "Liters", "guidance": "Check electrolyte level & terminal corrosion" }
  ],
  "suggestions": [
    { "label": "All levels normal", "text": "All fluid levels verified within normal operating range." }
  ],
  "company_name": "...",
  "company_logo": "..."
}
```

| Status | When |
|--------|------|
| `404` | `Asset checklist is not configured.` — no active definition. The portal shows its "Checklist Unavailable" panel. |

---

## 4. `POST api/public/portal/item-inspection-checklist`

### Request

```json
{
  "barcode": "AEQP-034",
  "type_id": 101,
  "checklist": 1,
  "items": [
    {
      "name": "Battery Water",
      "type": "quantity",
      "unit": "Liters",
      "guidance": "Check electrolyte level & terminal corrosion",
      "checked": true,
      "description": "topped up",
      "quantity": 2
    }
  ],
  "remarks": "All levels verified.",
  "signature": "data:image/png;base64,iVBORw0KGgo...",
  "rental_id": 0,
  "customer_id": 4,
  "property_id": 10
}
```

### Validation

```php
'barcode'             => 'nullable|string|max:100',
'type_id'             => 'nullable|numeric',
'checklist'           => 'nullable|numeric',
'items'               => 'required|array|min:1|max:100',
'items.*.name'        => 'nullable|string|max:255',
'items.*.type'        => 'nullable|string|max:50',
'items.*.unit'        => 'nullable|string|max:50',
'items.*.guidance'    => 'nullable|string|max:255',
'items.*.checked'     => 'nullable|boolean',
'items.*.description' => 'nullable|string|max:500',
'items.*.quantity'    => 'nullable|numeric|min:0',
'remarks'             => 'nullable|string|max:2000',
'signature'           => 'nullable|string|max:1000000',
'rental_id'           => 'nullable|numeric',
'customer_id'         => 'nullable|numeric',
'property_id'         => 'nullable|numeric',
```

| Status | When |
|--------|------|
| `422` | validation failed (Laravel error bag) |
| `404` | `Asset not found for the given barcode.` |
| `404` | `Asset checklist is not configured.` |
| `429` | `Too many submissions. Please try again later.` |

### Server-side decisions (do not rely on the client)

| Field | How the server treats it |
|-------|--------------------------|
| `barcode` + `type_id` | passed to `resolveRelated()`; whichever resolves wins, and `type` / `type_id` are stored from the **resolved** record |
| `checklist` | accepted only if that id exists **and** `status = 1`; otherwise the active definition is used |
| `items[].name` | blank rows are dropped before saving |
| `signature` | decoded and uploaded to S3; the URL is stored, not the base64 |
| `total_items` / `checked_items` | recomputed from the saved rows |
| IP / device / browser / languages | read from the request headers |


---

## 5. `POST api/public/portal/enquiry`

Creates an enquiry from the "Submit Service Enquiry" tab. Writes an `enquiries` row (and its
line items) — **not** a submission. The portal posts the description, problem statement,
category, priority/impact, preferred schedule and any uploaded documents.

---

## 6. Admin endpoints (authenticated)

| Method | URL | Handler |
|--------|-----|---------|
| `GET` | `api/setting/asset-checklist` | list definitions |
| `POST` | `api/setting/asset-checklist` | insert the default if the table is empty |
| `PATCH` | `api/setting/asset-checklist/{id}` | update `attributes` / `label` / `status` |
| `GET` | `api/asset-checklist-report` | the report listing |
| `GET` | `api/asset-checklist-report/filter-options` | dropdown options for the report filters |
| `GET` | `api/asset-checklist-report/{id}` | one submission |

See [Settings](settings) and [Reports](reports).

---

## 7. Calling the portal API by hand

```bash
# resolve an asset
curl -s "$APP_URL/api/public/portal/asset/AEQP-034" | jq

# the active checklist
curl -s "$APP_URL/api/public/portal/checklist" | jq

# what the QR resolves to (302 -> frontend)
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "$APP_URL/qr-scan/AEQP-034"

# submit a minimal inspection
curl -s -X POST "$APP_URL/api/public/portal/item-inspection-checklist" \
  -H 'Content-Type: application/json' -H 'Accept: application/json' \
  -d '{
        "barcode": "AEQP-034",
        "items": [{ "name": "Battery Water", "checked": true, "quantity": 2 }],
        "remarks": "All levels verified."
      }' | jq
```

> Send `Accept: application/json` — these are API routes and a validation failure returns a
> JSON error bag, which is much easier to read than the HTML page.
