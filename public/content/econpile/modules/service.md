# Service

Service (`admin.service`) defines reusable service catalog data used in work and commercial documents. The module is implemented in `frontend/src/view/pages/service/` and `ServiceController.php`.

Keep service definitions separate from a visit’s execution record: a catalog change must not rewrite historical completed work. Test service selection in line items, reports, imports/exports, and any service-form integration.
