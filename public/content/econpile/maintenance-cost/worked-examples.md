# Worked Examples

> **Purpose** — the reference cases, using real data, so you can reconcile any number on the
> tab and answer "why is this different from last time?".

Every case below uses the **same visit and the same three line items** — only the discount, tax
and adjustment change. That isolates the effect of each input.

---

## 1. The reference visit — visit #53

`VISIT-199`, ticket `#40` "Visit For Ac Repair".

### Line items

| id | title | type | rate | qty | line sub total |
|----|-------|------|------|-----|----------------|
| 228 | battery 12 | goods | 12.00 | 1 | 12.00 |
| 229 | battery | goods | 12.00 | 1 | 12.00 |
| **230** | **FOrkLift #PRU** | **asset** | **50.00** | **1** | **50.00** |

### Visit money as stored

| field | value |
|-------|-------|
| `sub_total` | 74.00 |
| `discount_type` | 1 (transaction level) |
| `discount_value_type` | 1 (amount) |
| `discount_value` | 10.00 |
| `discount_amount` | 10.00 |
| `tax_applied` | 1 |
| `tax_value` | 9.00 |
| `taxable_amount` | 64.00 |
| `tax_amount` | 5.76 |
| `adjustment` | 0.00 |
| `total` | 69.76 |

Check: `74 − 10 = 64`, `64 × 9% = 5.76`, `64 + 5.76 = 69.76` ✔

---

## 2. The own asset row (line 230, FOrkLift #PRU)

```
ratio = 50 / 74 = 0.6756757
```

| Column | Formula | Value |
|--------|---------|-------|
| Sub Total | its own line: `50 × 1` | **RM 50.00** |
| Discount | `10.00 × 50/74` = 6.7568 | **RM 6.76** |
| Taxable Amount | `64.00 × 50/74` = 43.2432 | **RM 43.24** |
| Tax Amount | `5.76 × 50/74` = 3.8919 | **RM 3.89** |
| Total | `43.24 + 3.89` | **RM 47.13** |

> **RM 6.76 is not stored anywhere.** It is derived: `visit discount 10 × 50/74`. That is why
> the Discount column can look "made up" — it is an allocation, not a column on any table.

### The other two rows, for reconciliation

| Line | Sub Total | Discount | Taxable | Tax | Total |
|------|-----------|----------|---------|-----|-------|
| #228 battery 12 | 12.00 | 1.62 | 10.38 | 0.93 | 11.31 |
| #229 battery | 12.00 | 1.62 | 10.38 | 0.93 | 11.31 |
| **#230 FOrkLift (asset)** | **50.00** | **6.76** | **43.24** | **3.89** | **47.13** |
| **Sum** | 74.00 | 10.00 | 64.00 | 5.75\* | 69.75\* |

\* One cent short of the visit's 69.76 — see [the rounding note](#4-rounding-note-the-1-cent-thing).

---

## 3. Every case

| Case | Discount entered | Tax | Adjustment | Asset Discount | Asset Taxable | Asset Tax | Asset Adj | **Asset Total** |
|------|------------------|-----|------------|----------------|---------------|-----------|-----------|-----------------|
| 1 | RM 10 (amount) | — | — | 6.76 | 43.24 | 0.00 | 0.00 | **43.24** |
| 2 | RM 10 (amount) | 9% | — | 6.76 | 43.24 | 3.89 | 0.00 | **47.13** |
| 3 | 10% | 9% | — | 5.00 | 45.00 | 4.05 | 0.00 | **49.05** |
| 4 | 10% | — | — | 5.00 | 45.00 | 0.00 | 0.00 | **45.00** |
| 5 | RM 10 (amount) | 9% | +5.00 | 6.76 | 43.24 | 3.89 | **0.00** | **47.13** |
| 6 | RM 2 / 2 / 5 (line level) | 9% | — | 5.00 | 45.00 | 4.05 | 0.00 | **49.05** |
| 7 | none (line rate 0) | 9% | +500.00 | 0.00 | 0.00 | 0.00 | **0.00** | **0.00** |

**Case 2 is the live visit #53.** Case 5 is the same visit with an adjustment added — note the
asset still shows `Adj 0.00`, because the adjustment is not allocated.

> **Asset Adj is always `0.00`** while the allocation is disabled. The **Taxable Amount** cell is
> already able to show it as a small `+RMxx.xx adj` line the moment it is switched back on.

---

## 4. Rounding note (the 1-cent thing)

Each asset row is rounded to **2 decimals independently**. Because the shares are fractional
(`50/74`, `12/74`, …), the sum of the rounded rows can be **one cent off** the visit grand total.

Real visit #53: asset `47.13` + product `11.31` + product `11.31` = **69.75**, while the visit
total is **69.76**.

**This is not a bug.** The visit itself stays exact (`69.76`); it is the standard consequence of
proportional allocation. If the business needs the rows to add up exactly, there are two standard
fixes — both small additions to `MaintenanceCostService::allocate()`:

1. **Largest-remainder method** — give the leftover cent to the row with the biggest fractional part.
2. **Anchor one row** — compute every row except the last, then set the last row =
   visit total − sum of the others.

---

## 5. Takeaways for the business team

- A **RM 10 amount** discount and a **10% percentage** discount are **not the same** on a RM 74
  visit (RM 10 vs RM 7.40) — so the asset's discount, tax and total all differ between Case 2 and
  Case 3.
- The asset's **Sub Total is always its own line** (`rate × qty`, **gross**). Its **Discount** is
  either the line's own discount (line-item level) or its proportional slice of the visit discount
  (transaction level); its **Taxable / Tax** are its proportional slice of the visit.
- With a **percentage** discount, the asset's discount is simply that percentage of the asset's own
  subtotal — intuitive. With an **amount** discount, the share depends on how big the visit is.
- **Tax is always charged on the taxable amount after discount**, never on the gross.
- The visit **adjustment is not pushed onto assets** — every asset row shows `Adjustment 0.00` and
  the visit keeps the full adjustment. That is a switch in `MaintenanceCostService::allocate()`,
  not a data problem.
- A **zero-value line** shows all zeros (Case 7) — there is nothing to tax and, while the
  adjustment is disabled, nothing else to carry either.
