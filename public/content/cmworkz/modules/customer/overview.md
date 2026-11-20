# Customer Module

## Purpose

CustomerController manages customer/company records, contact persons, property details, billing addresses, customer status, imports, exports, and related transactions.

## Frontend

- frontend/src/view/pages/customer/Customer.vue
- frontend/src/view/pages/customer/Create-Customer.vue
- frontend/src/view/pages/customer/Detail-Customer.vue
- frontend/src/view/pages/customer/create-or-update/
- frontend/src/view/pages/customer/detail/overview/

## Backend

- app/Http/Controllers/CustomerController.php
- app/Models/Customer/Customer.php
- app/Models/Customer/CustomerPerson.php
- app/Models/Customer/CustomerDetail.php
- app/Http/Controllers/AddressController.php

## Workflow

Customer list/options -> create or update customer -> add contact persons -> add property and billing details -> activate/deactivate -> link to tickets, visits, equipment, quotations, invoices, and projects.

Important methods include updateOrCreate, createCustomerOnly, updateOrCreatePerson, updateOrCreateDetails, patchContactPerson, patchPropertyAddress, patchBillingAddress, getCustomers, getCustomer, updateStatusCustomers, importCustomer, export_customer, and searchCustomer.

## Data

Primary table is customers. Related data includes customer persons/details, addresses, histories, documents, users, tickets, equipment, and transactions. Exact foreign-key constraints are inconsistent and must be checked in migrations and models.

## Failure points

Duplicate barcode/fields, invalid customer parent, invalid contact/detail IDs, import row errors, and unauthorized status changes.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/customer/create-or-update/Billing-Address.vue`
- `frontend/src/view/pages/customer/create-or-update/Contact-Persons.vue`
- `frontend/src/view/pages/customer/create-or-update/Notification.vue`
- `frontend/src/view/pages/customer/create-or-update/Property-Address.vue`
- `frontend/src/view/pages/customer/Customer.vue`
- `frontend/src/view/pages/customer/detail/overview/Billing-Address.vue`
- `frontend/src/view/pages/customer/detail/overview/Contact-Person.vue`
- `frontend/src/view/pages/customer/detail/overview/Notification.vue`
- `frontend/src/view/pages/customer/detail/overview/Property-Address.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/customer/Create-Customer.vue`
- `frontend/src/view/pages/customer/create-or-update/Contact-Details.vue`
- `frontend/src/view/pages/customer/create-or-update/Contact-Details-Overview.vue`
- `frontend/src/view/pages/customer/create-or-update/Create-Contact-Person.vue`
- `frontend/src/view/pages/customer/create-or-update/Update-Single-Person-Individual-Customer.vue`
- `frontend/src/view/pages/customer/detail/overview/Contact-Detail.vue`
- `frontend/src/view/pages/customer/detail/overview/Contact-Detail-Overview.vue`
- `frontend/src/view/pages/customer/Detail-Customer.vue`
- `frontend/src/view/pages/customer/PasswordUpdate.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/CustomerController.php`
- `importCustomer()` — line 43
- `import_customer()` — line 636
- `import_customer()` — line 1015
- `export_customer()` — line 1350
- `import_customer_sample()` — line 1366
- `updateOrCreate()` — line 1380
- `updateOrCreatePerson()` — line 1816
- `updateOrCreateDetails()` — line 2046
- `updateCustomer()` — line 2153
- `deleteCustomers()` — line 2525
- `deletePersons()` — line 2588
- `deleteDetails()` — line 2627
- `getCustomers()` — line 2660
- `getCustomerList()` — line 2733
- `getProjectList()` — line 2911
- `getAlphbetCustomer()` — line 2934
- `getCustomerProjectContract()` — line 2959
- `getCustomerPersonList()` — line 3075
- `getCustomer()` — line 3108
- `getPersons()` — line 3151
- `getPerson()` — line 3218
- `getDetails()` — line 3246
- `getDetail()` — line 3313
- `updateStatusCustomers()` — line 3340
- `updateStatusPersons()` — line 3408
- `updateStatusDetails()` — line 3463
- `bulkPersonDeleteAction()` — line 3517
- `bulkPersonUpdateAction()` — line 3554
- `updateSingleCustomerStatus()` — line 3591
- `updateSinglePersonStatus()` — line 3634
- `createCustomerOnly()` — line 3661
- `patchContactPerson()` — line 3794
- `patchPropertyAddress()` — line 3911
- `patchBillingAddress()` — line 3968
- `getOptions()` — line 4021
- `getGroupList()` — line 4051
- `getCustomerDataByDays()` — line 4062
- `getServiceForms()` — line 4125
- `updateServiceForms()` — line 4145
- `searchCompany()` — line 4190
- `searchModule()` — line 4275
- `searchCustomer()` — line 4428
- `getRelatedTransaction()` — line 4543
- `getCustomerWithRelation()` — line 4609
- `getOnlyCustomerList()` — line 4670
- `updateCustomerPassword()` — line 4693
- `get_customer_designation()` — line 4728
- `uuid()` — line 4739
- `getMailConfig()` — line 4743
- `sendQuotationMail()` — line 4766

### `app/Http/Controllers/AddressController.php`
- `import()` — line 38
- `updateOrCreateOld()` — line 181
- `updateOrCreate()` — line 362
- `updateSubLocation()` — line 616
- `getAddresses()` — line 631
- `getProperties()` — line 709
- `getPropertyList()` — line 854
- `getBillingList()` — line 892
- `getAddress()` — line 922
- `getProperty()` — line 947
- `deleteAddresses()` — line 976
- `updateStatusAddresses()` — line 1017
- `updateStatusAddress()` — line 1083
- `bulkDeleteAction()` — line 1146
- `bulkUpdateAction()` — line 1183
- `getPersonHistory()` — line 1214
- `getOptions()` — line 1255
- `propertyCategory()` — line 1285
- `getPropertyCategory()` — line 1399
- `propertyUpdateCategory()` — line 1409
- `updateOrCreateAddresss()` — line 1479
- `singleProperty()` — line 1535
- `getPicAddress()` — line 1590
- `updateSinglePrimary()` — line 1602
- `getPicAdress()` — line 1640
- `getLineItemProperty()` — line 1655
- `getOnlyBillingList()` — line 1727
- `getOnlyPropertyList()` — line 1763

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

