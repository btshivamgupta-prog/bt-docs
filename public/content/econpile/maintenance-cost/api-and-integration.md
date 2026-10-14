# API & Integration

> **Purpose** — the contract between backend and frontend, the service API, and how to mount the
> cost view on another entity.

---

## 1. API contract

The maintenance cost rides on the **existing** visits endpoint. There is **no dedicated route**.

```
GET internal/visits
    ?equipment={entityId}
    &include_maintenance_cost={entityId}      <-- opt-in; the flag IS the entity id
    &per_page=15&current_page=1&job=one-off&search=
    &dates[]=2026-01-01&dates[]=2026-01-31
```

Omitting `include_maintenance_cost` leaves the response **byte-identical to before** — 11 other
screens call this endpoint without the flag.

`include_maintenance_cost` does two things (`TicketController::getAllVisitsInternal()`):

1. it is copied into the existing `equipment` filter, so the listing is scoped to that entity's
   visits;
2. it triggers `ListingTrait::attachMaintenanceCostData()`, which computes the allocation for
   each row.

### Response

Each row gains **one** `maintenance_cost` object and nothing else:

```jsonc
{
  "rows": [
    {
      // ...all the usual visit columns (trip_barcode, visit_title, visit_status_text,
      //    property_name, ticket_type, visit_engineers, total_time, quotation_barcode, ...)
      "visit_id": 53,
      "maintenance_cost": {          // this entity's share of the visit
        "sub_total": 50.00,
        "discount_amount": 6.76,
        "taxable_amount": 43.24,
        "tax_amount": 3.89,
        "adjustment": 0.00,
        "total": 47.13
      }
    }
  ],
  "total_rows": 1, "per_page": 15, "current_page": 1, "offset": 0,
  "ticket_types": []
}
```

> `financial` and `line_items` used to be sent to the browser so a JS library could do the maths.
> They are now **local inputs only** inside `attachMaintenanceCostData()` and are **not** part of
> the payload — the response is roughly 10× smaller and the browser receives no per-line detail.

---

## 2. Frontend flow

```
VisitInternalAll.vue   (:include-maintenance-cost="true"  :equipment-id="detail?.id")
  → GET internal/visits  { equipment, include_maintenance_cost, dates, ... }
  → renders row.maintenance_cost.sub_total / discount_amount / taxable_amount
            / tax_amount / total                       (no arithmetic in the browser)
  → maintenanceAdjustmentText(row.maintenance_cost.adjustment)  // "+RMxx.xx adj", null when 0
```

The five money columns (plus the Assign-To column) are wrapped in `v-if="includeMaintenanceCost"`,
and `columnCount` grows by 5 — so the **same** component serves both the plain Visits tab and the
Maintenance Cost tab, and the pagination bus is scoped to the visible instance.

---

## 3. Service API

```php
use App\Services\MaintenanceCostService;

// Allocate a visit's money onto a subset of its line items.
// $financial : the visit-level money fields (sub_total, discount_type, discount_amount,
//              taxable_amount, tax_value, tax_applied, adjustment, total)
// $lineItems : the visit's top-level line items
// $targetIds : the line-item ids that belong to the entity being viewed
$cost = MaintenanceCostService::allocate($financial, $lineItems, $targetIds);
// => ['ratio', 'level', 'line_item_ids',
//     'sub_total', 'discount_amount', 'taxable_amount', 'tax_amount',
//     'adjustment', 'total']

MaintenanceCostService::lineItemSubTotal($item);           // rate × quantity
MaintenanceCostService::lineItemDiscount($item, $level);   // 0 unless level = line_item
MaintenanceCostService::lineItemNetTotal($item, $level);   // sub total − discount
```

**Public constants:**

| Constant | Value |
|----------|-------|
| `DISCOUNT_TYPE_TRANSACTION` | `1` |
| `DISCOUNT_TYPE_LINE_ITEM` | `2` |
| `DISCOUNT_VALUE_TYPE_AMOUNT` | `1` |
| `DISCOUNT_VALUE_TYPE_PERCENTAGE` | `2` |


---

## 4. Mounting the tab on another entity

```vue
<!-- own asset / sub asset — the same equipment-family listing -->
<v-tab-item :value="'costing'">
  <VisitInternalAll
    :detail="detail"
    type="equipment"
    :equipment-id="detail?.id"
    :include-maintenance-cost="true"
  ></VisitInternalAll>
</v-tab-item>
```

**Props:** `detail`, `type`, `equipment-id`, `include-maintenance-cost`.

> The tab **key must be `costing`**, because the tab icon is resolved as `tab.key + '.svg'`
> (`costing.svg` already exists; `maintenance_cost.svg` does not).

To support a **part / product**, add its id to the equipment-family guard in
`ListingTrait::attachMaintenanceCostData()` and pass the same id as `include_maintenance_cost`.

---

## 5. Known behaviours / possible enhancements

1. **1-cent rounding** — the sum of the rounded rows can differ from the visit total by a cent.
   See [Worked Examples](worked-examples). An optional largest-remainder fix is available.
2. **Zero-value lines (`rate = 0`)** — such a line shows `Sub Total 0.00`, `Discount 0.00`,
   `Taxable 0.00`, `Tax 0.00`, `Adjustment 0.00`, `Total 0.00`. It cannot be taxed and, because
   the adjustment is disabled, it carries nothing at all.
3. **The adjustment is disabled** — `allocate()` hard-codes `$adjustment = 0.0`, so a visit-level
   adjustment never reaches an entity. The weight helpers (`lineWeights()`, `$adjustmentRatio`)
   are still computed and left in the file: un-comment **line 57** and delete **line 58** to
   restore the old weight-based behaviour. The **Taxable Amount** cell already supports the
   `+RMxx.xx adj` sub-line, so no frontend change is needed to switch it back on.
4. **Line-item level discount** — rows are shown **gross** (`Sub Total = rate × qty`,
   `Discount = the line's own discount`) so `Sub Total − Discount = Taxable` reconciles. The level
   comes from `visit.discount_type`; when it is unset / legacy (`0`) the level is now **inferred
   from the line items**, so a line-item-level visit can never be mis-read as transaction level
   (which previously inflated the entity's share).
5. **Entity matching** — a line is treated as "this entity" only when the `product` id matches
   **and** the line is in the equipment family (`equipment`, `asset`, `asset_rental`, `sub_asset`,
   `tools`). This avoids collisions between product ids and equipment ids.
6. **Legacy visits** — if a visit has `0` in the stored money fields, the service *derives* the
   visit breakdown from its line items, so old records still show sensible numbers.
7. **Only visits that contain the entity are listed** — `include_maintenance_cost` reuses the
   existing `equipment` filter, so the endpoint needs no new query.
8. **Rounding parity** — PHP `round($v, 2)` was verified to match the JS `accounting.toFixed(2)` on
   half-way values (`1.005`, `8.575`, `5.015`). A naive `floor($v * 100 + 0.5) / 100` would not.
