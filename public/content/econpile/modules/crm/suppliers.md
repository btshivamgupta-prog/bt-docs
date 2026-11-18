# Suppliers

Suppliers represent external vendors used for procurement and service operations. The route is `admin.supplier`; ownership is in `app/Http/Controllers/SupplierController.php` and `frontend/src/view/pages/supplier/`.

Maintain contacts, addresses, notification details, and commercial data in the supplier record. Use validation rules for names and addresses; do not treat supplier metadata as disposable if purchase, service, or historical records reference it.
