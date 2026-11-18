# Rental

Rental manages time-bounded equipment/product commitments. Its routes use `asset-rentals`; UI lives in `frontend/src/view/pages/rental/`; the backend is `RentalController.php`, `CreateOrUpdateRental.php`, and `RentalTrait.php`.

## Core model

A rental has dates, customer/site context, terms, line items, status, delivery/visit conversion options, and returns. Approval—not draft creation—is the operational commitment point for non-serialized inventory.

The detailed inventory and return contract is documented in [Rentals Contracts](/econpile/modules/rental/rentals-contracts). Keep rental changes transaction-safe and test date overlap, partial return, cancellation, conversion, and repeated approval.
