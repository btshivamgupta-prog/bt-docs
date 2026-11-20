# Quotations and Contracts Module

## Purpose

This module prepares customer quotations, converts or links accepted work to contracts, renders quotation/contract PDFs, supports customer verification/submission flows, and exposes related job and finance actions.

## Listing page

- Quotation listing: `frontend/src/view/pages/quotation/Quotation.vue`.
- Contract listing: `frontend/src/view/pages/contract/Contract.vue`.
- Listing actions include load, search/filter, create, open detail, export/download, and status/action navigation where present in the source inventory.
- Exact event bindings, handlers, routes, and store/API calls are in [`listing-and-item-actions.md`](./listing-and-item-actions.md).

## Item page

- Quotation create/detail pages: `frontend/src/view/pages/quotation/Create-Quotation.vue`, `frontend/src/view/pages/quotation/Detail-Quotation.vue` where present in the current tree; exact active route mapping is defined in `frontend/src/router.js`.
- Contract create/detail pages: `frontend/src/view/pages/contract/Create-Contract.vue`, `frontend/src/view/pages/contract/Detail-Contract.vue`.
- Item actions include load customer/line-item data, save/update, PDF/signature, customer verification, email, and related job/contract navigation where implemented.

## Backend and dependencies

- Controllers: `app/Http/Controllers/QuotationController.php`, `ContractController.php`, `ProposalController.php`, `GeneratePdfController.php`.
- Depends on Customer, Products/Parts, Jobs/Visits, tax/terms, PDF templates, signature data, and email/public verification routes.
- Finance and job creation must be regression-tested after quotation or contract changes.

## Button and feature reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event and the exact Vue source line. PDF and signature behavior is documented in `pdf-and-signature.md`.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/QuotationController.php`
- `__construct()` — line 75
- `updateOrCreate()` — line 88
- `updateOrCreateV1()` — line 350
- `getQuotationV1()` — line 846
- `downloadQuotationV1Pdf()` — line 881
- `getQuotations()` — line 913
- `getAmountByStatus()` — line 1287
- `getQuotation()` — line 1324
- `getDuplicateQuotation()` — line 1420
- `deleteQuotations()` — line 1461
- `deleteQuotation()` — line 1495
- `updateStatusQuotations()` — line 1529
- `getOptions()` — line 1590
- `getAllStatus()` — line 1799
- `updateParticularField()` — line 1819
- `getQuotationsByDays()` — line 1917
- `verifyCustomer()` — line 1978
- `submitCustomer()` — line 2139
- `updateQuotationStatus()` — line 2317
- `downloadPdfOld()` — line 2485
- `downloadPdf()` — line 2518
- `downloadSignaturePdf()` — line 2553
- `streamPdf()` — line 2584
- `getMailConfig()` — line 2612
- `expiryGetMailConfig()` — line 2635
- `signatureLink()` — line 2686
- `sendQuotationMail()` — line 2732
- `expirySendQuotationMail()` — line 2908
- `ProfessionalServiceUpdate()` — line 3043
- `pdfDownloadHistory()` — line 3079
- `updatehistories()` — line 3132
- `import()` — line 3227
- `import()` — line 3479

### `app/Http/Controllers/ContractController.php`
- `__construct()` — line 49
- `updateOrCreate()` — line 62
- `getContracts()` — line 311
- `getContract()` — line 581
- `getDuplicateContract()` — line 635
- `deleteContracts()` — line 676
- `updateStatusContracts()` — line 717
- `getOptions()` — line 769
- `getAllStatus()` — line 1020
- `updateParticularField()` — line 1040
- `getContractsByDays()` — line 1138
- `verifyCustomer()` — line 1199
- `submitCustomer()` — line 1377
- `updateContractStatus()` — line 1504
- `downloadPdf()` — line 1579
- `streamPdf()` — line 1612
- `getMailConfig()` — line 1638
- `sendContractMail()` — line 1660

### `app/Http/Controllers/ProposalController.php`
- `index()` — line 24
- `updateOrCreate()` — line 92
- `delete()` — line 258
- `updateParticularField()` — line 313
- `updateBulkStatus()` — line 385
- `getAllStatus()` — line 466
- `show()` — line 500
- `getOptions()` — line 594

### `app/Http/Controllers/GeneratePdfController.php`
- `service_form()` — line 9

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

