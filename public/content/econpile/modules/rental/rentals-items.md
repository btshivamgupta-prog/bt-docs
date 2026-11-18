# Rentals Items

Rentals Items (`admin.rental-products`) is the operational listing of rental line items. It supports status/search views across contract items and is served by `RentalController::getRentalProductsLineItems`.

An item’s availability is not simply the warehouse stock when used in a rental: date window, approved overlapping rentals, serialization, and returned quantity matter. Do not reuse the rental picker semantics in sales or visit pickers without confirming their inventory rules.
