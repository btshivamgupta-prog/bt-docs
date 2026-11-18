# CRM

CRM owns the commercial and location context used throughout Econpile: customers, suppliers, and sites. It is the reference layer for jobs, enquiries, assets, rentals, and billing workflows.

## Boundaries

Do not duplicate customer or site names in downstream modules when a relationship is available. Retire/deactivate a record rather than deleting it when historical documents already reference it. This keeps exports and audit trails intelligible.

## Implementation

Key controllers are `CustomerController.php`, `SupplierController.php`, and the property/site controller and pages under `frontend/src/view/pages/customer`, `supplier`, and `property`.
