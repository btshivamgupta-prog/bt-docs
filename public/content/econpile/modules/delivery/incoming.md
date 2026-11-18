# Incoming

Incoming delivery (`admin.incoming-delivery`) records receipt into the organisation. Confirm source, destination/warehouse, received lines, quantities, condition, and status before making inventory available. Receiving must be idempotent: a retry or double click must not create duplicate stock movement.
