# Parts

Parts (`admin.part`) are managed by `Parts/PartController.php` and `frontend/src/view/pages/part/`. They use the catalog/line-item model but must retain their type-specific rules in filters, pricing, stock, and reports.

Parts can be rental-eligible. Validate quantity and pricing with the shared numeric component, preserve unit-of-measure context, and ensure a stock or price change is reflected correctly in existing versus future documents.
