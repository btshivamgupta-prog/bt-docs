# Jobs, Tickets, Visits, Delivery, and Assessment

TicketController is the main field-service workflow controller. TicketDetailController and Ticket/VisitController provide detail, mobile, listing, calendar, review, timer, and PDF operations.

Frontend pages are under job, delivery-job, visit, service, assessment, delivery, follow-up, and service-report. Validation is under app/Http/Requests/Ticket.

Workflow: ticket -> visit -> engineer/team/driver assignment -> schedule/reminder/calendar -> check-in/timer -> forms/notes/files/parts -> checkout/closer/status -> PDF, invoice, review, and history.
## Listing page feature

The listing page is the collection/table entry point for this module. The verified Vue files below contain the list loading, search/filter, row navigation, export/download, status, and dialog actions that are documented line-by-line in `listing-and-item-actions.md`. A feature is only considered present when the source action inventory shows it.

### Listing page source files
- `frontend/src/view/pages/assessment/Assessment.vue`
- `frontend/src/view/pages/assessment/Assessment-Listing-Template.vue`
- `frontend/src/view/pages/assessment/components/Description.vue`
- `frontend/src/view/pages/assessment/components/TeamMember.vue`
- `frontend/src/view/pages/assessment/components/TermsAndConditions.vue`
- `frontend/src/view/pages/assessment/Follow-Up.vue`
- `frontend/src/view/pages/delivery/components/Description.vue`
- `frontend/src/view/pages/delivery/components/TeamMember.vue`
- `frontend/src/view/pages/delivery/components/TermsAndConditions.vue`
- `frontend/src/view/pages/delivery/Follow-Up.vue`
- `frontend/src/view/pages/delivery/Visit.vue`
- `frontend/src/view/pages/delivery/Visit-Listing-Template.vue`
- `frontend/src/view/pages/delivery-job/Job.vue`
- `frontend/src/view/pages/delivery-job/partials/Add-Visit-Dialog.vue`
- `frontend/src/view/pages/delivery-job/partials/Add-Visit-Note-Dialog.vue`
- `frontend/src/view/pages/delivery-job/partials/Add-Visit-Team-Dialog.vue`
- `frontend/src/view/pages/delivery-job/partials/Job-Schedule-Team.vue`
- `frontend/src/view/pages/delivery-job/partials/Job-Schedule-Team-Body.vue`
- `frontend/src/view/pages/delivery-job/partials/Job-Schedule-Team-Header.vue`
- `frontend/src/view/pages/delivery-job/partials/One-Off-Schedule.vue`
- `frontend/src/view/pages/delivery-job/partials/One-Off-Schedule-Body.vue`
- `frontend/src/view/pages/delivery-job/partials/One-Off-Schedule-Header.vue`
- `frontend/src/view/pages/delivery-job/partials/Recurring-Pattern-Template.vue`
- `frontend/src/view/pages/delivery-job/partials/Recurring-Schedule.vue`
- `frontend/src/view/pages/delivery-job/partials/Recurring-Schedule-Body.vue`
- `frontend/src/view/pages/delivery-job/partials/Recurring-Schedule-Header.vue`
- `frontend/src/view/pages/delivery-job/partials/Select-Visit-Job.vue`
- `frontend/src/view/pages/delivery-job/partials/Ticket-Visit-Reminder.vue`
- `frontend/src/view/pages/delivery-job/partials/Visit-History.vue`
- `frontend/src/view/pages/delivery-job/partials/Visit-Timestamp.vue`
- `frontend/src/view/pages/follow-up/Dialogcomp.vue`
- `frontend/src/view/pages/follow-up/Follow-ups.vue`
- `frontend/src/view/pages/follow-up/Tabledata.vue`
- `frontend/src/view/pages/job/Job.vue`
- `frontend/src/view/pages/job/partials/Add-Visit-Dialog.vue`
- `frontend/src/view/pages/job/partials/Add-Visit-Note-Dialog.vue`
- `frontend/src/view/pages/job/partials/Add-Visit-Team-Dialog.vue`
- `frontend/src/view/pages/job/partials/Job-List.vue`
- `frontend/src/view/pages/job/partials/Job-Schedule-Team.vue`
- `frontend/src/view/pages/job/partials/Job-Schedule-Team-Body.vue`
- `frontend/src/view/pages/job/partials/Job-Schedule-Team-Header.vue`
- `frontend/src/view/pages/job/partials/Line-Item-V1.vue`
- `frontend/src/view/pages/job/partials/Line-Item-V2.vue`
- `frontend/src/view/pages/job/partials/One-Off-Schedule.vue`
- `frontend/src/view/pages/job/partials/One-Off-Schedule-Body.vue`
- `frontend/src/view/pages/job/partials/One-Off-Schedule-Header.vue`
- `frontend/src/view/pages/job/partials/Recurring-Pattern-Template.vue`
- `frontend/src/view/pages/job/partials/Recurring-Schedule.vue`
- `frontend/src/view/pages/job/partials/Recurring-Schedule-Body.vue`
- `frontend/src/view/pages/job/partials/Recurring-Schedule-Header.vue`
- `frontend/src/view/pages/job/partials/Select-Visit-Job.vue`
- `frontend/src/view/pages/job/partials/Ticket-Visit-Reminder.vue`
- `frontend/src/view/pages/job/partials/Visit-History.vue`
- `frontend/src/view/pages/job/partials/Visit-Timestamp.vue`
- `frontend/src/view/pages/job/partials/Visit-trips.vue`
- `frontend/src/view/pages/job/partials/Visit-trips-old.vue`
- `frontend/src/view/pages/job/visit-partials/Recurring-Schedule.vue`
- `frontend/src/view/pages/job/visit-partials/Recurring-Schedule-Dialog.vue`
- `frontend/src/view/pages/job/visit-partials/Schedule.vue`
- `frontend/src/view/pages/job/visit-partials/Team.vue`
- `frontend/src/view/pages/service/search-template.vue`
- `frontend/src/view/pages/service/Service.vue`
- `frontend/src/view/pages/service-form/genic-teams/Service-Report.vue`
- `frontend/src/view/pages/service-form/genic-teams/Work-Order.vue`
- `frontend/src/view/pages/service-report/Report-Services.vue`
- `frontend/src/view/pages/service-report/Service-Listing-Template.vue`
- `frontend/src/view/pages/service-report/ServiceReport.vue`
- `frontend/src/view/pages/visit/components/Description.vue`
- `frontend/src/view/pages/visit/components/TeamMember.vue`
- `frontend/src/view/pages/visit/components/TermsAndConditions.vue`
- `frontend/src/view/pages/visit/Follow-Up.vue`
- `frontend/src/view/pages/visit/Visit.vue`
- `frontend/src/view/pages/visit/Visit-Listing-Template.vue`
- `frontend/src/view/pages/visit/Visit-Listing-TemplateBackup.vue`

