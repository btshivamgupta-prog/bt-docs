# oil-batch — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Oil Batch depends on Oil Sample records and is consumed by Oil Report generation and result/PDF views.

## Listing page actions

### frontend/src/view/pages/oil-batch/Oil-Batch.vue

- Line 29: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 47: <v-btn depressed :disabled="selectedRows.length == 0" class="mx-2 custom-bold-button white--text"
- Line 48: color="cyan" @click="pushToVisit()">
- Line 52: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 84: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-bold-button custom-btn-color white--text"
- Line 85: @click="ViewCreateOilBatch = !ViewCreateOilBatch">
- Line 89: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 95: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-bold-button" v-on:click="exportQuotation"
- Line 99: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-bold-button"
- Line 103: <!-- <v-btn
- Line 130: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-bold-button" color="cyan white--text"
- Line 153: <v-btn depressed :disabled="dataLoading" class="ml-2 custom-bold-button" color="cyan white--text"
- Line 387: <v-btn icon small @click="searchDialog = false">
- Line 430: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button text-white"
- Line 435: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 484: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 488: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 628: _this.$router.push(
- Line 641: this.$router.push(
- Line 659: this.$router.push(
- Line 752: .dispatch(DOWNLOAD, {
- Line 766: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Oil Batch" }]);

### frontend/src/view/pages/oil-batch/Oil-Batch-Tab.vue

- Line 146: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Oil Batch" }]);
- Line 166: .dispatch(GET, {
- Line 180: // this.$router.push(
- Line 206: .dispatch(QUERY, {
- Line 247: //         this.$router.push({ query });
- Line 259: //         this.$router.push({ query });

### frontend/src/view/pages/oil-batch/search-template.vue

- Line 302: <v-btn color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

## Item/detail/create/edit page actions

### frontend/src/view/pages/oil-batch/Create-Oil-Batch.vue

- Line 121: <v-btn depressed v-on:click="closeDialog()" :disabled="formLoading"
- Line 125: <v-btn depressed :disabled="!formValid || formLoading" :loading="formLoading"
- Line 232: this.$store.dispatch(CLEAR_ERROR, {});
- Line 244: this.$router.go(-1);
- Line 282: .dispatch(QUERY, { url: "oilbatch/options" })
- Line 297: .dispatch(PUT, {
- Line 306: // _this.$router.push(
- Line 330: .dispatch(GET, { url: "oilbatch/" + _this.oilBatch })
- Line 333: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 360: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 369: _this.$router.go(-1);

### frontend/src/view/pages/oil-batch/Detail-Oil-Batch.vue

- Line 366: <v-btn depressed v-else class="mx-2 custom-bold-button white--text" color="cyan"
- Line 376: <!-- <v-btn :disabled="!formValid || formLoading || pageLoading" :loading="formLoading"
- Line 394: <v-btn depressed class="mx-2 custom-grey-border custom-bold-button" v-on:click="goBack">
- Line 415: <v-btn v-if="['0', null].includes(oilbatchArr.visit_id)" class="custom-bold-button white--text" color="cyan"
- Line 416: depressed @click="TransformerDialog = true">
- Line 547: this.$router.push(
- Line 562: .dispatch(PATCH, {
- Line 582: this.$router.push(
- Line 590: this.$router.push({
- Line 596: this.$router.push({
- Line 606: .dispatch(GET, { url: "oilbatch/" + _this.oilbatch })
- Line 638: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 646: _this.$router.go(-1);
- Line 656: _this.$router.go(-1);

### frontend/src/view/pages/oil-batch/Internal-Oil-Batch.vue

- Line 23: <v-btn
- Line 30: <v-btn
- Line 342: this.$router.push(
- Line 352: .dispatch(QUERY, {

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

