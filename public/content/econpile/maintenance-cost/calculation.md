# How the Numbers Are Calculated

> **Purpose** — the exact arithmetic behind the Maintenance Cost columns, step by step.

All of this lives in **`app/Services/MaintenanceCostService.php`**. Nothing on the frontend
does arithmetic — it renders what the service returns.

---

## Part A — the visit's own numbers (steps 1–6)

These are the same six steps the rest of the app already uses, so the Maintenance Cost figures
stay consistent with every other money screen.

### Step 1 — per line item

```
lineSubTotal = rate × quantity
lineDiscount = 0                     (transaction level)
             = the line's own discount   (line-item level)
lineNet      = lineSubTotal − lineDiscount
```

### Step 2 — visit subtotal

```
sub_total = Σ lineNet
```

### Step 3 — visit discount, in money

```
discount_amount = discount_value                      if discount_value_type = 1  (amount)
                = sub_total × discount_value / 100     if discount_value_type = 2  (percentage)
```

### Step 4 — the amount tax is charged on

```
taxable_amount = sub_total − discount_amount
```

### Step 5 — tax

```
tax_amount = 0                                    if tax_applied = 0
           = taxable_amount × tax_value / 100      if tax_applied = 1
```

### Step 6 — grand total

```
total = taxable_amount + tax_amount + adjustment
```

> Reference implementations of these six steps: `app/Traits/LineItemTrait.php::calculate_total()`
> and `frontend/src/view/pages/job/partials/Line-Item-V2.vue::calculate_total()`.

---

## Part B — the asset's share (step 7)

This is the part that is unique to the Maintenance Cost tab.

The discount and the tax were decided for the **whole visit**, so each line receives a slice
based on its own **value**:

```
ratio          = entityLineNetSubTotal / visitSubTotal          ← VALUE based

entitySubTotal = entityTaxable + entityDiscount
entityDiscount = line-item level  : the line items' own discount
                 transaction level: visitDiscount × ratio
entityTaxable  = visitTaxable × ratio
entityTax     = visitTax × ratio
entityAdjust  = 0.00                                            ← currently disabled
entityTotal   = entityTaxable + entityTax + entityAdjust
```

### Why value-based

The asset's share follows what its line is **worth** in the visit. That gives the two
properties the business asked for:

- **A zero-value line gets nothing.** `rate = 0` → `ratio = 0` → `Taxable 0.00`, `Tax 0.00`.
  You cannot tax an amount that does not exist.
- **The rows add back up to the visit.** Summed across all lines, the shares reconstruct the
  visit's discount and tax (to within a cent — see [Worked Examples](worked-examples)).

### ⚠️ The visit adjustment is currently NOT allocated

`MaintenanceCostService::allocate()` hard-codes:

```php
$adjustment = 0.0;   // the weight-based line sits commented out directly above it
```

So the asset's **Adjustment is always `0.00`** and never contributes to the Total. A visit-level
adjustment therefore stays on the visit and is not pushed onto any asset.

The weight helper `lineWeights()` (and `$adjustmentRatio`) are **still computed and kept in the
file**, so the behaviour can be switched back on by un-commenting two lines — see
[API & Integration](api-and-integration).

> **The UI is already ready for it.** The **Taxable Amount** cell supports a small add-on line
> (e.g. `43.24` with `+RM33.78 adj` beneath it), rendered by `maintenanceAdjustmentText()` and
> hidden whenever the value is zero. While the adjustment is disabled it simply never shows.

---

## The reconciliation identity

Every row satisfies both of these on screen — use them to spot a bad number:

```
Sub Total − Discount                    = Taxable Amount
Taxable Amount + Adjustment + Tax Amount = Total
```

---

## UI column mapping

| UI column | Value shown |
|-----------|-------------|
| **Sub Total** | `entitySubTotal` |
| **Discount** | `entityDiscount` |
| **Taxable Amount** | `entityTaxable` |
| **Tax Amount** | `entityTax` |
| **Total** | `entityTotal` |

Note `entitySubTotal = entityTaxable + entityDiscount` — so the displayed Sub Total is
constructed to keep the identity `Sub Total − Discount = Taxable` true **at the asset level**,
even though the underlying visit works the other way round (sub total first, then discount).

---

## Cheat sheet

```
Per line     : lineGross = rate × qty
               lineNet   = lineGross − per-line discount      (only when discount_type = 2)

Visit        : sub_total       = Σ lineNet
               discount_amount = value                    (amount)
                               | sub_total × value / 100    (percentage)
               taxable_amount  = sub_total − discount_amount
               tax_amount      = taxable_amount × tax%        (0 if tax_applied = 0)
               total           = taxable_amount + tax_amount + adjustment

Asset share  : ratio            = assetLineNet / sub_total        (VALUE based)
               assetSubTotal     = assetTaxable + assetDiscount
               assetDiscount     = line_item   : Σ line discounts
                                    transaction : visitDiscount × ratio
               assetTaxable      = visitTaxable × ratio
               assetTax         = visitTax × ratio
               assetAdjustment   = 0.00                           (disabled)

Row check    : Sub Total − Discount = Taxable Amount
               Taxable Amount + Adjustment + Tax Amount = Total
```

**Golden rule:** *everything the asset receives is its own line's **value** share of the visit —
`ratio = assetLineNet / visitSubTotal`. A zero-value line is never taxed and currently carries no
adjustment either, so it shows all zeros. The visit-level adjustment is not allocated while
`$adjustment = 0.0` is set in `MaintenanceCostService::allocate()`.*