### Listing actions to understand before changing code
- Search/filter controls change the query or local table state; verify the request parameters before changing filters.
- Create/add controls navigate to a create page or open a dialog; verify the route and required parent ID.
- Row/detail controls navigate to the item page; verify route parameters and permission guards.
- Status, delete, bulk, export, and download controls must be traced to their exact handler because side effects differ by module.

## Item/detail page feature

The item page loads one record, displays related data, and provides create/edit/save/status/document actions where implemented. The source files below are the verified item/detail/create/edit surface.

### Item/detail source files
- `frontend/src/view/pages/assessment/Assessment-Detail.vue`
- `frontend/src/view/pages/assessment/components/BasicInformation.vue`
- `frontend/src/view/pages/assessment/components/ClientInformation.vue`
- `frontend/src/view/pages/assessment/components/ClientInformationNew.vue`
- `frontend/src/view/pages/assessment/components/InternalNotesAndAttachments.vue`
- `frontend/src/view/pages/assessment/components/ServiceFormDetail.vue`
- `frontend/src/view/pages/assessment/components/TicketCloserDetail.vue`
- `frontend/src/view/pages/assessment/Create-Assessment.vue`
- `frontend/src/view/pages/assessment/Visit-Detail-old.vue`
- `frontend/src/view/pages/delivery/components/BasicInformation.vue`
- `frontend/src/view/pages/delivery/components/ClientInformation.vue`
- `frontend/src/view/pages/delivery/components/ClientInformationNew.vue`
- `frontend/src/view/pages/delivery/components/InternalNotesAndAttachments.vue`
- `frontend/src/view/pages/delivery/components/ServiceFormDetail.vue`
- `frontend/src/view/pages/delivery/components/TicketCloserDetail.vue`
- `frontend/src/view/pages/delivery/Visit-Detail - Copy.vue`
- `frontend/src/view/pages/delivery/Visit-Detail.vue`
- `frontend/src/view/pages/delivery/Visit-Detail-old.vue`
- `frontend/src/view/pages/delivery-job/Create-Job - Copy.vue`
- `frontend/src/view/pages/delivery-job/Create-Job.vue`
- `frontend/src/view/pages/delivery-job/Detail-Job.vue`
- `frontend/src/view/pages/delivery-job/partials/Closer-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Create-Invoice-Reminder.vue`
- `frontend/src/view/pages/delivery-job/partials/Create-Service-Form.vue`
- `frontend/src/view/pages/delivery-job/partials/Create-Ticket-Closer.vue`
- `frontend/src/view/pages/delivery-job/partials/Create-Ticket-Reminder.vue`
- `frontend/src/view/pages/delivery-job/partials/Create-Time-Tracking.vue`
- `frontend/src/view/pages/delivery-job/partials/Invoice-Reminder-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Reminder-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Service-Form-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Single-Contract-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Single-Leave-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Single-Quotation-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Single-Visit-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Team-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Ticket-Attachment-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Ticket-Closer-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Time-Tracking-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Update-follow-up.vue`
- `frontend/src/view/pages/delivery-job/partials/Update-Service-Form.vue`
- `frontend/src/view/pages/delivery-job/partials/Visit-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Visit-follow-up-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Visit-Notes-Detail.vue`
- `frontend/src/view/pages/delivery-job/partials/Visit-Team-Detail.vue`
- `frontend/src/view/pages/job/Create-Job - BACKUP v1.vue`
- `frontend/src/view/pages/job/Create-Job - Copy.vue`
- `frontend/src/view/pages/job/Create-Job.vue`
- `frontend/src/view/pages/job/Create-JobBckup-23-03-24.vue`
- `frontend/src/view/pages/job/Create-Job-old-gaia.vue`
- `frontend/src/view/pages/job/Detail-Job.vue`
- `frontend/src/view/pages/job/partials/Closer-Detail.vue`
- `frontend/src/view/pages/job/partials/Create-Invoice-Reminder.vue`
- `frontend/src/view/pages/job/partials/Create-Service-Form.vue`
- `frontend/src/view/pages/job/partials/Create-Ticket-Closer.vue`
- `frontend/src/view/pages/job/partials/Create-Ticket-Reminder.vue`
- `frontend/src/view/pages/job/partials/Create-Time-Tracking.vue`
- `frontend/src/view/pages/job/partials/Invoice-Reminder-Detail.vue`
- `frontend/src/view/pages/job/partials/Reminder-Detail.vue`
- `frontend/src/view/pages/job/partials/Service-Form-Detail.vue`
- `frontend/src/view/pages/job/partials/Single-Contract-Detail.vue`
- `frontend/src/view/pages/job/partials/Single-Leave-Detail.vue`
- `frontend/src/view/pages/job/partials/Single-Project-Detail.vue`
- `frontend/src/view/pages/job/partials/Single-Quotation-Detail.vue`
- `frontend/src/view/pages/job/partials/Single-Visit-Detail.vue`
- `frontend/src/view/pages/job/partials/Team-Detail.vue`
- `frontend/src/view/pages/job/partials/Ticket-Attachment-Detail.vue`
- `frontend/src/view/pages/job/partials/Ticket-Closer-Detail.vue`
- `frontend/src/view/pages/job/partials/Time-Tracking-Detail.vue`
- `frontend/src/view/pages/job/partials/Update-follow-up.vue`
- `frontend/src/view/pages/job/partials/Update-Service-Form.vue`
- `frontend/src/view/pages/job/partials/Visit-Detail.vue`
- `frontend/src/view/pages/job/partials/Visit-follow-up-Detail.vue`
- `frontend/src/view/pages/job/partials/Visit-Notes-Detail.vue`
- `frontend/src/view/pages/job/partials/Visit-Team-Detail.vue`
- `frontend/src/view/pages/service/Create-Service.vue`
- `frontend/src/view/pages/service/detail/Overview.vue`
- `frontend/src/view/pages/service/Detail-Service.vue`
- `frontend/src/view/pages/service/partials/Create.vue`
- `frontend/src/view/pages/service-form/Service-Form-Template.vue`
- `frontend/src/view/pages/visit/components/BasicInformation.vue`
- `frontend/src/view/pages/visit/components/ClientInformation.vue`
- `frontend/src/view/pages/visit/components/ClientInformationNew.vue`
- `frontend/src/view/pages/visit/components/InternalNotesAndAttachments.vue`
- `frontend/src/view/pages/visit/components/ServiceFormDetail.vue`
- `frontend/src/view/pages/visit/components/TicketCloserDetail.vue`
- `frontend/src/view/pages/visit/Visit-Detail - Copy.vue`
- `frontend/src/view/pages/visit/Visit-Detail.vue`
- `frontend/src/view/pages/visit/Visit-Detail-old.vue`

