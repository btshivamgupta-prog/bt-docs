# site — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Site data is implemented as customer property/address data. Jobs, Visits, Equipment, service PDFs, and customer details consume it.

## Listing page actions

### frontend/src/view/pages/customer/create-or-update/Billing-Address.vue

- Line 638: .dispatch(QUERY, {
- Line 665: .dispatch(QUERY, {
- Line 722: .dispatch(QUERY, {

### frontend/src/view/pages/customer/create-or-update/Contact-Persons.vue

- Line 146: <v-btn
- Line 238: <v-btn
- Line 258: <v-btn

### frontend/src/view/pages/customer/create-or-update/Property-Address.vue

- Line 108: <v-btn class="mx-2" color="cyan" dark fab x-small v-on:click="dialog = true">
- Line 142: <v-btn v-if="!isCustomerFrom" depressed style="height: 31px !important"
- Line 156: <v-btn
- Line 713: .dispatch(GET, { url: "setting/get-country" })
- Line 831: .dispatch(QUERY, {
- Line 858: .dispatch(QUERY, {
- Line 915: .dispatch(QUERY, {
- Line 956: .dispatch(QUERY, {

### frontend/src/view/pages/customer/Customer.vue

- Line 9: <v-btn depressed v-on:click="getLineItem(null, 'alphabet')" :class="{
- Line 13: <v-btn depressed v-for="(row, index) in alphabets" v-on:click="getLineItem(row, 'alphabet')" :class="{
- Line 37: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-grey-border custom-bold-button"
- Line 56: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-grey-border custom-bold-button"
- Line 134: <!-- <v-btn :disabled="dataLoading" depressed class="mx-2 custom-grey-border custom-bold-button"
- Line 139: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-bold-button custom-btn-color white--text"
- Line 144: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-grey-border custom-bold-button"
- Line 148: <!--   <v-btn
- Line 154: $router.push(
- Line 167: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-bold-button" color="cyan white--text"
- Line 171: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-bold-button"
- Line 175: <!--  <v-btn
- Line 202: <v-btn :disabled="dataLoading" depressed class="mx-2 custom-bold-button btn-tab-hide"
- Line 224: <v-btn :disabled="dataLoading" class="ml-2 custom-bold-button" color="cyan white--text"
- Line 521: <a @click.stop="" :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
- Line 641: <v-btn icon small @click="searchDialog = false">
- Line 672: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button text-white"
- Line 677: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 678: color="cyan white--text" @click="filterRows">
- Line 717: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 721: <v-btn depressed :disabled="dataLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 893: .dispatch(PATCH, {
- Line 1005: .dispatch(POST, {
- Line 1021: .dispatch(PATCH, {
- Line 1038: .dispatch(DOWNLOAD, {
- Line 1053: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/customer/detail/overview/Contact-Person.vue

- Line 272: .dispatch(PATCH, {

## Item/detail/create/edit page actions

### frontend/src/view/pages/customer/Create-Customer.vue

- Line 17: <v-btn
- Line 26: <v-btn
- Line 237: this.$store.dispatch(CLEAR_ERROR, {});
- Line 279: this.$store.dispatch(SET_CC_PERSONS, param);
- Line 287: .dispatch(GET, { url: "customer/options" })
- Line 337: .dispatch(PUT, { url: "address/" + customer, data: formData })
- Line 440: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 501: let customerObject = await _this.$store.dispatch(POST, {
- Line 534: _this.$router.push(
- Line 547: .dispatch(GET, {
- Line 569: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/customer/create-or-update/Contact-Details.vue

- Line 1009: <v-btn
- Line 1021: <v-btn
- Line 1086: <v-btn
- Line 1098: <v-btn
- Line 1157: <v-btn
- Line 1169: <v-btn
- Line 1295: <v-btn
- Line 1658: .dispatch(QUERY, {
- Line 1690: .dispatch(QUERY, {
- Line 1709: .dispatch(QUERY, {
- Line 1728: .dispatch(QUERY, {
- Line 1747: .dispatch(QUERY, {
- Line 1767: .dispatch(QUERY, {
- Line 1786: .dispatch(QUERY, {
- Line 1834: .dispatch(QUERY, {
- Line 1885: .dispatch(DELETE, {
- Line 1929: .dispatch(GET, {
- Line 2065: .dispatch(GET, {

### frontend/src/view/pages/customer/create-or-update/Contact-Details-Overview.vue

- Line 950: <v-btn
- Line 962: <v-btn
- Line 1027: <v-btn
- Line 1039: <v-btn
- Line 1098: <v-btn
- Line 1110: <v-btn
- Line 1148: <v-btn
- Line 1490: .dispatch(QUERY, {
- Line 1522: .dispatch(QUERY, {
- Line 1541: .dispatch(QUERY, {
- Line 1560: .dispatch(QUERY, {
- Line 1579: .dispatch(QUERY, {
- Line 1599: .dispatch(QUERY, {
- Line 1618: .dispatch(QUERY, {
- Line 1666: .dispatch(QUERY, {
- Line 1717: .dispatch(DELETE, {
- Line 1761: .dispatch(GET, {
- Line 1883: .dispatch(GET, {

### frontend/src/view/pages/customer/create-or-update/Create-Contact-Person.vue

- Line 230: @click:close="removeEmail(item)"
- Line 286: <v-btn
- Line 293: <v-btn
- Line 433: .dispatch(GET, {
- Line 701: const { data } = await this.$store.dispatch(PUT, {
- Line 724: this.$store.dispatch(SET_CC_PERSONS, this.contactPersons);

### frontend/src/view/pages/customer/create-or-update/Update-Single-Person-Individual-Customer.vue

- Line 245: @click:close="removeEmail(item)"
- Line 400: <v-btn
- Line 426: <v-btn
- Line 433: <v-btn
- Line 859: const { data } = await this.$store.dispatch(PUT, {
- Line 882: this.$store.dispatch(SET_CC_PERSONS, this.contactPersons);

### frontend/src/view/pages/customer/Detail-Customer.vue

- Line 25: <v-btn
- Line 45: <v-btn
- Line 68: <v-btn
- Line 71: @click="resetPasswordDialog = true"
- Line 88: <v-btn
- Line 92: @click="mailDialog = true"
- Line 109: <!-- @click="getCollectionConsent" -->
- Line 110: <v-btn
- Line 114: @click="mailDialog = true"
- Line 208: <v-btn
- Line 227: @click="createTransaction(customerArr, item.action)"
- Line 258: <v-btn
- Line 286: <v-btn
- Line 529: <v-btn
- Line 577: <v-btn
- Line 671: <v-btn
- Line 695: <v-btn
- Line 749: <v-btn
- Line 786: <v-btn
- Line 872: <v-btn
- Line 904: <v-btn
- Line 977: <v-btn
- Line 1023: <v-btn
- Line 1072: <v-btn
- Line 1128: <v-btn
- Line 1165: <v-btn
- Line 1245: <v-btn
- Line 1279: <v-btn
- Line 1497: <v-btn
- Line 1507: <v-btn
- Line 1575: <v-btn
- Line 1587: <v-btn
- Line 1624: <v-btn
- Line 1634: <v-btn
- Line 1669: <v-btn
- Line 1679: <v-btn
- Line 1699: <v-btn
- Line 1704: @click="resetPassword()"
- Line 1708: <v-btn
- Line 1712: @click="resetPasswordDialog = false"
- Line 1772: <v-btn
- Line 1781: <v-btn
- Line 2147: const url = this.$router.resolve({ name: "customer.approve" }).href;
- Line 2152: _this.$router.push(
- Line 2174: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 2181: this.$store.dispatch(SET_CC_PERSONS, _this.customerArr.persons);
- Line 2186: _this.$router.go(-1);
- Line 2222: .dispatch(PATCH, {
- Line 2324: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 2425: await _this.$store.dispatch(PATCH, {
- Line 2432: await _this.$store.dispatch(PUT, {
- Line 2439: await _this.$store.dispatch(PUT, {
- Line 2446: await _this.$store.dispatch(PUT, {
- Line 2522: this.$store.dispatch(GET_OPTION);
- Line 2523: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 2530: this.$store.dispatch(SET_CC_PERSONS, _this.customerArr.persons);
- Line 2541: _this.$router.go(-1);
- Line 2563: _this.$router.go(-1);
- Line 2604: //       this.$router.push({ query });

### frontend/src/view/pages/customer/PasswordUpdate.vue

- Line 71: <v-btn
- Line 183: .dispatch(PATCH, {

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

