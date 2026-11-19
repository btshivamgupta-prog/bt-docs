# Asset status and return conditions

## Equipment master status actions

`EquipmentController::updateStatusEquipment()` validates status `0,1,2,3` and applies action-specific values:

| Action | Equipment changes | Future rental propagation |
|---|---|---|
| `mark_as_faulty` | `faulty = 1`, `activated = 0`, `status = 5` | Future type-1 allocations and type-9 line items receive `asset_status = 5`. |
| `mark_as_damaged` | `faulty = 0`, `retired = 0`, `activated = 0`, `status = 4` | Future allocations/line items receive `asset_status = 4`. |
| `mark_as_retired` | `retired = 1`, `activated = 0`, `status = 2` | Future allocations receive `asset_status = 4`. |
| `mark_as_repaired` | clears faulty/retired, `activated = 1`, `status = 3` | Future allocations receive `asset_status = 0`. |
| `mark_as_not_retired` | clears faulty/retired, `activated = 1`, `status = 1` | Future allocations receive `asset_status = 0`. |

## Rental return conditions

`RentalController::bulkReturnItems()` maps Good to status `1`, Faulty to `5`, and Damage/Damaged to `4`. It updates the current line item/allocation and equipment master. Faulty/damaged returns also propagate condition to matching future same-asset allocations. Header rental statuses are not changed.

