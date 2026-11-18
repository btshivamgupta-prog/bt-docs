# Products

Products (`admin.product`) are catalog items managed by `ProductController.php` and `frontend/src/view/pages/product/`. They may participate in quotes, invoices, visits, rentals, delivery, stock movements, and asset conversion.

Define type, unit, price, tax, serialization, stock, and warranty behavior before exposing a new product field downstream. Product picker responses can have module-specific availability semantics; for rentals, the displayed stock is date-window availability rather than raw physical stock.
