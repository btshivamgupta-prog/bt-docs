# oil-report — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Oil Reports depend on Oil Sample, Oil Batch, transformer data, result calculations, charts, PDF views, and report history.

## Listing page actions

### frontend/src/view/pages/oil-report-generator/detail/OilAnalysisReport.vue

- Line 34: <v-btn v-if="!$route.path.includes('oilsample')" @click="
- Line 416: <v-btn small text @click="
- Line 434: <v-btn v-if="!$route.path.includes('oilsample')" @click="
- Line 517: <v-btn v-if="!$route.path.includes('oilsample')" small icon depressed color="red lighten-1" text
- Line 518: @click="
- Line 547: <v-btn v-if="!$route.path.includes('oilsample')" @click="
- Line 625: <v-btn v-if="!$route.path.includes('oilsample')" small icon depressed color="red lighten-1" text
- Line 626: @click="
- Line 653: <v-btn v-if="!$route.path.includes('oilsample')" @click="
- Line 671: <v-icon small class="cursor-pointer mb-0 float-right" @click="openDialog"
- Line 1102: <v-btn v-if="!$route.path.includes('oilsample')" small icon depressed color="red lighten-1" text @click="
- Line 1120: <v-btn v-if="!$route.path.includes('oilsample')" @click="
- Line 1462: <v-btn v-if="!$route.path.includes('oilsample')" small icon depressed color="red lighten-1" text @click="
- Line 1500: <v-btn :disabled="formLoading" :loading="formLoading" class="mx-2 custom-bold-button white--text" color="cyan"
- Line 1504: <v-btn :disabled="formLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 2172: .dispatch(DELETE, {

### frontend/src/view/pages/oil-report-generator/Oil-Report.vue

