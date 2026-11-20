# projects-tasks-expenses — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Projects depend on Customer, Jobs, Tasks, Milestones, Expenses, Products/Parts, and project costing.

## Listing page actions

### frontend/src/view/pages/expense/Expense.vue

- Line 32: <v-btn
- Line 63: <v-btn
- Line 114: <v-btn
- Line 123: <v-btn
- Line 131: <v-btn
- Line 134: $router.push(
- Line 150: <v-btn
- Line 202: <v-btn
- Line 544: <v-btn
- Line 552: <v-btn
- Line 680: this.$router.push(
- Line 704: .dispatch(PATCH, { url: "expenses/status", data })
- Line 730: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/project/partials/Project-Oil-Reports.vue

- Line 52: @click="openReport(item.report.id)"
- Line 59: @click.native.stop
- Line 68: @click.stop="openReport(item.report.id)"
- Line 79: @click.stop="openJob(item.job.id)"
- Line 91: @click.stop="openCustomer(item.report.customer?.id)"
- Line 105: <v-btn v-if="pdfUrl(item)" icon color="cyan" @click.stop="openPdf(pdfUrl(item))">
- Line 164: this.$store.dispatch(GET, { url: `project/${this.projectId}/oil-reports` })
- Line 170: this.$router.push(this.getDefaultRoute("visit.detail", { params: { id } }));
- Line 173: this.$router.push(this.getDefaultRoute("oil-report.detail", { params: { id } }));
- Line 176: if (id) this.$router.push(this.getDefaultRoute("customer.detail", { params: { id } }));

### frontend/src/view/pages/project/Project.vue

- Line 31: <v-btn
- Line 62: <v-btn
- Line 114: <v-btn
- Line 123: <v-btn
- Line 132: <!--  <v-btn
- Line 138: $router.push(
- Line 151: <v-btn
- Line 188: <v-btn
- Line 782: @click.stop=""
- Line 920: <v-btn icon small @click="searchDialog = false">
- Line 962: <v-btn
- Line 972: <v-btn
- Line 1016: <v-btn
- Line 1024: <v-btn
- Line 1195: .dispatch(PATCH, {
- Line 1228: _this.$router.push(
- Line 1252: this.$router.push(
- Line 1278: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/task/Task.vue

- Line 32: <v-btn
- Line 63: <v-btn
- Line 114: <v-btn
- Line 123: <v-btn
- Line 131: <v-btn
- Line 134: $router.push(
- Line 150: <v-btn
- Line 202: <v-btn
- Line 597: <v-btn
- Line 605: <v-btn
- Line 741: .dispatch(PATCH, {
- Line 773: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/expense/Create-Or-Update/Create-Expense.vue

- Line 31: <v-btn
- Line 38: <v-btn
- Line 47: <v-btn
- Line 254: <v-btn
- Line 490: .dispatch(QUERY, {
- Line 530: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 547: .dispatch(POST, {
- Line 552: _this.$router.push(
- Line 591: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/expense/Create-Or-Update/Update-Expense.vue

- Line 31: <v-btn
- Line 38: <v-btn
- Line 47: <v-btn
- Line 473: .dispatch(QUERY, {
- Line 507: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 524: .dispatch(PUT, {
- Line 529: _this.$router.push(
- Line 548: .dispatch(GET, {
- Line 597: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/expense/Detail/Detail-Expense.vue

- Line 35: <v-btn
- Line 44: <v-btn
- Line 60: <v-btn
- Line 89: <v-btn
- Line 335: _this.$router.push(
- Line 360: .dispatch(PATCH, { url: "expenses/" + _this.expense, data })
- Line 372: .dispatch(GET, {
- Line 404: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/project/costing/CreateCosting.vue

- Line 39: <v-btn
- Line 46: <v-btn
- Line 316: <v-btn
- Line 443: <v-btn
- Line 645: .dispatch(requestMethod, {
- Line 650: _this.$router.push(
- Line 669: .dispatch(GET, {
- Line 689: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 705: .dispatch(QUERY, {
- Line 729: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/project/costing/DetailCosting.vue

- Line 24: <v-btn
- Line 32: <v-btn
- Line 37: $router.push(
- Line 51: <v-btn
- Line 397: .dispatch(GET, {
- Line 444: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/project/Create-Project.vue

- Line 35: <v-btn
- Line 42: <v-btn
- Line 393: <v-btn
- Line 1286: this.$store.dispatch(CLEAR_ERROR, {});
- Line 1297: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1392: .dispatch(GET, {
- Line 1457: .dispatch(QUERY, {
- Line 1515: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1528: .dispatch(REQUEST_TYPE, {
- Line 1533: _this.$router.push(
- Line 1552: .dispatch(GET, { url: "quotation/" + _this.quotation })
- Line 1579: _this.$router.go(-1);
- Line 1586: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/project/Detail-Project.vue

- Line 49: <v-btn
- Line 73: <v-btn
- Line 103: <v-btn
- Line 414: _this.$router.push(
- Line 460: _this.$router.push(
- Line 475: _this.$router.push(
- Line 512: .dispatch(PATCH, {
- Line 529: .dispatch(GET, {
- Line 547: .dispatch(GET, {
- Line 567: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 593: _this.$router.go(-1);
- Line 618: this.$router.push({ query });

### frontend/src/view/pages/project/partials/Overview-Create.vue

- Line 206: <v-btn icon v-on:click="memberDialog = true">
- Line 232: <v-btn
- Line 252: <v-btn icon v-on:click="managerDialog = true">
- Line 273: <v-btn
- Line 696: <v-btn
- Line 704: <v-btn
- Line 773: <v-btn
- Line 781: <v-btn
- Line 812: <v-btn
- Line 823: <v-btn
- Line 849: <v-btn
- Line 860: <v-btn
- Line 965: this.$router.push({ query });
- Line 975: .dispatch(DELETE, {
- Line 998: .dispatch(DELETE, {
- Line 1018: .dispatch(PATCH, {
- Line 1037: .dispatch(PATCH, {
- Line 1055: .dispatch(GET, {
- Line 1069: .dispatch(GET, {

### frontend/src/view/pages/project/Update-Project.vue

- Line 36: <v-btn
- Line 43: <v-btn
- Line 157: <v-btn
- Line 491: this.$store.dispatch(CLEAR_ERROR, {});
- Line 505: .dispatch(GET, {
- Line 545: .dispatch(QUERY, {
- Line 569: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 574: .dispatch(PUT, {
- Line 579: _this.$router.push(
- Line 602: _this.$router.go(-1);
- Line 608: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/task/Create-Or-Update/Create-Task.vue

- Line 11: <v-btn
- Line 18: <v-btn
- Line 99: <v-btn
- Line 636: .dispatch(GET, {
- Line 665: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 699: .dispatch(POST, {
- Line 704: _this.$router.push(
- Line 729: .dispatch(GET, {
- Line 756: .dispatch(GET, { url: "lead-listing" })
- Line 770: .dispatch(GET, { url: "customer-list" })
- Line 786: .dispatch(GET, { url: `customer/${customer}/projects` })
- Line 804: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/task/Create-Or-Update/Update-Task.vue

- Line 11: <v-btn
- Line 18: <v-btn
- Line 329: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 345: .dispatch(PUT, {
- Line 350: _this.$router.push(
- Line 375: .dispatch(GET, {
- Line 405: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/task/Detail/Detail-Task.vue

- Line 55: <v-btn
- Line 84: <v-btn
- Line 373: <v-btn icon v-on:click="memberDialog = true">
- Line 410: <v-btn icon v-on:click="deleteMember(member)">
- Line 469: <v-btn
- Line 478: <v-btn
- Line 527: <v-btn
- Line 569: <v-btn
- Line 601: <v-btn
- Line 611: <v-btn
- Line 797: <v-btn
- Line 832: <v-btn
- Line 842: <v-btn
- Line 900: <v-btn
- Line 953: <v-btn
- Line 961: <v-btn
- Line 1060: <v-btn
- Line 1067: <v-btn
- Line 1096: <v-btn
- Line 1107: <v-btn
- Line 1261: _this.$router.push(
- Line 1270: _this.$router.push(
- Line 1299: .dispatch(PATCH, {
- Line 1323: .dispatch(DELETE, {
- Line 1342: .dispatch(PATCH, {
- Line 1360: .dispatch(GET, {
- Line 1374: .dispatch(GET, {
- Line 1400: .dispatch(POST, {
- Line 1419: .dispatch(PATCH, {
- Line 1438: .dispatch(DELETE, {
- Line 1455: .dispatch(GET, {
- Line 1482: .dispatch(POST, {
- Line 1505: .dispatch(DELETE, {
- Line 1522: .dispatch(GET, {
- Line 1562: .dispatch(POST, {
- Line 1603: .dispatch(DELETE, {
- Line 1620: .dispatch(GET, {
- Line 1643: .dispatch(POST, {
- Line 1665: .dispatch(GET, {
- Line 1709: _this.$store.dispatch(SET_BREADCRUMB, [

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

