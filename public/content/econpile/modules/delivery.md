# Delivery

Delivery moves selected items between business contexts. It has Incoming, Outgoing, and Transfer routes with create, update, listing, and detail flows in `frontend/src/view/pages/delivery/` and `DeliveryController.php`.

Each delivery must declare direction, source, destination, selected lines, status, and an auditable document/history. A conversion from rental is permitted only for eligible, unreturned, undelivered lines. Delivery must never double-count the reservation already made by an approved rental.