### Item actions to understand before changing code
- Load and option calls define which related records and dropdown values are required.
- Save/update actions define validation, persistence, status changes, and redirects.
- Back/edit/status/PDF/email/download actions can have navigation or external side effects.
- Related tabs and dialogs may write to other modules; check the dependency list and backend route before changing them.

## Button and dependency reference

Use [`listing-and-item-actions.md`](./listing-and-item-actions.md) for every source-detected button/event/navigation line, exact Vue path, line number, and the action-tracing procedure. The companion document is the authoritative button inventory; labels rendered only through shared components or translation keys are marked Not verified.
## Controller feature map

The following methods are the controller-level entry points verified for this module. Method names are listed so a developer can trace each UI action to the backend implementation without reading unrelated controllers.

### `app/Http/Controllers/TicketController.php`
- `updateOrCreate()` — line 122
- `updateOrCreateDelivery()` — line 401
- `updateOrCreateVisit()` — line 649
- `updateOrCreateNote()` — line 877
- `updateOrCreateVisitEngineerMobile()` — line 963
- `updateOrCreateVisitEngineer()` — line 1081
- `updateOrCreateVisitEngineerDelivery()` — line 1198
- `reassignDriverAndReschdule()` — line 1301
- `updateDailyRecurrence()` — line 1369
- `updateWeeklyRecurrence()` — line 1481
- `updateMonthlyRecurrence()` — line 1591
- `getRecurrence()` — line 1707
- `allocateEngineers()` — line 1808
- `getVisitLineItemV1()` — line 1915
- `getVisitLineItemDetails()` — line 2151
- `updateOrCreateFileV1()` — line 2244
- `updateOrCreateV1()` — line 2330
- `getTickets()` — line 2585
- `getTicket()` — line 2911
- `getVisits()` — line 3021
- `deleteTickets()` — line 3041
- `updateStatusTickets()` — line 3080
- `getTicketTypes()` — line 3124
- `getOptions()` — line 3137
- `getAvailableEngineers()` — line 3662
- `getAvailableDrivers()` — line 3784
- `getAvailableTeam()` — line 3916
- `getAvailableTeamEngineers()` — line 3930
- `getAvailableTeamDeliveryEngineers()` — line 3987
- `removeEngineer()` — line 4044
- `removeTicketEngineer()` — line 4071
- `removeVisitEngineer()` — line 4116
- `getAllStatus()` — line 4156
- `getVisitNotes()` — line 4175
- `getVisit()` — line 4190
- `deleteVisit()` — line 4212
- `removeTicketReminder()` — line 4242
- `updateVisitStatus()` — line 4278
- `rescheduleJobVisit()` — line 4394
- `reAllocateEngineer()` — line 4467
- `rescheduleVisit()` — line 4528
- `updateFutureVisits()` — line 4607
- `getServiceForms()` — line 4705
- `createServiceForm()` — line 4719
- `createInvoiceReminder()` — line 4839
- `createAttachments()` — line 4884
- `deleteServiceForm()` — line 4967
- `deleteServiceFormByMobile()` — line 5029
- `updateServiceForm()` — line 5089
- `CreateTimeSheet()` — line 5269
- `getRunningVisitTimer()` — line 5334
- `StartVisitTimer()` — line 5358
- `EndVisitTimer()` — line 5588
- `GetTimeTrackings()` — line 5727
- `GetTimeTrackingByIds()` — line 5770
- `CreateTicketCloser()` — line 5811
- `CreateTicketClosertestin()` — line 6226
- `CreateTicketHoldStatus()` — line 6612
- `CreateTicketHoldandCheckout()` — line 6780
- `GetTicketClosers()` — line 6935
- `GetTicketClosersNew()` — line 6967
- `GetTicketCloser()` — line 7035
- `updateParticularField()` — line 7170
- `getCalendar()` — line 7220
- `GetVisitReminders()` — line 7396
- `updateOrCreateVisitReminder()` — line 7462
- `getTicketCountByStatus()` — line 7537
- `getTicketDataByDays()` — line 7574
- `getPriorityByGraph()` — line 7637
- `getIssuesByGraph()` — line 7661
- `getAvailableServiceForms()` — line 7686
- `downloadPdf()` — line 7706
- `streamPdf()` — line 7828
- `downloadSchedule()` — line 7950
- `updatecheckout()` — line 7970
- `updatecheckin()` — line 8094
- `getCheckinCheckoutTimestamp()` — line 8186
- `updateSingleReminderStatus()` — line 8252
- `getfollowupRemarks()` — line 8279
- `closeFollowUp()` — line 8303
- `updateStatusFollowUp()` — line 8329
- `updateorCreateFollowup()` — line 8360
- `updateorCreateFollowupnew()` — line 8497
- `getQuotationCalendar()` — line 8624
- `getContractsCalendar()` — line 8952
- `getPopupVisit()` — line 9075
- `getPopupQuotation()` — line 9122
- `getPopupContract()` — line 9218
- `getMailConfigVisit()` — line 9270
- `sendVisitMail()` — line 9298
- `allCalender()` — line 9407
- `getUpdateJob()` — line 10631
- `getUpdateDelivery()` — line 10799
- `calenderdata()` — line 10825
- `engineerAssign()` — line 10912
- `reassignBulkReschduleDelivery()` — line 10973
- `reassignBulkReschduleDelivery12()` — line 11037
- `serviceFormPreview()` — line 11133
- `getOptionV1()` — line 11161
- `getAvailableEngineerV1()` — line 11196
- `updateOrCreateTV1Old260324()` — line 11511
- `updateOrCreateTV1()` — line 12158
- `getTicketV1()` — line 12809
- `getAvailableMobileEngineersOld()` — line 13068
- `getAvailableMobileEngineers()` — line 13190
- `updateTicketVisitLocation()` — line 13332
- `updateVisitStampOld()` — line 13408
- `updateVisitStamp()` — line 13476
- `getTripTimeStamp()` — line 13545
- `getVisitAddress()` — line 13569
- `updateServiceFormManualStamp()` — line 13595
- `getAllVisitsInternal()` — line 13648
- `getRelatedSkill()` — line 13715
- `verifyCustomerReview()` — line 13806
- `visitForceClosed()` — line 13858

