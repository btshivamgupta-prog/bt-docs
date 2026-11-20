# quotation-contract — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Quotations and Contracts depend on Customer, Products/Parts, Jobs, PDF templates, signatures, and email/public verification flows.

## Listing page actions

### frontend/src/view/pages/contract/Contract.vue

- Line 36: <v-btn
- Line 68: <v-btn
- Line 153: <v-btn
- Line 163: <v-btn
- Line 172: <!--   <v-btn
- Line 175: $router.push(
- Line 191: <v-btn
- Line 200: <!--  <v-btn
- Line 253: <v-btn
- Line 862: <v-btn icon small @click="searchDialog = false">
- Line 942: <v-btn
- Line 947: @click="removeFilters('clear')"
- Line 952: <v-btn
- Line 1034: <v-btn
- Line 1042: <v-btn
- Line 1358: _this.$router.push(
- Line 1434: .dispatch(PATCH, {
- Line 1451: .dispatch(DOWNLOAD, {
- Line 1467: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/contract/search-template.vue

- Line 302: <v-btn color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

### frontend/src/view/pages/proposal/Proposal.vue

- Line 32: <v-btn
- Line 63: <v-btn
- Line 114: <v-btn
- Line 123: <v-btn
- Line 131: <v-btn
- Line 134: $router.push(
- Line 150: <v-btn
- Line 202: <v-btn
- Line 580: <v-btn
- Line 588: <v-btn
- Line 786: .dispatch(PATCH, {
- Line 818: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/quotation/Download-Dialog.vue

- Line 136: <v-btn
- Line 143: <v-btn
- Line 231: .dispatch(GET, {

### frontend/src/view/pages/quotation/Quotation.vue

- Line 36: <v-btn
- Line 68: <v-btn
- Line 148: <v-btn
- Line 156: <v-btn
- Line 167: <v-btn
- Line 176: <!--   <v-btn
- Line 180: $router.push(
- Line 196: <v-btn
- Line 250: <v-btn
- Line 300: <v-btn
- Line 1122: <v-btn icon small @click="searchDialog = false">
- Line 1225: <v-btn
- Line 1235: <v-btn
- Line 1338: <v-btn
- Line 1347: <v-btn
- Line 1680: this.$router.push(
- Line 1689: _this.$router.push(
- Line 1766: .dispatch(PATCH, {
- Line 1783: .dispatch(DOWNLOAD, {
- Line 1799: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/quotation/search-template.vue

- Line 302: <v-btn color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

## Item/detail/create/edit page actions

### frontend/src/view/pages/contract/Create-Contract.vue

- Line 51: <v-btn
- Line 59: <v-btn
- Line 69: <!--  <v-btn
- Line 1441: const resolved = this.$router.resolve(route);
- Line 1466: /* const resolved = this.$router.resolve(route);
- Line 1559: this.$router.push(
- Line 1617: this.$router
- Line 1747: const contract = await _this.$store.dispatch(REQUEST_TYPE, {
- Line 1791: _this.$router.push(
- Line 1804: .dispatch(QUERY, {
- Line 2238: .dispatch(QUERY, {
- Line 2332: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2337: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/contract/Create-Quotation - Copy.vue

- Line 23: <v-btn
- Line 31: <v-btn
- Line 203: <v-btn
- Line 262: <v-btn
- Line 534: _this.$router.push(

### frontend/src/view/pages/contract/Detail-Contract.vue

- Line 282: <v-btn
- Line 302: <v-btn
- Line 322: <v-btn
- Line 347: <v-btn
- Line 376: <v-btn
- Line 1041: <v-btn
- Line 1048: <v-btn
- Line 1170: .dispatch(QUERY, {
- Line 1279: .dispatch(PATCH, {
- Line 1311: this.$router.push(
- Line 1329: this.$router.push(
- Line 1347: this.$router.push(
- Line 1364: this.$router.push(
- Line 1380: this.$router.push(
- Line 1396: this.$router.push(
- Line 1413: .dispatch(GET, { url: "contract/" + this.contractId })
- Line 1423: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/contract/Detail-Quotation - Copy.vue

- Line 57: $router.push(
- Line 78: <v-btn
- Line 99: <v-btn
- Line 128: <v-btn
- Line 266: $router.push(
- Line 462: $router.push(
- Line 519: $router.push(
- Line 1016: <v-btn
- Line 1019: @click="createdDatePicker = false"
- Line 1084: <v-btn
- Line 1087: @click="sentDatePicker = false"
- Line 1151: <v-btn
- Line 1154: @click="openTillPicker = false"
- Line 1448: <v-btn
- Line 1463: <v-btn
- Line 1472: <v-btn

### frontend/src/view/pages/proposal/Create-Or-Update/Create-Proposal.vue

- Line 11: <v-btn
- Line 18: <v-btn
- Line 315: <v-btn
- Line 669: .dispatch(QUERY, {
- Line 706: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 766: let { data } = await _this.$store.dispatch(POST, {
- Line 802: _this.$router.push(
- Line 820: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/proposal/Create-Or-Update/Update-Proposal.vue

- Line 11: <v-btn
- Line 18: <v-btn
- Line 315: <v-btn
- Line 663: .dispatch(GET, {
- Line 685: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 745: let { data } = await _this.$store.dispatch(PUT, {
- Line 781: _this.$router.push(
- Line 794: .dispatch(GET, {
- Line 893: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/proposal/Detail/Detail-Proposal.vue

- Line 34: <!-- <v-btn
- Line 43: <v-btn
- Line 59: <v-btn
- Line 88: <v-btn
- Line 581: _this.$router.push(
- Line 601: _this.$router.push(
- Line 610: _this.$router.push(
- Line 648: .dispatch(PATCH, {
- Line 666: .dispatch(GET, {
- Line 742: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/quotation/Create-Quotation - Copy.vue

- Line 23: <v-btn
- Line 31: <v-btn
- Line 203: <v-btn
- Line 262: <v-btn
- Line 534: _this.$router.push(

### frontend/src/view/pages/quotation/Create-Quotation.vue

- Line 56: <v-btn
- Line 63: <v-btn
- Line 115: <v-btn :disabled="formLoading" v-on:click="goBack()" class="custom-bold-button custom-grey-border"
- Line 117: <v-btn class="custom-bold-button ml-4" depressed :disabled="!formValid || formLoading" :loading="formLoading"
- Line 669: <v-btn
- Line 680: <v-btn
- Line 793: @click="show_line_items = !show_line_items"
- Line 835: @click="show_invoicing = !show_invoicing"
- Line 1216: @click="show_notes_attachment = !show_notes_attachment"
- Line 1324: @click="show_terms_condition = !show_terms_condition"
- Line 1529: <v-btn
- Line 1535: <v-btn
- Line 1938: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 2091: .dispatch(requestType, { url: requestURL, data: request })
- Line 2094: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 2095: /*  this.$store.dispatch(CLEAR_LINE_ITEM); */
- Line 2097: this.$router.push(
- Line 2110: .dispatch(QUERY, {
- Line 2131: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2268: /*   this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 2280: /*  this.$store.dispatch(SET_EDIT_LINE_ITEM, dbQuotation?.line_item ?? []); */
- Line 2406: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2450: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2511: /*   this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 2523: /*  this.$store.dispatch(SET_EDIT_LINE_ITEM, duplicateQuotation.line_item ?? []); */
- Line 2525: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2577: /*   this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 2589: /*  this.$store.dispatch(SET_EDIT_LINE_ITEM, duplicateQuotation.line_item ?? []); */
- Line 2591: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2671: .dispatch(QUERY, {
- Line 2719: this.$store.dispatch(SET_BREADCRUMB, []);
- Line 2732: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 2733: this.$store.dispatch(RESET_CREATE_STATE);
- Line 2734: this.$store.dispatch(CLEAR_INVOICE);
- Line 2735: /*  this.$store.dispatch(CLEAR_LINE_ITEM); */
- Line 2752: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 2753: this.$store.dispatch(RESET_CREATE_STATE);
- Line 2754: /*  this.$store.dispatch(CLEAR_LINE_ITEM); */

### frontend/src/view/pages/quotation/Detail-Quotation - Copy.vue

- Line 57: $router.push(
- Line 78: <v-btn
- Line 99: <v-btn
- Line 128: <v-btn
- Line 266: $router.push(
- Line 462: $router.push(
- Line 519: $router.push(
- Line 1016: <v-btn
- Line 1019: @click="createdDatePicker = false"
- Line 1084: <v-btn
- Line 1087: @click="sentDatePicker = false"
- Line 1151: <v-btn
- Line 1154: @click="openTillPicker = false"
- Line 1448: <v-btn
- Line 1463: <v-btn
- Line 1472: <v-btn

### frontend/src/view/pages/quotation/Detail-Quotation.vue

- Line 779: <v-btn
- Line 797: <v-btn
- Line 815: <v-btn
- Line 834: <v-btn
- Line 852: <v-btn
- Line 868: <v-btn
- Line 891: <v-btn
- Line 907: <v-btn
- Line 925: <v-btn
- Line 949: <v-btn
- Line 978: <v-btn
- Line 1851: <v-btn
- Line 1859: <v-btn
- Line 1943: <v-btn
- Line 1950: <v-btn
- Line 2093: <v-btn
- Line 2100: <v-btn
- Line 2124: <v-btn
- Line 2131: <v-btn
- Line 2168: <v-btn
- Line 2175: <v-btn
- Line 2198: <v-btn
- Line 2219: <v-btn class="text-white" color="red darken-4" depressed tile v-on:click="closeDialog">
- Line 2354: this.$router.push(
- Line 2369: .dispatch(DELETE, { url: `quotation/${this.detail.id}` })
- Line 2373: this.$router.push(this.getDefaultRoute("quotation"));
- Line 2452: this.$router.push({
- Line 2522: .dispatch(GET, { url: "setting/quotation" })
- Line 2614: .dispatch(GET, {
- Line 2633: .dispatch(PATCH, {
- Line 2656: .dispatch(PUT, {
- Line 2705: this.$router.push(
- Line 2722: this.$router.push(
- Line 2729: this.$router.push(
- Line 2736: this.$router.push(
- Line 2743: this.$router.push(
- Line 2752: this.$router.push(
- Line 2768: this.$router.push(
- Line 2776: .dispatch(GET, { url: "quotation/" + this.quotationId })
- Line 2783: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2863: this.$router.push({ query });

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

