# preventive-maintenance — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Preventive Maintenance depends on Customer/Site, Equipment, Engineer/Team, recurring scheduling, Jobs, Visits, and reminders.

## Listing page actions

### frontend/src/view/pages/preventive-maintanance/ManagePMSchedule.vue

- Line 336: @click="routeToDetail(row.visit.id)"
- Line 510: <v-btn
- Line 520: <v-btn
- Line 628: this.$router.push(
- Line 697: .dispatch(GET, {

### frontend/src/view/pages/preventive-maintanance/PMScheduleView.vue

- Line 159: <v-btn
- Line 230: .dispatch(GET, {

### frontend/src/view/pages/preventive-maintanance/Preventive.vue

- Line 18: <v-btn
- Line 29: <v-btn
- Line 77: <v-btn
- Line 108: <v-btn
- Line 117: <v-btn
- Line 327: <v-btn
- Line 336: <v-btn
- Line 344: <!--  <v-btn
- Line 352: <!--  <v-btn
- Line 358: $router.push(
- Line 371: <v-btn
- Line 379: <v-btn
- Line 416: <v-btn
- Line 930: <v-btn
- Line 938: <v-btn
- Line 1219: this.$router.push(
- Line 1283: .dispatch(QUERY, {
- Line 1339: this.$router.push(this.getDefaultRoute("preventive.create"));
- Line 1388: .dispatch(GET, {
- Line 1408: .dispatch(GET, { url: "customer-list" })
- Line 1435: this.$router.push(
- Line 1443: this.$router.push(
- Line 1532: .dispatch(POST, {
- Line 1548: .dispatch(PATCH, {
- Line 1565: .dispatch(DOWNLOAD, {
- Line 1583: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/preventive-maintanance/PreventiveOld22-03-24.vue

- Line 18: <v-btn
- Line 29: <v-btn
- Line 77: <v-btn
- Line 108: <v-btn
- Line 315: <v-btn
- Line 324: <v-btn
- Line 333: <!--  <v-btn
- Line 341: <!--  <v-btn
- Line 347: $router.push(
- Line 360: <v-btn
- Line 368: <v-btn
- Line 405: <v-btn
- Line 921: <v-btn
- Line 929: <v-btn
- Line 1134: .dispatch(QUERY, {
- Line 1190: this.$router.push(this.getDefaultRoute("preventive.create"));
- Line 1239: .dispatch(GET, {
- Line 1259: .dispatch(GET, { url: "customer-list" })
- Line 1286: this.$router.push(
- Line 1294: this.$router.push(
- Line 1383: .dispatch(POST, {
- Line 1399: .dispatch(PATCH, {
- Line 1416: .dispatch(DOWNLOAD, {
- Line 1434: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/preventive-maintanance/Terminat-Warranty.vue

- Line 127: <v-btn
- Line 138: <v-btn
- Line 160: <v-btn
- Line 168: <v-btn
- Line 270: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 300: .dispatch(requestTYPE, {
- Line 362: .dispatch(GET, { url: "customer-list" })
- Line 373: .dispatch(GET, { url: "equipment-list" })
- Line 384: .dispatch(GET, { url: "preventive-maintanance/options" })

### frontend/src/view/pages/preventive-maintanance/WarrantyOld.vue

- Line 340: <v-btn
- Line 363: <v-btn
- Line 462: $router.push(
- Line 590: <v-btn
- Line 606: <v-btn
- Line 615: <v-btn
- Line 623: <v-btn
- Line 673: <v-btn
- Line 682: <v-btn
- Line 876: this.$router.push(
- Line 884: this.$router.push(
- Line 925: .dispatch(DELETE, {
- Line 948: .dispatch(DELETE, {
- Line 978: .dispatch(GET, { url: "job/list-all" })
- Line 989: .dispatch(GET, { url: "product/warranty" })
- Line 1029: .dispatch(QUERY, {
- Line 1061: .dispatch(GET, { url: "customer-list" })
- Line 1072: .dispatch(GET, { url: "product/get-line-product-service" })
- Line 1088: _this.$router
- Line 1130: _this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/preventive-maintanance/Create-Preventive-Maintenace.vue

- Line 42: <v-btn
- Line 49: <v-btn
- Line 307: @click="show_recurring_job = !show_recurring_job"
- Line 339: @click="show_line_items = !show_line_items"
- Line 370: @click="show_attachments = !show_attachments"
- Line 470: @click="show_line_items = !show_line_items"
- Line 631: <v-btn
- Line 642: <v-btn
- Line 754: this.$store.dispatch(SET_VISIT_LINE_ITEM, []);
- Line 760: this.$store.dispatch(SET_VISIT_LINE_ITEM, []);
- Line 885: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1029: this.$store.dispatch(CREATE_OR_UPDATE, request).then(() => {
- Line 1030: this.$router.replace({
- Line 1047: .dispatch(GET_PREVENTIVE, {
- Line 1054: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1098: .dispatch(QUERY, {
- Line 1136: .dispatch(GET_TICKET, { ticket: this.duplicateTicketId, visit: this.duplicateVisitId })
- Line 1167: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 1168: this.$store.dispatch(CLEAR_PREVENTIVE);
- Line 1171: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 1174: this.$store.dispatch(GET_OPTION);
- Line 1192: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1197: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/preventive-maintanance/Extended-Warranty.vue

- Line 676: <v-btn
- Line 689: <v-btn
- Line 710: <v-btn
- Line 718: <v-btn
- Line 971: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1045: .dispatch(requestTYPE, {
- Line 1083: .dispatch(QUERY, { url: `equipment/${id}` })
- Line 1102: .dispatch(GET, { url: "customer-list" })
- Line 1113: .dispatch(GET, { url: "equipment-list" })
- Line 1142: .dispatch(QUERY, {

### frontend/src/view/pages/preventive-maintanance/Preventive-Detail.vue

- Line 284: <v-btn
- Line 312: <v-btn
- Line 336: <v-btn
- Line 355: <v-btn
- Line 1047: <v-btn
- Line 1093: @click="routeToDetail(row?.visit?.id)"
- Line 1185: <v-btn
- Line 1196: <v-btn
- Line 1261: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1267: .dispatch(requestTYPE, {
- Line 1330: this.$router.push(
- Line 1349: this.$router.push(
- Line 1359: this.$router.push(
- Line 1451: .dispatch(GET, {
- Line 1460: _this.$store.dispatch(SET_BREADCRUMB, [

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

