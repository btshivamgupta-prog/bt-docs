# 6. Audit Trail (Inventory History)

[← Back to overview](overview.md)

Every stock change is written to `product_histories` through
`ActivityTrait::logProductActivity($request, $product, $description, $attributes)`
(backed by the `ProductHistory` model).

---

## 6.1 Recent improvement: consolidated logging

To avoid flooding the history table with one row per serial number, logging was
aggregated to **one row per action**:

- **Product serial creation** (`ProductController::updateOrCreate`): was one row per
  serial (1000 serials = 1000 rows); now a single row with a count + preview, full list
  in `attributes`:
  `Product #PRD-0008 | 1000 Serial Numbers Added (DSW-1, DSW-2, DSW-3, DSW-4, DSW-5, ...)`
- **Serialized outbond** (`ProductTrait::handleSerializedOutbond`): same consolidation:
  `Visit #VISIT-X | 1000 Serial Numbers Removed (DSW-11, ...)` — 1 row instead of 1000.
- **Visit update logging**: non-serialized products keep the accurate
  `Committed Qty | Available Qty` row as the sole update record; the intermediate
  `Released Qty` row is kept only for **serialized** products. This yields exactly one
  history row per action and avoids showing the pre-commit available number.

---

## 6.2 Example history messages

| Action                               | Message                                                               |
|--------------------------------------|----------------------------------------------------------------------|
| Visit created (commit)               | `Visit #VISIT-21 \| Previous Committed Qty: 0 \| Committed Qty: 50 \| Available Qty: 50` |
| Visit edited, quantity lowered to 10 | `Visit #VISIT-21 \| Previous Committed Qty: 0 \| Committed Qty: 10 \| Available Qty: 90` |
| Visit cancelled                      | `Visit #VISIT-21 Cancelled \| Previous Qty: 50 \| Restored Qty: 50 \| Available Qty: 100` |
| Serials added to product             | `Product #PRD-0008 \| 5 Serial Numbers Added: DSW-11, DSW-12, ...`    |
| Serials removed (outbond)            | `Visit #VISIT-X \| 5 Serial Numbers Removed: DSW-11, DSW-12, ...`     |

---

## Related

- [7. Rules for Developers](rules-for-developers.md) — guardrails for writing stock code
