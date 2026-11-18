# Sub Asset

Sub Asset (`admin.sub-asset-equipment`) is a component or child asset. Its UI is in `frontend/src/view/pages/sub-equipment/`.

It inherits operational context from its parent but remains a traceable record in its own right. Changes to parent assignment, status, site, or retirement should be reviewed for effects on QR scanning, inspections, jobs, warranty, and aggregate maintenance cost. Prevent circular parenting and cross-company relationships.
