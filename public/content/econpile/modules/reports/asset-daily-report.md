# Asset Daily Report

Asset Daily Report (`admin.asset-checklist-report`) lists daily asset checklist submissions. The UI is under `frontend/src/view/pages/asset-checklist-report/`; `ItemInspectionReportController.php` supplies reporting data.

It receives submissions from the QR public portal. Treat the reporter input as untrusted, resolve the asset server-side from its barcode, and preserve checklist definition/submission provenance for auditability.
