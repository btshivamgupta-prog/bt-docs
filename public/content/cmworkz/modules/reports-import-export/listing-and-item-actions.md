# reports-import-export — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Reporting and exports consume module query data; imports write Customer/Product/Equipment and other master records.

## Listing page actions

### frontend/src/view/pages/report/Report.vue

- Line 853: this.$router.push(
- Line 862: .dispatch(PATCH, {
- Line 905: .dispatch(GET, {
- Line 921: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/report/ReportListing.vue

- Line 18: <v-btn
- Line 30: <v-btn
- Line 80: <v-btn
- Line 111: <v-btn
- Line 205: <v-btn
- Line 213: <v-btn
- Line 222: <!-- <v-btn
- Line 225: $router.push(
- Line 246: <v-btn
- Line 254: <v-btn
- Line 307: <v-btn
- Line 878: <v-btn
- Line 887: <v-btn
- Line 910: <v-btn
- Line 942: <v-btn
- Line 950: <v-btn
- Line 1146: .dispatch(GET, { url: "listing/all" })
- Line 1216: .dispatch(PATCH, {
- Line 1294: .dispatch(POST, {
- Line 1312: .dispatch(DOWNLOAD, {
- Line 1328: this.$store.dispatch(SET_LOCAL_DB).then(() => {
- Line 1332: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/report/Report-services.vue

- Line 31: <v-btn
- Line 63: <v-btn
- Line 157: <v-btn
- Line 166: <!-- <v-btn
- Line 174: <!-- <v-btn
- Line 177: $router.push(
- Line 348: <v-btn
- Line 403: <v-btn
- Line 995: <v-btn
- Line 1017: <v-btn
- Line 1099: <v-btn
- Line 1108: <v-btn
- Line 1133: <v-btn
- Line 1166: <v-btn
- Line 1174: <v-btn
- Line 1251: <v-btn
- Line 1435: .dispatch(QUERY, {
- Line 1463: .dispatch(QUERY, {
- Line 1562: .dispatch(QUERY, {
- Line 1653: .dispatch(QUERY, {
- Line 1676: .dispatch(PATCH, {
- Line 1698: .dispatch(PATCH, {
- Line 1747: .dispatch(POST, {
- Line 1766: .dispatch(DOWNLOAD, {
- Line 1782: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/report/Report-Detail.vue

- Line 30: <v-btn
- Line 39: <v-btn
- Line 48: <v-btn
- Line 245: <v-btn
- Line 254: <v-btn
- Line 335: .dispatch(DOWNLOAD, {
- Line 402: _this.$router
- Line 430: .dispatch(QUERY, {
- Line 495: this.$store.dispatch(SET_BREADCRUMB, [

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

