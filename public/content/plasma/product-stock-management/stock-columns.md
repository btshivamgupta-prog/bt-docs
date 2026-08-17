# 1. The Stock Columns

[← Back to overview](overview.md)

Each row in the `products` table stores four stock columns. Three of them are **inputs**
we write directly; the last one, `available_stock`, is always **derived**.

| Column            | Meaning                                                            | Notes                                   |
|-------------------|--------------------------------------------------------------------|-----------------------------------------|
| `initial_stock`   | Opening / tracked base quantity (synced with movements)            | Reduced on commit, restored on release |
| `stock_on_hand`   | Physical stock actually in hand                                    | Never drops below 0                     |
| `committed_stock` | Quantity reserved by open visits/jobs (not yet consumed)           | Sum of all open reservations            |
| `available_stock` | Quantity you can commit / dispatch right now                       | **Derived**, never written directly     |

---

## The invariant

```php
available_stock = max(0, stock_on_hand - committed_stock)
```

**:eyes: Always route stock writes through a helper** (see
[Stock Helper Methods](stock-helpers.md)) so this invariant stays intact. Never set
`available_stock` (or the others) directly with a raw query.

---

## Note on initial_stock

`initial_stock` is *not* always equal to `stock_on_hand`. It is decreased when stock is
**committed** and restored when released. For "how much do we physically have" always read
`stock_on_hand` / `available_stock` instead.

Next: [2. The stock helper methods →](stock-helpers.md)
