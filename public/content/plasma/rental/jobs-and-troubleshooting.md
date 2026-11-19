# Rental jobs and troubleshooting

`app/Console/Kernel.php` schedules `CloseRentalsPastCeaseDate` daily at `00:30` with `withoutOverlapping()`, and `UpdateContractStatus` every minute. The scheduler timezone is `Asia/Singapore`.

`CloseRentalsPastCeaseDate` finds rentals and rental contracts whose `contract_end` is before today, sets status `10`, releases rental-owned assets for rentals, and writes history. The queue default comes from `QUEUE_CONNECTION`; configured drivers are in `config/queue.php`.

## Debugging order

1. Check `storage/logs`, queue worker output, and `failed_jobs`.
2. Confirm rental status/date and the scheduler process.
3. Inspect `rentals`, `line_items`, `asset_allocations`, `equipment`, and `rental_histories` together.
4. For returns, inspect `RentalController::bulkReturnItems()`.
5. For master asset condition changes, inspect `EquipmentController::updateStatusEquipment()` and `syncActiveRentalLineItemStatuses()`.

Known risks: the rental request class `App\Http\Requests\Rental\UpdateParticularField` is missing, rental status meanings conflict between source files, and `return_quantity` does not implement partial return behavior.

