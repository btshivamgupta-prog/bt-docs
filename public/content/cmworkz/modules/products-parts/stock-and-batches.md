# Stock, Batches, Serials, and Adjustments

Products use product_batches, product movement/history, hold-stock, adjustment, serial-number, supplier, and line-item tables. Purchase-order receiving and ticket/visit line items can update availability, committed stock, and batch records.

GenerateBarcode and GenerateLineItemQRCode produce identifiers when dispatched. Product/batch observers can create side effects. Check ProductController, PurchaseOrderController, ProductTrait, ProductBatchTrait, and migrations before changing stock logic.

Failure points: insufficient stock, duplicate SKU/barcode/serial, invalid batch, partial receipt mismatch, and stale committed stock.