### `app/Http/Controllers/Ticket/TicketDetailController.php`
- `getTicket()` — line 51
- `getTicketLineItems()` — line 192
- `getTicketNotes()` — line 265
- `getTicketEngineers()` — line 308
- `getTicketRecurrence()` — line 415
- `getTicketDocuments()` — line 487
- `getTicketVisit()` — line 592
- `getTicketMobileVisit()` — line 692
- `getTicketInvoiceReminders()` — line 736
- `getTicketServiceForms()` — line 762
- `getTicketServiceForm()` — line 929
- `downloadTicketServiceForm()` — line 961
- `linkTicketServiceForm()` — line 1153
- `downloadTicketServiceExcelForm()` — line 1306
- `linkTicketServiceExcelForm()` — line 1419
- `getTicketTimesheets()` — line 1540
- `getTicketClosers()` — line 1643
- `getFilterTickets()` — line 1722
- `getVisitForFilter()` — line 1747
- `getUnassignedJob()` — line 1777
- `getVisitTrips()` — line 1833
- `getVisitTripById()` — line 1959
- `getVisitTripByIdEnginer()` — line 1987

### `app/Http/Controllers/Ticket/VisitController.php`
- `__construct()` — line 57
- `insertRatingVisit()` — line 62
- `getVisits()` — line 102
- `getVisitss()` — line 234
- `getTicketMobileVisit()` — line 339
- `getVisitCounts()` — line 395
- `getDeliveryCounts()` — line 432
- `deliveryCountByDate()` — line 472
- `visitCountByDate()` — line 530
- `deliveryCountByDateAmit()` — line 598
- `getDeliveryDetail()` — line 666
- `getVisitHistory()` — line 834
- `getVisitDetailold()` — line 905
- `getVisitDetail()` — line 988
- `getVisitDetailNew()` — line 1133
- `getVisitRunning()` — line 1386
- `stopAllTimers()` — line 1416
- `stopSelectedTimers()` — line 1449
- `updateVisit()` — line 1493
- `getCurrentUserRunningTimesheet()` — line 1542
- `patchResumeTimesheet()` — line 1564
- `patchCurrentUserRunningTimesheet()` — line 1698
- `getAllStatus()` — line 1717
- `getAllDeliveryStatus()` — line 2145
- `getDeliveryStatus()` — line 2497
- `getEngineerStatusByDate()` — line 2542
- `getVisitBasicDetails()` — line 2596
- `getVisitsCalendar()` — line 2637
- `downloadCloserPDF()` — line 2693
- `downloadServiceFormPDF()` — line 2703
- `getUnassignedVisit()` — line 2714
- `markAsCancel()` — line 2727
- `deleteVisit()` — line 2770
- `getVisitStutusCheck()` — line 2811
- `assignEngineerByDate()` — line 2857
- `updateVisitStatus()` — line 2983
- `failedDelivery()` — line 3168
- `getShareServiceReport()` — line 3277
- `postShareServiceReport()` — line 3305
- `deleteForms()` — line 3318
- `sendLinkRatingVisit()` — line 3348
- `submitVisitReview()` — line 3395
- `getVisitListingV1()` — line 3447
- `mergeOfflineMode()` — line 3520
- `mergeOfflineModetest()` — line 3536

