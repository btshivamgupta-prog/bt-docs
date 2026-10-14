# Asset Maintenance Cost — Overview

> **Purpose** — explain what the **Maintenance Cost** figures on an asset mean, where to see
> them visit by visit, and the single rule behind every number.

---

## 1. Where you see it

**Asset detail page** — `asset-equipment/detail/{id}` (also `sub-asset-equipment/detail/{id}`).

The page has a **Maintenance Cost** tab next to the normal **Visits** tab:

```
/admin/asset-equipment/detail/123
  ┌──────────┬─────────┬──────────────────┬─────────────┐
  │ Overview │ Visits  │ Maintenance Cost │ Attachments │
  └──────────┴─────────┴──────────────────┴─────────────┘
                          ▲
                          └── one row per visit, showing THIS asset's share
```

> **Each visit is listed individually.** The tab is a visits listing — one row per visit that
> contains this asset — and each row carries five extra money columns showing what *this asset*
> was charged within that visit.

| Tab | Component | Shows |
|-----|-----------|-------|
| **Visits** | `<VisitInternalAll :equipment-id="detail?.id" />` | the visit list, no money columns |
| **Maintenance Cost** | the same component with `:include-maintenance-cost="true"` | the same list **plus** the asset's share |

The two tabs render the **same component** — the money columns are simply switched on by the
flag. There is no separate page or endpoint for the cost view.

Both tabs are permission-gated (`visit:view` for Visits; the cost tab sits inside the asset
detail page guarded by `asset-equipment:view`).

---

## 2. The question it answers

A **visit** is a job. Inside a visit are **line items** — products, parts, own assets, sub
assets, tools. Discount, tax and adjustment are normally entered **once for the whole visit**,
not per line.

So when you open one asset, the tab has to answer:

> "Out of everything this visit charged, how much belongs to *this* asset?"

The answer is a **proportional allocation**: the asset's share of the visit's money, weighted
by how much of the visit's value its own line item represents.

```
ratio = this asset's line net total  /  the visit's sub total
```

Everything the asset receives — discount, taxable amount, tax — is that ratio applied to the
visit's corresponding figure. See [How the Numbers Are Calculated](calculation).

---

## 3. The five columns

| Column | What it is |
|--------|-----------|
| **Sub Total** | the asset's **own line** — `rate × quantity` (gross, before any discount) |
| **Discount** | the asset's share of the visit discount (or its own line's discount, at line-item level) |
| **Taxable Amount** | the amount tax is charged on, for this asset |
| **Tax Amount** | the asset's share of the visit tax |
| **Total** | `Taxable Amount + Tax Amount + Adjustment` |

Every row reconciles on screen:

```
Sub Total − Discount      = Taxable Amount
Taxable Amount + Adjustment + Tax Amount = Total
```

---

## 4. The one rule to remember

> **The asset's share is based on the VALUE of its own line, not on quantity, time or count.**

```
ratio = assetLineNet / visitSubTotal
```

Consequences worth knowing up front:

- A **zero-value line** (`rate = 0`) gets `0.00` everywhere. You cannot tax an amount that does
  not exist.
- The asset's **Sub Total is always its own line** (gross), while **Discount / Taxable / Tax are
  its proportional slice** of the visit.
- The visit's **adjustment is currently NOT allocated** — every asset row shows
  `Adjustment 0.00` and the visit keeps the whole adjustment. That is a switch in the service,
  not a data problem. See [API & Integration](api-and-integration).

---

## 5. Where the code lives

| Piece | File |
|-------|------|
| **Allocation maths — the single source of truth** | `app/Services/MaintenanceCostService.php` |
| Attaches the allocation to each visit row | `app/Traits/ListingTrait.php` → `attachMaintenanceCostData()` |
| API (opt-in flag on an existing endpoint, no new route) | `GET internal/visits?include_maintenance_cost={entityId}` |
| API handler | `app/Http/Controllers/TicketController.php` → `getAllVisitsInternal()` |
| The listing that renders the money columns | `frontend/src/view/pages/partials/Detail/VisitInternalAll.vue` |
| Where the tab is mounted | `frontend/src/view/pages/equipment/Detail-Company-Equipment.vue`, `frontend/src/view/pages/sub-equipment/Detail-SubEquipment.vue` |
| Backend reference for the same maths | `app/Traits/LineItemTrait.php` → `calculate_total()` |
| Frontend reference for the same maths | `frontend/src/view/pages/job/partials/Line-Item-V2.vue` → `calculate_total()` |

**The PHP service is the single source of truth.** The backend computes the asset's share and
returns one ready-made `maintenance_cost` object per row; the frontend is a **pure renderer** —
it does no arithmetic at all.

> **History:** the allocation was first written as a frontend library
> (`maintenance-cost.lib.js` + a `MaintenanceCost.vue` component). It was ported 1:1 to
> `MaintenanceCostService.php`, all the reference cases were verified to match exactly, and the
> JS library and component were then deleted — so exactly one implementation remains.

The long-form reference document lives in the repo at `docs/maintenance-cost-calculation.md`.

---

## Read next

- [How the Numbers Are Calculated](calculation) — the seven steps, and the UI column mapping.
- [Worked Examples](worked-examples) — real visit data, every discount/tax combination.
- [API & Integration](api-and-integration) — the endpoint contract, the service API, and how to
  mount the tab on another entity.