- Line 21: <v-btn :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 40: <v-btn :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 77: <v-btn :disabled="dataLoading" class="mx-2 custom-bold-button custom-btn-color white--text"
- Line 83: <v-btn :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 89: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-bold-button" color="cyan white--text"
- Line 198: <p class="m-0 custom-nowrap-ellipsis" @click.stop="
- Line 199: $router.push(
- Line 215: color="chip-custom-blue" outlined label @click.stop="
- Line 216: $router.push(
- Line 265: <v-btn icon color="cyan" depressed>
- Line 267: <v-icon color="red" @click="viewPDF(data?.sample_pdf_url)">mdi-download</v-icon>
- Line 354: <v-btn icon small @click="searchDialog = false">
- Line 396: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button text-white"
- Line 397: color="red" @click="removeFilters('clear')">
- Line 401: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 402: color="cyan white--text" @click="filterRows">
- Line 609: .dispatch(PATCH, {
- Line 687: .dispatch(POST, {
- Line 705: .dispatch(DOWNLOAD, {
- Line 720: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/oil-report-generator/Create-Oil-Report.vue

- Line 16: <v-btn :disabled="formLoading" class="mx-2 custom-grey-border custom-bold-button" depressed @click="goBack">
- Line 19: <v-btn :loading="formLoading" class="mx-2 custom-bold-button white--text" color="cyan" depressed
- Line 20: @click="updateOrCreate('save')">
- Line 24: <v-btn :loading="formLoading" class="mx-2 custom-bold-button white--text" color="cyan" depressed
- Line 25: @click="updateOrCreate('draft')">
- Line 77: :rules="[(v) => !!v || 'Visit is required']" @click:clear="
- Line 120: solo flat color="cyan" @change="getBatchData" @click:clear="
- Line 176: " elevation="0" @click="
- Line 198: <v-icon color="red" class="cursor-pointer" @click="removeRow(index, 'dga_file_data')">
- Line 210: }" @click="
- Line 245: @click="deleteFileFromSample('acid')"
- Line 257: <v-icon color="red" class="cursor-pointer" @click="removeRow(index, 'acid_file_data')">
- Line 270: }" @click="
- Line 302: <v-icon color="red" class="cursor-pointer" @click="removeRow(index, 'furan_file_data')">
- Line 353: `" @click="setActiveSample(i, sample)">
- Line 422: <v-icon color="red" class="cursor-pointer" @click="deleteFileFromSample('dga')">
- Line 431: }" @click="
- Line 463: <v-icon color="red" class="cursor-pointer" @click="deleteFileFromSample('acid')">
- Line 472: }" @click="
- Line 502: <v-icon color="red" class="cursor-pointer" @click="deleteFileFromSample('furan')">
- Line 511: }" @click="
- Line 1099: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1102: .dispatch(POST, {
- Line 1107: _this.$router.push(_this.getDefaultRoute("oil-report", {}));
- Line 1144: .dispatch(UPLOAD, { url: `report-excel/${type}`, data: formData })
- Line 1251: .dispatch(QUERY, {
- Line 1272: .dispatch(QUERY, {
- Line 1347: .dispatch(QUERY, {
- Line 1480: .dispatch(QUERY, {
- Line 1500: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1507: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/oil-report-generator/detail/OilAnalysisReportDetail.vue

- Line 28: <v-btn v-if="!$route.path.includes('oilsample')" @click="
- Line 468: <v-btn :disabled="formLoading" :loading="formLoading" class="mx-2 custom-bold-button white--text" color="cyan"
- Line 472: <v-btn :disabled="formLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 896: .dispatch(DELETE, {

### frontend/src/view/pages/oil-report-generator/detail/TransformerSampleData.vue

- Line 27: <v-btn :disabled="saving" :loading="saving" class="custom-bold-button white--text" color="green" tile
- Line 28: @click="saveTransformerData()">
- Line 43: <v-btn v-if="canEdit" color="cyan" class="custom-bold-button white--text mt-4" @click="addRow('dga')">
- Line 54: <v-btn v-if="canEdit" class="custom-bold-button white--text" color="cyan" tile
- Line 55: @click="addRow('dga')">+</v-btn>
- Line 91: <v-btn small icon depressed text color="red lighten-1"
- Line 92: @click="deleteTransformerDataRow(row.transformerRowId, row, 'dga')">
- Line 106: <v-btn v-if="canEdit" class="custom-bold-button white--text" color="cyan" tile
- Line 107: @click="addRow('waterContent')">+</v-btn>
- Line 140: <v-btn small icon depressed text color="red lighten-1"
- Line 141: @click="deleteTransformerDataRow(row.transformerRowId, row, 'waterContent')">
- Line 159: <v-btn v-if="canEdit" class="custom-bold-button white--text" color="cyan" tile
- Line 160: @click="addRow('acid')">+</v-btn>
- Line 191: <v-btn small icon depressed text color="red lighten-1"
- Line 192: @click="deleteTransformerDataRow(row.transformerRowId, row, 'acid')">
- Line 211: <v-btn v-if="canEdit" class="custom-bold-button white--text" color="cyan" tile
- Line 212: @click="addRow('dielectric')">+</v-btn>
- Line 290: <v-btn small icon depressed text color="red lighten-1"
- Line 291: @click="deleteTransformerDataRow(row.transformerRowId, row, 'dielectric')">
- Line 303: <v-btn v-if="canEdit" class="custom-bold-button white--text" color="cyan" tile
- Line 304: @click="addRow('furan')">+</v-btn>
- Line 338: <v-btn small icon depressed text color="red lighten-1"
- Line 339: @click="deleteTransformerDataRow(row.transformerRowId, row, 'furan')">
- Line 361: <v-btn :disabled="formLoading" :loading="formLoading" class="mx-2 custom-bold-button white--text"
- Line 362: color="cyan" @click="deleteReportData">Yes</v-btn>
- Line 363: <v-btn :disabled="formLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 364: @click="viewDeleteConfirmBox = false">No</v-btn>
- Line 644: .dispatch(GET, { url: `equipment/${id}/sample-data` })
- Line 682: this.$store.dispatch(GET, { url: "oil-report/options" })
- Line 776: ? this.$store.dispatch(DELETE, {

### frontend/src/view/pages/oil-report-generator/Detail-Oil-Report.vue

- Line 102: <v-btn depressed v-else class="mx-2 custom-bold-button white--text" color="cyan" v-on:click="editOilSample()">
- Line 113: <v-btn v-bind="attrs" @click="viewPDF(detail?.sample_pdf_url)" v-on="on" :disabled="dataLoading"
- Line 122: <v-btn v-bind="attrs" v-on="on" @click="retryPDF"
- Line 132: <v-btn depressed class="mx-2 custom-grey-border custom-bold-button" v-on:click="goBack">
- Line 292: <span class="font-weight-500" @click="
- Line 316: <span class="font-weight-500" @click="
- Line 535: this.$router.replace(
- Line 548: .dispatch(POST, {
- Line 571: this.$router.push(
- Line 604: .dispatch(PATCH, {
- Line 625: this.$router.push(
- Line 633: this.$router.push({
- Line 641: this.$router.push({
- Line 647: this.$router.push({
- Line 653: this.$router.push({
- Line 663: .dispatch(GET, { url: "oil-report/" + _this.oilsample })
- Line 683: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 690: // _this.$router.go(-1);
- Line 700: //   _this.$router.go(-1);

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

