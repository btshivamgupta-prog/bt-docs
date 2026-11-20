# purchase-orders — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Purchase Orders depend on Supplier, Products/Parts, tax, warehouse/stock, receiving, and invoice/payment flows.

## Listing page actions

### frontend/src/view/pages/purchase-order/Detail/Pending-Line-Item.vue

- Line 112: <v-btn
- Line 160: .dispatch(GET, {
- Line 198: .dispatch(PUT, {

### frontend/src/view/pages/purchase-order/Detail/Received-Line-Item.vue

- Line 132: .dispatch(GET, {

### frontend/src/view/pages/purchase-order/Purchase-Order.vue

- Line 32: <v-btn
- Line 64: <v-btn
- Line 116: <v-btn
- Line 126: <v-btn
- Line 135: <v-btn
- Line 139: $router.push(
- Line 155: <v-btn
- Line 208: <v-btn
- Line 598: <v-btn
- Line 606: <v-btn
- Line 740: .dispatch(PATCH, {
- Line 772: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/purchase-order/Create-Or-Update/Create-Purchase-Order.vue

- Line 60: <v-btn
- Line 68: <v-btn
- Line 79: <v-btn
- Line 504: <!-- <v-btn
- Line 649: @click:append-outer="addPaymentTermDialog"
- Line 1007: /* const resolved = this.$router.resolve(route);
- Line 1014: .dispatch(QUERY, {
- Line 1049: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1095: let purchaseOrder = await _this.$store.dispatch(POST, {
- Line 1145: _this.$router.push(
- Line 1161: .dispatch(GET, {
- Line 1235: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/purchase-order/Create-Or-Update/Update-Purchase-Order.vue

- Line 11: <v-btn
- Line 18: <v-btn
- Line 374: .dispatch(GET, {
- Line 396: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 462: let purchaseOrder = await _this.$store.dispatch(PUT, {
- Line 487: _this.$router.push(
- Line 503: .dispatch(GET, {
- Line 587: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/purchase-order/Detail/Detail-Purchase-Order.vue

- Line 215: <v-btn
- Line 244: <v-btn
- Line 308: $router.push(
- Line 375: $router.push(
- Line 815: $router.push(
- Line 881: $router.push(
- Line 1093: .dispatch(GET, { url: "purchase-order/" + _this.purchaseOrder })
- Line 1110: _this.$router.push(
- Line 1119: _this.$router.push(
- Line 1159: .dispatch(PATCH, {
- Line 1189: _this.$router.go(-1);
- Line 1199: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1265: this.$router.push({ query });

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

