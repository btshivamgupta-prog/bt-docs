# Customer-owned asset item list and detail

## Active routed pages

The current router exposes:

- `/plasma` application route maps to the docs only; the Plasma application UI routes are `/client-equipment`, `/client-equipment/create`, `/client-equipment/update/:id`, and `/client-equipment/detail/:id`.
- Active components: `frontend/src/view/pages/equipment-client/Equipment.vue` and `Detail-Equipment.vue`.
- Create/update component: `frontend/src/view/pages/new-equipment-client/Create-Client-Equipment.vue`.

The list uses `routeAPI: 'equipment'`, filters customer equipment with `filter_type = 'main_customer'`, supports status/search/property filters, create, edit, row detail, bulk active/inactive, delete, and warranty controls.

The detail page calls `GET /api/equipment/{equipment}` and displays barcode/QR, name, encrypted serial number, selling price, customer, dates, location, tags, specifications, sales information, warranty, preventive maintenance, visits, jobs, quotations, invoices, and images.

## Detail actions

`Detail-Equipment.vue::updateMoreAction()` sends `PATCH /api/equipments/status` through `patchEquipmentParams()` for active, inactive, repaired, faulty, damaged, retired, and not-retired actions. The backend is `EquipmentController::updateStatusEquipment()`.

