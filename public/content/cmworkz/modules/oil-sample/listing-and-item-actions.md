# oil-sample — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Oil Sample depends on Customer/Site, equipment/transformer details, Oil Batch, oil types, sampling dates, and Oil Reports.

## Listing page actions

### frontend/src/view/pages/oil-sample/Oil-sample.vue

- Line 28: <v-btn
- Line 60: <v-btn
- Line 79: <v-btn
- Line 88: <v-btn
- Line 97: <!--  <v-btn
- Line 100: $router.push(
- Line 121: <v-btn
- Line 130: <v-btn
- Line 139: <!-- <v-btn
- Line 176: <v-btn
- Line 223: <v-btn
- Line 380: @click.stop="
- Line 381: $router.push(
- Line 397: @click.stop="
- Line 398: $router.push(
- Line 763: <v-btn icon small @click="searchDialog = false">
- Line 846: <v-btn
- Line 856: <v-btn
- Line 936: <v-btn
- Line 945: <v-btn
- Line 1117: this.$router.push(
- Line 1212: //     .dispatch(PATCH, {
- Line 1225: // this.$router.push(
- Line 1236: .dispatch(DOWNLOAD, {
- Line 1250: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Oil Sample" }]);

### frontend/src/view/pages/oil-sample/Oil-Sample-Tab.vue

- Line 152: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Oil Sample" }]);
- Line 172: .dispatch(GET, {
- Line 186: // this.$router.push(
- Line 212: .dispatch(QUERY, {
- Line 253: //         this.$router.push({ query });
- Line 265: //         this.$router.push({ query });

### frontend/src/view/pages/oil-sample/search-template.vue

- Line 302: <v-btn color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

## Item/detail/create/edit page actions

### frontend/src/view/pages/oil-sample/Create-Oil-sample.vue

- Line 22: <v-btn depressed v-on:click="goBack" :disabled="formLoading" class="mx-2 custom-grey-border custom-bold-button">
- Line 25: <v-btn depressed :disabled="!formValid || formLoading" :loading="formLoading"
- Line 76: @click="manage_collected_by = true">mdi-cog</v-icon>
- Line 352: this.$store.dispatch(CLEAR_ERROR, {});
- Line 366: this.$router.go(-1);
- Line 386: .dispatch(QUERY, {
- Line 415: this.$router
- Line 443: .dispatch(QUERY, { url: "oilsample/options", data })
- Line 472: .dispatch(PUT, {
- Line 480: _this.$router.push(
- Line 501: .dispatch(GET, { url: "oilsample/" + _this.Oilsample })
- Line 504: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 545: .dispatch(GET, { url: "oilbatch/" + _this.oilBatchId })
- Line 562: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 582: _this.$router.go(-1);

### frontend/src/view/pages/oil-sample/Detail-Oil-sample.vue

- Line 152: <v-btn depressed v-else class="mx-2 custom-bold-button white--text" color="cyan" v-on:click="editOilSample()">
- Line 160: <v-btn :disabled="!formValid || formLoading || pageLoading" :loading="formLoading"
- Line 178: <v-btn depressed class="mx-2 custom-grey-border custom-bold-button" v-on:click="goBack">
- Line 603: .dispatch(PATCH, {
- Line 623: this.$router.push(
- Line 633: .dispatch(GET, { url: `property/${_this.oilsample}/history` })
- Line 645: this.$router.push({
- Line 651: this.$router.push({
- Line 657: this.$router.push({
- Line 663: this.$router.push({
- Line 694: .dispatch(GET, { url: "oilsample/" + _this.oilsample })
- Line 719: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 727: _this.$router.go(-1);
- Line 737: _this.$router.go(-1);

### frontend/src/view/pages/oil-sample/Internal-Oil-sample.vue

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

