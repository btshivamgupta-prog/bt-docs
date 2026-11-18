# Warranty

Warranty (`admin.warranty`) records coverage and lifecycle actions, including detail, renewal, termination, extension, and extension log views. UI lives in `frontend/src/view/pages/warranty/`; `WarrantyController.php` owns the backend.

Use explicit effective/expiry dates and retain prior terms in history. A warranty state should inform service and asset context but must not silently alter invoice, entitlement, or asset ownership records. Test date-boundary and extension scenarios.
