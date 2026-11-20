# invoice-payment — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Invoices and Payments depend on Customer, Jobs, line items, tax, Products/Parts, Credit Notes, recurring schedules, PDF, and email.

## Listing page actions

### frontend/src/view/pages/invoice/Invoice.vue

- Line 36: <v-btn
- Line 68: <v-btn
- Line 118: <v-btn
- Line 122: v-on:click="$router.push(getDefaultRoute('invoice.create'))"
- Line 127: <v-btn
- Line 136: <v-btn
- Line 140: $router.push(
- Line 156: <v-btn
- Line 210: <v-btn
- Line 260: <v-btn
- Line 932: <v-btn icon small @click="searchDialog = false">
- Line 1019: <v-btn
- Line 1029: <v-btn
- Line 1115: <v-btn
- Line 1124: <v-btn
- Line 1350: this.$router.push({
- Line 1432: _this.$router.push(
- Line 1459: this.$router.push(
- Line 1521: .dispatch(PATCH, {
- Line 1538: .dispatch(DOWNLOAD, {
- Line 1554: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Invoiceold.vue

- Line 36: <v-btn
- Line 68: <v-btn
- Line 119: <v-btn
- Line 122: v-on:click="$router.push(getDefaultRoute('invoice.create'))"
- Line 128: <v-btn
- Line 136: <v-btn
- Line 139: $router.push(
- Line 155: <v-btn
- Line 208: <v-btn
- Line 256: <v-btn
- Line 795: <v-btn
- Line 803: <v-btn
- Line 1097: _this.$router.push(
- Line 1124: this.$router.push(
- Line 1186: .dispatch(PATCH, {
- Line 1203: .dispatch(DOWNLOAD, {
- Line 1219: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/RecurringInvoiceSchedule.vue

- Line 19: <v-btn
- Line 513: this.$store.dispatch(UPDATE_ERROR_MESSAGE_OCC, customMessageOcc);
- Line 516: this.$store.dispatch(UPDATE_ERROR_MESSAGE_OCC, customMessageOcc);
- Line 555: this.$store.dispatch(UPDATE_ERROR_MESSAGE, customMessage);
- Line 558: this.$store.dispatch(UPDATE_ERROR_MESSAGE, customMessage);
- Line 596: this.$store.dispatch(GET_RECURRING_DATE);
- Line 734: this.$store.dispatch(UPDATE_DEFAULT_DATE, "recurring");

### frontend/src/view/pages/payment/Payment.vue

- Line 34: <v-btn
- Line 65: <v-btn
- Line 84: <v-btn
- Line 93: <v-btn
- Line 101: <v-btn
- Line 104: $router.push(
- Line 120: <v-btn
- Line 174: <v-btn
- Line 221: <v-btn
- Line 615: <v-btn
- Line 623: <v-btn
- Line 747: .dispatch(DOWNLOAD, {
- Line 762: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/credit-note/Credit-Note.vue

- Line 36: <v-btn
- Line 67: <v-btn
- Line 120: <v-btn
- Line 129: <v-btn
- Line 137: <v-btn
- Line 140: $router.push(
- Line 156: <v-btn
- Line 209: <v-btn
- Line 256: <v-btn
- Line 804: <v-btn
- Line 812: <v-btn
- Line 1016: this.$router.push(
- Line 1092: .dispatch(PATCH, {
- Line 1109: .dispatch(DOWNLOAD, {
- Line 1125: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/credit-note/Credit-Note-Create.vue

- Line 31: <v-btn
- Line 39: <v-btn
- Line 637: const credit = await this.$store.dispatch(REQUEST_TYPE, {
- Line 684: this.$router.push(
- Line 697: .dispatch(QUERY, {
- Line 744: .dispatch(QUERY, {
- Line 796: .dispatch(GET, { url: "credit-note/" + this.creditId })
- Line 857: this.$store.dispatch(SET_BREADCRUMB, [
- Line 873: .dispatch(QUERY, {
- Line 940: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/credit-note/Credit-Note-Detail.vue

- Line 31: <v-btn
- Line 47: <v-btn
- Line 74: <v-btn
- Line 501: <v-btn
- Line 509: <v-btn
- Line 590: this.$router.push(
- Line 630: .dispatch(PATCH, {
- Line 653: .dispatch(QUERY, {
- Line 701: .dispatch(GET, { url: "credit-note/" + this.credit_id })
- Line 711: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Create-Invoice.vue

- Line 41: <v-btn
- Line 48: <v-btn
- Line 65: <v-btn
- Line 295: <v-btn
- Line 314: <v-btn
- Line 872: <v-btn
- Line 1173: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1315: .dispatch(requestType, { url: requestURL, data: request })
- Line 1318: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 1319: this.$store.dispatch(RESET_CREATE_STATE);
- Line 1320: this.$store.dispatch(CLEAR_LINE_ITEM);
- Line 1324: this.$router.push(this.getDefaultRoute("invoice"));
- Line 1326: this.$router.push(
- Line 1342: .dispatch(QUERY, {
- Line 1363: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1369: this.$store.dispatch(
- Line 1373: this.$store.dispatch(
- Line 1504: this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 1521: this.$store.dispatch(
- Line 1525: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1574: this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 1586: this.$store.dispatch(
- Line 1611: this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 1623: this.$store.dispatch(
- Line 1693: this.$store.dispatch(GET_CUSTOMER_RELATED, {
- Line 1703: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1708: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1715: this.$store.dispatch(CLEAR_INVOICE);
- Line 1716: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 1717: this.$store.dispatch(RESET_CREATE_STATE);
- Line 1718: this.$store.dispatch(CLEAR_LINE_ITEM);
- Line 1734: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 1735: this.$store.dispatch(RESET_CREATE_STATE);
- Line 1736: this.$store.dispatch(CLEAR_LINE_ITEM);

### frontend/src/view/pages/invoice/Create-Invoice-Backup.vue

- Line 31: <v-btn
- Line 39: <v-btn
- Line 48: <!-- <v-btn
- Line 406: <v-btn
- Line 675: this.$router.push(
- Line 727: this.$router
- Line 826: const invoice = await _this.$store.dispatch(REQUEST_TYPE, {
- Line 869: _this.$router.push(
- Line 882: .dispatch(QUERY, {
- Line 897: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1174: .dispatch(QUERY, {
- Line 1265: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Create-Payment.vue

- Line 185: <v-btn
- Line 192: <v-btn
- Line 317: .dispatch(POST, { url: "payment", data: formData })
- Line 334: .dispatch(QUERY, {

### frontend/src/view/pages/invoice/Create-Payment16-03-2024.vue

- Line 162: <v-btn
- Line 169: <v-btn
- Line 277: .dispatch(POST, { url: "bulk-invoice-payment", data: formData })
- Line 294: .dispatch(QUERY, {
- Line 314: .dispatch(GET, { url: "invoice/" + this.invoiceId })
- Line 324: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Create-Payment-Credit-Note.vue

- Line 189: <v-btn
- Line 196: <v-btn
- Line 321: .dispatch(POST, { url: "payment-credit-notes", data: formData })
- Line 338: .dispatch(QUERY, {

### frontend/src/view/pages/invoice/Create-Payment-Invoices.vue

- Line 198: <v-btn
- Line 205: <v-btn
- Line 315: .dispatch(POST, { url: "bulk-invoice-payment", data: formData })
- Line 332: .dispatch(QUERY, {
- Line 362: .dispatch(GET, { url: "sent-invoice-list-status/" + this.customer.id })
- Line 380: .dispatch(GET, { url: "invoice/" + this.invoiceId })
- Line 390: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Detail-Invoice.vue

- Line 351: <v-btn
- Line 374: <v-btn
- Line 397: <v-btn
- Line 412: <v-btn
- Line 433: <v-btn
- Line 462: <v-btn
- Line 475: <v-btn v-on:click="goBack()" depressed class="custom-bold-button"
- Line 1373: <v-btn
- Line 1390: <v-btn
- Line 1398: <v-btn
- Line 1446: <v-btn
- Line 1453: <v-btn
- Line 1548: .dispatch(DELETE, { url: `invoice/${this.dbInvoice?.id}` })
- Line 1551: this.$router.push(this.getDefaultRoute("invoice"));
- Line 1561: this.$router.push(
- Line 1568: this.$router.push(
- Line 1575: this.$router.push(
- Line 1647: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1669: .dispatch(PATCH, {
- Line 1826: this.$router.push(
- Line 1833: this.$router.push(
- Line 1840: this.$router.push(
- Line 1861: .dispatch(GET, { url: "invoice-v1/" + this.invoiceId })
- Line 1865: this.$store.dispatch(SET_VIEW_CALCULATION, {
- Line 1883: this.$store.dispatch(SET_VIEW_LINE_ITEM, data.line_item);
- Line 1884: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Detail-Invoice-Backup.vue

- Line 22: <v-btn
- Line 39: <v-btn
- Line 61: <v-btn
- Line 89: <v-btn
- Line 630: this.$router.push(
- Line 640: .dispatch(QUERY, {
- Line 728: .dispatch(PATCH, {
- Line 757: this.$router.push(
- Line 775: this.$router.push(
- Line 793: this.$router.push(
- Line 809: this.$router.push(
- Line 825: this.$router.push(
- Line 842: .dispatch(GET, { url: "invoice/" + this.invoiceId })
- Line 852: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/invoice/Detail-Invoiceuiu.vue

- Line 34: <v-btn
- Line 48: <v-btn
- Line 70: <v-btn
- Line 103: <v-btn
- Line 116: <v-btn v-on:click="goBack()" depressed class="custom-bold-button"
- Line 695: <v-btn
- Line 711: <v-btn
- Line 718: <v-btn
- Line 801: this.$router.push(
- Line 808: this.$router.push(
- Line 815: this.$router.push(
- Line 865: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 886: .dispatch(PATCH, {
- Line 1021: this.$router.push(
- Line 1028: this.$router.push(
- Line 1035: this.$router.push(
- Line 1056: .dispatch(GET, { url: "invoice-v1/" + this.invoiceId })
- Line 1060: this.$store.dispatch(SET_VIEW_CALCULATION, {
- Line 1078: this.$store.dispatch(SET_VIEW_LINE_ITEM, data.line_item);
- Line 1079: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/payment/Create-Payment.vue

- Line 29: <v-btn
- Line 36: <v-btn
- Line 53: <v-btn
- Line 336: <v-btn
- Line 439: <v-btn

### frontend/src/view/pages/payment/Detail-Payment.vue

- Line 28: <v-btn
- Line 57: <v-btn
- Line 195: $router.push(
- Line 563: <v-btn
- Line 566: @click="paymentDatePicker = false"

### frontend/src/view/pages/payment/Detail-Payment-Credit.vue

- Line 28: <v-btn
- Line 57: <v-btn
- Line 195: $router.push(
- Line 563: <v-btn
- Line 566: @click="paymentDatePicker = false"

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

