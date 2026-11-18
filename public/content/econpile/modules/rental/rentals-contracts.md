# Rentals Contracts

Rental contracts are the agreement and lifecycle record for rental line items. Use the create/update/detail routes under `asset-rentals`; `Detail-Rental.vue` presents Overview, Extended Information, Warranty, item returns, and conversion actions.

## Inventory contract

For non-serialized Goods and Parts, approved overlapping rentals reserve capacity:

```text
available = physical stock - outstanding quantity on other approved, overlapping rentals
```

Overlap is inclusive of both endpoints. A return increases availability by reducing `returned_quantity`; it does not automatically change physical `products.initial_stock`. Drafts do not reserve, while approval rechecks availability.

## Detail-page options

- Review basic and extended rental information, terms, and warranty context.
- View and return eligible items (Good, Faulty, or Damaged condition is recorded).
- Convert eligible approved, outstanding items to a Visit.
- Convert selected eligible items to Delivery when permission allows.

Hide or disable conversions when all genuine rental lines are returned; enforce the same guard on the server. For the full movement, picker, return, and concurrency design, see the source specification at `D:\econpile\docs\rental-inventory-and-return-workflow.md`.
