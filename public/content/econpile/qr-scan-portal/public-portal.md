# Public Portal (Frontend)

> **Purpose** — what the scanned page actually renders, so you can find the right block
> when a client reports a layout or validation problem.

**File:** `frontend/src/view/pages/public/PublicPortal.vue` — one large single-file
component (the whole portal, markup + logic + styles).
**Route:** `/qr-scan/:barcode?` → name `public.portal` → `meta.requiresAuth: false`.

---

## 1. Page anatomy

```
┌─ Asset header ───────────────────────────────────────────────┐
│  company logo + name (branding from the backend)             │
│  barcode / serial · brand · category · model · location      │
│  "On Rent" indicator when currentAsset.is_on_rent            │
└──────────────────────────────────────────────────────────────┘
┌─ Mode selector (two cards, one active at a time) ────────────┐
│  [ Customer & Site ]                 [ Mechanic & Fleet ]     │
│  Submit Service Enquiry              Daily Asset Checklist    │
└──────────────────────────────────────────────────────────────┘
┌─ Active form ────────────────────────────────────────────────┐
│  either the enquiry form or the checklist form               │
└──────────────────────────────────────────────────────────────┘
```

The active card is driven by `activeTab`, which is either `'enquiry'` or `'checklist'`.
Switching to `checklist` calls `initSignaturePad()` (the canvas must be visible to size
correctly), and a window resize handler re-inits it.

---

## 2. Mode A — Submit Service Enquiry (`activeTab === 'enquiry'`)

Badge: **Customer & Site**. Posts to `POST api/public/portal/enquiry`.

| Section | Heading | Contents |
|---------|---------|----------|
| 1 | **Enquiry & Defect Details** | description (max 100), problem statement (max 100), category, priority/impact, assignee |
| 2 | **Preferred Service Schedule** | preferred date and time window |
| 3 | **Supporting Documents, Photos & Videos** | file uploads attached to the enquiry |

Character counters are rendered next to the two 100-character fields
(`char-counter-badge`, with `counter-warn` / `counter-limit` states), and the paste/keypress
handlers clamp input at the limit.

---

## 3. Mode B — Daily Asset Checklist (`activeTab === 'checklist'`)

Badge: **Mechanic & Fleet**. Posts to `POST api/public/portal/item-inspection-checklist`.

| Section | Heading | Contents |
|---------|---------|----------|
| 1 | **Fluids & Mechanical Inspection Items** | one row per item from the active definition |
| 2 | **Inspection Summary & Remarks** | quick-suggestion chips + free-text remarks |
| 3 | **Mechanic / Inspector Digital Signature** | the signature canvas |

### Section 1 — items

The rows come from `GET api/public/portal/checklist` (`items[]`), each with
`name`, `type`, `unit`, `guidance`. Each row renders:

- a **tick** (`checked`),
- a **quantity** (`quantity`) for `type: "quantity"` items — "Battery Water", "Hydraulic Oil", etc.,
- an **observation** free-text (`description`, max 500) showing the item's `guidance` as a hint.

### Section 2 — remarks

Free text (`remarks`, max 2000) plus **quick suggestion chips** built from the definition's
`suggestions[]`. Tapping a chip appends its `text` to the remarks box. The remarks field uses
the shared `<TextAreaField>` component, so it behaves like every other remarks field in the app.

### Section 3 — signature

- Library: **`signature_pad`** (`import SignaturePad from "signature_pad"`).
- Initialised with high-DPI scaling (`initSignaturePad()`).
- On submit: `signaturePad.toDataURL()` → posted as `signature` (a `data:image/png;base64,...` string).
- `Clear Signature` empties the canvas and shows a snackbar.
- The canvas is only initialised while the checklist tab is active.

> The signature is **optional** at the API level (`nullable`) — a submission with no
> signature is stored as *not signed* and shows as such in the report.

---

## 4. "Checklist Unavailable" state

If the backend has no active definition, `getChecklist` returns **404** with
`Asset checklist is not configured.` The page sets `checklistUnavailable` and renders an
error panel ("This checklist has not been configured yet, so an inspection cannot be
recorded") instead of an empty form — the enquiry tab still works.

---

## 5. Data the page loads on open

| Call | When | Used for |
|------|------|----------|
| `GET api/public/portal/asset/{barcode}` | on mount, when the route has a barcode | header, branding, `is_on_rent`, `customer_id` / `property_id` |
| `GET api/public/portal/checklist` | on mount | `title`, `subtitle`, `items[]`, `suggestions[]`, branding |

The asset response also carries `customer_id` and `property_id` (resolved **server-side** —
either the active rental's customer, or your own company + its default site). The form hands
those straight back on submit, so the stored submission is attributed to the same customer
and site that the portal displayed.

---

## 6. Gotchas

| Symptom | Likely cause |
|---------|--------------|
| Signature is blank / offset | the canvas was initialised while hidden — switching tabs must go through `initSignaturePad()` |
| Header shows no logo | `company_name` / `company_logo` are read from `Company::where('id', 1)` |
| "Checklist Unavailable" | no row in `item_inspection_checklists` with `status = 1` |
| Item rows missing | the definition's `items[]` is empty, or every item has a blank `name` (the backend drops nameless rows) |
| Remarks chips missing | `suggestions[]` entries need **both** `label` and `text` — half-filled ones are dropped |