### `app/Http/Controllers/ServiceFormController.php`
- `getServiceForm()` — line 11
- `updateServiceForm()` — line 24

### `app/Http/Controllers/ServiceFormTemplateController.php`
- `updateOrcreate()` — line 17
- `getServiceFormTemplates()` — line 187
- `getServiceFormTemplate()` — line 248
- `getOptions()` — line 285
- `updateServiceFormTemplateStatus()` — line 325

### `app/Http/Controllers/LineItemController.php`
- `updateOrCreate()` — line 52
- `getLineItems()` — line 381
- `getNewLineItems()` — line 532
- `getLineItem()` — line 649
- `deleteLineItem()` — line 679
- `updateLineItem()` — line 755
- `calculateTotalAmount()` — line 811
- `testItem()` — line 849
- `getDeliveryOrderLineItem()` — line 863
- `getDeliveryOrderByDriver()` — line 900
- `getPendingLineItem()` — line 938
- `getDeliveryDetailLineItem()` — line 974
- `getReceviedLineItem()` — line 1007
- `getLineItemDetail()` — line 1043
- `createLineItemHistory()` — line 1075
- `deleteLineItemMobile()` — line 1333
- `getSellRentalItems()` — line 1371

### `app/Http/Controllers/GeneratePdfController.php`
- `service_form()` — line 9

### Controller tracing rule

For a button change, trace the Vue handler to its API URL, then to the route in `routes/api.php`, then to the controller method above. Check request validation, authorization, model writes, status transitions, jobs, notifications, PDF/export generation, and error responses before modifying behavior.

