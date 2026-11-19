# Rental API reference

Routes are defined in `routes/api.php` inside the JWT-protected group.

| Method | Endpoint | Controller method |
|---|---|---|
| GET | `/api/rental` | `RentalController::getRentals` |
| GET | `/api/rental/{rental}` | `getRental` |
| GET | `/api/rental/options/{rental?}` | `getOptions` |
| POST | `/api/rental` | `updateOrCreateV1` |
| PATCH | `/api/rental/{rental}` | `updateOrCreateV1` |
| PATCH | `/api/rental/{rental}/status` | `updateRentalStatus` |
| POST | `/api/rental/bulk-return-items` | `bulkReturnItems` |
| PATCH | `/api/convert-contract/{contract}` | `convertContract` |
| GET | `/api/get-assets/{parent}` | `getLineItems` |
| POST | `/api/add-rental-asset` | `updateLineItems` |
| GET | `/api/rental-contract` | `RentalContractController::getContracts` |
| POST/PUT | `/api/rental-contract[/{contract}]` | `RentalContractController::updateOrCreate` |
| PATCH | `/api/rental-contract/{contract}/status` | `updateContractStatus` |
| GET/PUT/DELETE | `/api/rental-contract/{contract}/line-item` | Contract line-item methods |

Create/update writes the rental or contract, line items, documents, allocation/serial records, parent totals, and history/activity as applicable. Validation errors return 422; controller exceptions return 500. Exact response wrapper fields are **Not verified** without live API execution.

