# 4. Module: Serialized Products

[← Back to overview](overview.md)

Serialized products keep one row per serial number in `product_serial_numbers`
(`text`, `activated`, `is_inbond`, `is_outbond`, `outbond_id`, `outbond_barcode`,
`outbond_module_type`, `out_bond_date`, `bond_type`).

---

## 4.1 Product creation — ProductController::updateOrCreate

Each serial is created as **inbound** and active:

```sql
activated = 1, product = <product_id>, is_inbond = 1,
inbond_id = <product_id>, inbond_barcode = <product barcode>,
inbond_module_type = 'product'
```

Stock totals for finished-goods parts are set via `setProductStockAbsolute`
(see [Stock Helper Methods](stock-helpers.md#25-setproductstockabsoluteproductid-currentqty--set-to-absolute-value)).

---

## 4.2 Booking a serialized item — handleSerializedOutbond

Serials are marked as **outbound** (assigned to the visit):

```sql
activated = 0,
outbond_id = <visit id>, outbond_barcode = <visit barcode>,
outbond_module_type = <'visit' | ...>,
is_outbond = 1, bond_type = 'outbond', out_bond_date = today
```

`committed_stock` is also reserved in parallel via `commitProductStock`. Edit / cancel
reset the serials back to `activated = 1, is_outbond = 0` (done in
`restoreVisitLineItemsForUpdate` / `restoreVisitLineItem`).

---

## 4.3 Pick / install — LineItemController::addVisitLineItemsByType

Route: `POST /api/visit/{visit}/{type}` (`type = pickup|install`).

### Validation rules

- `serial_numbers` are required and must belong to the product.
- Serial count must equal the picked / installed quantity.
- Duplicate serials are rejected.
- `install` cannot exceed remaining picked qty (`picked - alreadyInstalled`).
- Variance: `variance_quantity = max(0, line_item.quantity - install_quantity)`,
  plus a free-text `reason`.

### Product type filter

Only stock-tracked product types are eligible for pickup/install:

| `product_type` | Eligible? |
|---|---|
| `goods` | ✅ |
| `parts` | ✅ |
| `finished_goods` | ✅ |
| `service` | ❌ Rejected (no physical inventory) |
| `equipment` | ❌ Rejected (customer asset) |
| `tools` | ❌ Rejected (returned after visit) |

The join query at `LineItemController:1485` includes:
```php
->whereIn('line_items.product_type', ['goods', 'parts', 'finished_goods'])
```

Non-stock types get a 422 error: `"Line Item {id} has product_type '{type}'. Only goods/parts/finished_goods items are eligible for {pickup|install}."`

### Pickup payload (POST /api/visit/21/pickup)

```json
{
    "lineitems": [
        {
            "id": 54,
            "product": 3,
            "quantity": 1,
            "picked_quantity": 1,
            "serial_numbers": ["113"]
        },
        {
            "id": 55,
            "product": 1,
            "quantity": 1,
            "picked_quantity": 1,
            "serial_numbers": ["26"]
        },
        {
            "id": 56,
            "product": 2,
            "quantity": 1,
            "picked_quantity": 1,
            "serial_numbers": []
        }
    ]
}
```

### Install payload (POST /api/visit/21/install)

```json
{
    "lineitems": [
        {
            "id": 54,
            "product": 3,
            "quantity": 1,
            "install_quantity": 1,
            "serial_numbers": ["113"]
        },
        {
            "id": 55,
            "product": 1,
            "quantity": 1,
            "install_quantity": 1,
            "serial_numbers": ["26"]
        }
    ],
    "variance_items": [
        {
            "id": 56,
            "variance_quantity": 1,
            "reason": "Part was damaged during installation"
        }
    ]
}
```

Variance records are written to `visit_line_items` with `type = 'install'` and a non-null `reason`.

---

## Related

- [3. Visit / Job Lifecycle](visit-job-lifecycle.md) — reservation flow
- [6. Audit Trail](audit-trail.md) — aggregated serial history logging
