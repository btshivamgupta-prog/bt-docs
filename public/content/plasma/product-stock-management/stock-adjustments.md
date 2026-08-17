# 5. Module: Stock Adjustments

[← Back to overview](overview.md)

Manual stock in/out via `adjustProductStock` (`AdjustmentController`).
See [Stock Helper Methods](stock-helpers.md#24-adjustproductstockproductid-qty-type--manual-inout) for the helper.

---

## Effects

| Type          | Effect                                                        |
|---------------|---------------------------------------------------------------|
| `subtraction` | `initial_stock -= qty`, `stock_on_hand -= qty`, recompute available |
| `addition`    | `initial_stock += qty`, `stock_on_hand += qty`, recompute available |

`committed_stock` is **never** changed here — adjustments only affect physical stock.

**Examples:**
- add `qty = 10` → `stock_on_hand 60 → 70`, `available 70`.
- subtract `qty = 15` → `stock_on_hand 70 → 55`, `available 55`.

---

## Related

- [2. Stock Helpers](stock-helpers.md)
- [6. Audit Trail](audit-trail.md)
