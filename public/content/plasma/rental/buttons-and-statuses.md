# Rental buttons and statuses

## Detail page actions

`frontend/src/view/pages/rental/Detail-Rental.vue::updateMoreAction()` dispatches the detail-page actions.

| Action | Handler/API | Current effect |
|---|---|---|
| Edit | `editQuotation()` | Opens rental update page; form uses `PATCH /api/rental/{rental}`. |
| Mark approved | `updateStatus('mark_as_approved')` | `PATCH /api/rental/{id}/status`; writes status `6`, approval remark/user/date. |
| Mark rejected | `updateStatus('mark_as_rejected')` | Writes status `4`, rejection metadata, and releases own assets. |
| Mark cancelled | `updateStatus('mark_as_cancelled')` | Also writes status `4` and rejection metadata; no distinct cancelled status is written. |
| Mark terminated | `updateStatus('mark_as_terminated')` | Writes status `7`, termination remark, and releases own assets. |
| Download PDF | `downloadPDFNew()` | Builds a quotation-style PDF URL in the current frontend; verify route before changing it. |
| Send email | `mail_dialog = true` | Opens email dialog; exact active request is **Not verified**. |
| Duplicate/re-quote/convert | `routeToDuplicate()`, `requoteQuotation()`, `routeToJob()`, `routeToInvoice()` | Legacy/conditional flows; exact current request mapping is **Not verified**. |

The UI has handlers for pending/accepted/sent/unapproved actions, but `RentalController::updateRentalStatus()` validates only `mark_as_terminated`, `mark_as_rejected`, `mark_as_approved`, and `mark_as_cancelled`. Unsupported action names return 422.

## Status discrepancy

The rental migration comments, `Rental` model comments, `frontend/src/view/pages/rental/constants.js`, and scheduler use different status meanings. The scheduler writes `10` for closed; the frontend maps `7` to terminated and `10` to closed. Confirm the target environment before changing status logic.

## Status side effects

Status rejection, cancellation, termination, and scheduled closure can release own-asset allocations. Approval does not release assets. Item return does not change the rental header status.

