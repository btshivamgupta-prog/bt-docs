# Own Asset

Own Asset (`admin.asset-equipment`) is the principal company asset listing, implemented by `frontend/src/view/pages/equipment/Equipment-Company.vue` and detail views under `equipment/detail/`.

## Detail concerns

The detail experience includes basic/technical information, specifications, warranty, maintenance cost, and related movement/history views. Asset QR codes open the login-free portal for service enquiries and daily checklists; see [QR Scan → Public Portal](/econpile/qr-scan-portal/overview).

When creating or changing an asset, validate ownership/type, site/customer context where applicable, parent relation, serial identifiers, warranty, and financial fields. Asset type determines which workflows may use it.
