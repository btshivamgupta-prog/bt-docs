# supplier — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Suppliers are consumed by Products/Parts, Purchase Orders, receiving, inventory, and supplier-related reports.

## Listing page actions

### frontend/src/view/pages/supplier/create-or-update/Billing-Address.vue

- Line 935: .dispatch(QUERY, {
- Line 962: .dispatch(QUERY, {
- Line 1018: .dispatch(QUERY, {

### frontend/src/view/pages/supplier/create-or-update/Billing-Address-New.vue

- Line 932: .dispatch(QUERY, {
- Line 959: .dispatch(QUERY, {
- Line 1015: .dispatch(QUERY, {

### frontend/src/view/pages/supplier/create-or-update/Contact-Persons.vue

- Line 144: <v-btn
- Line 200: <v-btn
- Line 216: <v-btn
- Line 463: <v-btn
- Line 469: <v-btn

### frontend/src/view/pages/supplier/create-or-update/Property-Address.vue

- Line 531: .dispatch(QUERY, {
- Line 558: .dispatch(QUERY, {
- Line 614: .dispatch(QUERY, {

### frontend/src/view/pages/supplier/detail/overview/Contact-Person.vue

- Line 233: .dispatch(PATCH, {

### frontend/src/view/pages/supplier/Supplier.vue

- Line 37: <v-btn
- Line 68: <v-btn
- Line 120: <v-btn
- Line 128: <v-btn
- Line 139: <v-btn
- Line 148: <!-- <v-btn
- Line 155: $router.push(
- Line 168: <v-btn
- Line 205: <v-btn
- Line 257: <v-btn
- Line 679: @click.stop=""
- Line 784: <v-btn icon small @click="searchDialog = false">
- Line 827: <v-btn
- Line 837: <v-btn
- Line 882: <v-btn
- Line 891: <v-btn
- Line 914: <v-btn
- Line 946: <v-btn
- Line 954: <v-btn
- Line 1084: .dispatch(PATCH, {
- Line 1164: .dispatch(POST, {
- Line 1180: .dispatch(PATCH, {
- Line 1197: .dispatch(DOWNLOAD, {
- Line 1212: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/supplier/create-or-update/Contact-Details.vue

- Line 496: <v-btn
- Line 779: .dispatch(QUERY, {
- Line 798: .dispatch(QUERY, {
- Line 820: .dispatch(QUERY, {
- Line 870: .dispatch(QUERY, {
- Line 950: .dispatch(GET, {
- Line 1016: .dispatch(GET, {
- Line 1057: .dispatch(GET, {

### frontend/src/view/pages/supplier/create-or-update/Create-Contact-Persons.vue

- Line 391: @click:close="removeEmail(item)"
- Line 406: <v-btn
- Line 413: <v-btn
- Line 782: const { data } = await this.$store.dispatch(PUT, {
- Line 805: this.$store.dispatch(SET_CC_PERSONS, this.contactPersons);

### frontend/src/view/pages/supplier/Create-Supplier.vue

- Line 20: <v-btn
- Line 28: <v-btn
- Line 192: this.$store.dispatch(CLEAR_ERROR, {});
- Line 228: .dispatch(GET, { url: "supplier/options" })
- Line 257: .dispatch(PUT, { url: "address/" + supplier, data: formData })
- Line 350: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 409: let supplierObject = await _this.$store.dispatch(POST, {
- Line 440: _this.$router.push(
- Line 457: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/supplier/Detail-Supplier.vue

- Line 56: <v-btn
- Line 93: <v-btn
- Line 121: <v-btn
- Line 190: <v-btn
- Line 224: <v-btn
- Line 310: <v-btn
- Line 418: <v-btn
- Line 428: <v-btn
- Line 467: <v-btn
- Line 479: <v-btn
- Line 516: <v-btn
- Line 526: <v-btn
- Line 665: .dispatch(GET, { url: "supplier/options" })
- Line 781: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 843: await _this.$store.dispatch(PATCH, {
- Line 850: await _this.$store.dispatch(PUT, {
- Line 857: await _this.$store.dispatch(PUT, {
- Line 864: await _this.$store.dispatch(PUT, {
- Line 929: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 943: _this.$router.go(-1);
- Line 953: _this.$router.go(-1);
- Line 991: //       this.$router.push({ query });

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

