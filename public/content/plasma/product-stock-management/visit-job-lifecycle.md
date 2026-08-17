# 3. Module: Visit / Job Lifecycle

[← Back to overview](overview.md)

Stock is **reserved** when a visit is saved and **consumed** only when the visit
completes.

---

## Lifecycle summary

| Stage          | Trigger                                                                 | What happens                                          | Helper                                              |
|----------------|-------------------------------------------------------------------------|-------------------------------------------------------|-----------------------------------------------------|
| Create         | `TicketController::updateOrCreateV1` → `VisitTrait::traitCreateOrUpdateLineItem` | Reserve for every line-item quantity                  | `commitProductStock`                |
| Edit / Update  | same method on an existing visit                                       | Release old quantities, then re-commit the new ones   | `restoreVisitLineItemsForUpdate` → `releaseProductStock` + `commitProductStock` |
| Cancel         | `VisitController::markAsCancel`                                        | Release all reserved quantities for the visit         | `restoreVisitLineItem` → `releaseProductStock`                |
| Mark complete  | `TicketController::CreateTicketCloser` `action=mark_as_complete` (`status 4`) | Physically deduct stock and clear reservations        | `consumeVisitLineItemStock` → `consumeProductStock`          |

The helpers used above are documented in [Stock Helper Methods](stock-helpers.md).

---

## Data model: line_items table

Visit/job line items use two columns to link to a visit:

| Column   | What it stores           | When populated |
|----------|--------------------------|----------------|
| `parent` | Visit ID (new V1) or Ticket ID (old flow) | Always |
| `visit`  | Visit ID                 | Always (since V1 fix) |

> **Important:** `consumeVisitLineItemStock`, `restoreVisitLineItem`, and `getVisitLineItemV1` all query by `visit` column (not `parent`). New line items always have `visit` populated by `VisitTrait::traitCreateOrUpdateLineItem`.

---

## Stock-tracked product types

Only these `product_type` values have inventory stock:

| `product_type` | Stock tracked? | Pickup/Install? | Serialized? |
|---|---|---|---|
| `goods` | ✅ | ✅ | ✅ |
| `parts` | ✅ | ✅ | ✅ |
| `finished_goods` | ✅ | ✅ | ✅ |
| `service` | ❌ | ❌ | ❌ |
| `equipment` | ❌ | ❌ | ❌ |
| `tools` | ❌ | ❌ | ❌ |

- `service`, `equipment`, `tools` have **no physical inventory** — stock helpers skip them.
- API responses (`getVisitLineItemV1`, `getEnquiryLineItemV1`) return `0`/`null`/`[]` for stock columns on non-stock types to avoid leaking inventory data.
- `LineItemController::addVisitLineItemsByType` (pickup/install) rejects non-stock types with a clear error message.

---

## CreateTicketCloser — action vs type

The `CreateTicketCloser` method accepts two fields that work together:

### action field

| Value | Visit status | Timesheet | Stock consumed |
|---|---|---|---|
| `"mark_as_complete"` | `4` (Completed) | `status=2` (Complete) | ✅ Yes |
| `"stop_timer"` | unchanged | `status=0`, `hold=1` | ❌ No |
| anything else / null | unchanged | `hold=1` | ❌ No |

### type field

| Value | Effect |
|---|---|
| `"markascomplete"` | Clears checkout hold, updates visit status → 1 |
| `"hold"` | Pauses checkout timer |
| `"checkouthold"` | Holds checkout |
| `""` (empty) | No special action — just creates the closer |

### Completion guard (prevents double-consumption)

```
$visit is fetched BEFORE the status update:
  $visit->status = OLD value (from DB before update)

After the update:
  DB has status = 4

Guard check:
  if ($visit->status != 4)  →  only runs on first completion
```

This ensures `consumeVisitLineItemStock` only fires once per visit, even on
duplicate API calls.
