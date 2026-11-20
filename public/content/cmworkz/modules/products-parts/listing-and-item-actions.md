# products-parts — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Products and parts are consumed by Jobs/Visits line items, Purchase Orders, Equipment, Invoices, stock, and reports.

## Listing page actions

### frontend/src/view/pages/part/adjustment/adjustment.vue

- Line 18: <v-btn
- Line 30: <v-btn
- Line 80: <v-btn
- Line 111: <v-btn
- Line 202: <v-btn
- Line 210: <!-- <v-btn
- Line 218: <!-- <v-btn
- Line 221: $router.push(
- Line 242: <v-btn
- Line 250: <v-btn
- Line 303: <v-btn
- Line 776: <v-btn
- Line 785: <v-btn
- Line 808: <v-btn
- Line 840: <v-btn
- Line 848: <v-btn
- Line 1047: .dispatch(PATCH, {
- Line 1125: .dispatch(POST, {
- Line 1143: .dispatch(DOWNLOAD, {
- Line 1158: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/part/detail/adjustmentListing.vue

- Line 14: <!--  <v-btn
- Line 16: @click="savePriceDialog = true"
- Line 149: <v-btn
- Line 155: @click="addPrice()"
- Line 340: <v-btn
- Line 346: @click="removePrice(index, row)"
- Line 360: <v-btn color="mr-2" tile depressed @click="closeDialog()">Close</v-btn>
- Line 361: <v-btn
- Line 366: @click="savePrice()"
- Line 443: this.$router.replace(

### frontend/src/view/pages/part/detail/AdjustmentSpplierListing.vue

- Line 133: this.$router.replace(
- Line 154: .dispatch(GET, {

### frontend/src/view/pages/part/detail/InventoryTab.vue

- Line 217: .dispatch(QUERY, {

### frontend/src/view/pages/part/detail/ProductAdjustment.vue

- Line 104: <v-btn
- Line 122: <v-btn
- Line 131: $router.push(
- Line 287: <v-btn
- Line 322: <v-btn
- Line 536: .dispatch(PATCH, { url: "product/adjustment", data })
- Line 554: .dispatch(GET, {
- Line 605: .dispatch(QUERY, {

### frontend/src/view/pages/part/detail/ProductPriceListing.vue

- Line 17: <v-btn
- Line 20: @click="savePriceDialog = true"
- Line 116: <v-btn
- Line 122: @click="addPrice()"
- Line 307: <v-btn
- Line 313: @click="removePrice(index, row)"
- Line 327: <v-btn color="mr-2" tile depressed @click="closeDialog()">Close</v-btn>
- Line 328: <v-btn
- Line 334: @click="savePrice()"

### frontend/src/view/pages/part/detail/ProductSpplierListing.vue

- Line 153: this.$router.replace(
- Line 174: .dispatch(GET, {

### frontend/src/view/pages/part/detail/Warranty.vue

- Line 191: <v-btn
- Line 329: <v-btn
- Line 336: <v-btn
- Line 357: <v-btn
- Line 366: <v-btn
- Line 461: .dispatch(DELETE, {
- Line 509: .dispatch(QUERY, {
- Line 527: .dispatch(GET, {

### frontend/src/view/pages/part/Part.vue

- Line 18: <v-btn
- Line 30: <v-btn
- Line 70: <v-btn
- Line 102: <v-btn
- Line 200: <v-btn
- Line 210: <v-btn
- Line 220: <v-btn
- Line 230: <v-btn
- Line 247: <v-btn
- Line 637: <!-- @click.stop.prevent="routeToGo('suppliers', td.uuid)" -->
- Line 822: <v-btn icon small @click="searchDialog = false">
- Line 890: <v-btn
- Line 895: @click="removeFilters('clear')"
- Line 900: <v-btn
- Line 905: @click="filterRows"
- Line 970: <v-btn
- Line 979: <v-btn
- Line 1164: .dispatch(PATCH, {
- Line 1242: .dispatch(POST, {
- Line 1260: .dispatch(DOWNLOAD, {
- Line 1275: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/part/search-template.vue

- Line 302: <v-btn depressed color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn depressed color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

### frontend/src/view/pages/product/adjustment/adjustment.vue

- Line 18: <v-btn
- Line 30: <v-btn
- Line 80: <v-btn
- Line 111: <v-btn
- Line 209: <v-btn
- Line 218: <!-- <v-btn
- Line 226: <!-- <v-btn
- Line 229: $router.push(
- Line 250: <v-btn
- Line 259: <v-btn
- Line 312: <v-btn
- Line 795: <v-btn
- Line 804: <v-btn
- Line 827: <v-btn
- Line 859: <v-btn
- Line 867: <v-btn
- Line 1066: .dispatch(PATCH, {
- Line 1144: .dispatch(POST, {
- Line 1162: .dispatch(DOWNLOAD, {
- Line 1177: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/product/detail/adjustmentListing.vue

- Line 14: <!--  <v-btn
- Line 16: @click="savePriceDialog = true"
- Line 154: <v-btn
- Line 160: @click="addPrice()"
- Line 345: <v-btn
- Line 351: @click="removePrice(index, row)"
- Line 365: <v-btn color="mr-2" tile depressed @click="closeDialog()">Close</v-btn>
- Line 366: <v-btn
- Line 371: @click="savePrice()"
- Line 448: this.$router.replace(

### frontend/src/view/pages/product/detail/AdjustmentSpplierListing.vue

- Line 133: this.$router.replace(
- Line 154: .dispatch(GET, {

### frontend/src/view/pages/product/detail/ProductAdjustment.vue

- Line 112: <v-btn
- Line 130: <v-btn
- Line 139: $router.push(
- Line 295: <v-btn
- Line 330: <v-btn
- Line 545: .dispatch(PATCH, { url: "product/adjustment", data })
- Line 563: .dispatch(GET, {
- Line 614: .dispatch(QUERY, {

### frontend/src/view/pages/product/detail/ProductPriceListing.vue

- Line 17: <v-btn
- Line 20: @click="savePriceDialog = true"
- Line 116: <v-btn
- Line 122: @click="addPrice()"
- Line 305: <v-btn
- Line 311: @click="removePrice(index, row)"
- Line 325: <v-btn color="mr-2" tile depressed @click="closeDialog()">Close</v-btn>
- Line 326: <v-btn
- Line 332: @click="savePrice()"

### frontend/src/view/pages/product/detail/ProductSpplierListing.vue

- Line 34: <v-btn
- Line 179: this.$router.replace(
- Line 202: .dispatch(GET, {

### frontend/src/view/pages/product/detail/Warranty.vue

- Line 199: <v-btn
- Line 337: <v-btn
- Line 344: <v-btn
- Line 365: <v-btn
- Line 374: <v-btn
- Line 471: .dispatch(DELETE, {
- Line 519: .dispatch(QUERY, {
- Line 537: .dispatch(GET, {

### frontend/src/view/pages/product/Product.vue

- Line 18: <v-btn
- Line 30: <v-btn
- Line 80: <v-btn
- Line 112: <v-btn
- Line 210: <v-btn
- Line 220: <v-btn
- Line 230: <v-btn
- Line 240: <v-btn
- Line 249: <!--   <v-btn
- Line 252: $router.push(
- Line 268: <v-btn
- Line 321: <v-btn
- Line 746: <!-- @click.stop.prevent="routeToGo('suppliers', td.uuid)" -->
- Line 932: <v-btn icon small @click="searchDialog = false">
- Line 1000: <v-btn
- Line 1005: @click="removeFilters('clear')"
- Line 1010: <v-btn
- Line 1015: @click="filterRows"
- Line 1080: <v-btn
- Line 1089: <v-btn
- Line 1112: <v-btn
- Line 1144: <v-btn
- Line 1152: <v-btn
- Line 1337: .dispatch(PATCH, {
- Line 1415: .dispatch(POST, {
- Line 1433: .dispatch(DOWNLOAD, {
- Line 1448: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/product/search-template.vue

- Line 302: <v-btn depressed color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn depressed color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

## Item/detail/create/edit page actions

### frontend/src/view/pages/part/adjustment/Create-Adjustment.vue

- Line 21: <v-btn
- Line 30: <!--  <v-btn
- Line 39: <v-btn
- Line 66: @click:clear="getproduct"
- Line 797: <!-- <v-btn
- Line 816: <v-btn
- Line 909: <v-btn
- Line 916: <v-btn
- Line 1159: .dispatch(DELETE, { url: "line-item/" + id }) */
- Line 1221: .dispatch(GET, { url: "product/get-line-products" })
- Line 1290: .dispatch(GET, { url: `supplier/options/${id}`, supplier: id })
- Line 1308: .dispatch(GET, { url: "listing/all" })
- Line 1352: .dispatch(POST, {
- Line 1379: .dispatch(PUT, {
- Line 1411: _this.$router.push({ name: "admin.adjustment" });
- Line 1415: _this.$router.go(-1);
- Line 1439: .dispatch(QUERY, {
- Line 1535: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1541: this.$store.dispatch(SET_LOCAL_DB).then(() => {

### frontend/src/view/pages/part/adjustment/Detail-Adjustment.vue

- Line 49: <!--  <v-btn
- Line 80: <!-- <v-btn
- Line 94: <v-btn
- Line 389: .dispatch(PATCH, {
- Line 424: this.$router.push(
- Line 433: this.$router.push(
- Line 444: this.$router.push(
- Line 457: .dispatch(GET, {
- Line 463: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 482: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 491: _this.$router.go(-1);
- Line 504: this.$router.push({ query });

### frontend/src/view/pages/part/Create-Part.vue

- Line 17: <v-btn
- Line 25: <v-btn
- Line 132: this.$store.dispatch(CLEAR_ERROR);
- Line 150: .dispatch(GET, { url: "parts/" + productId })
- Line 176: .dispatch(POST, {
- Line 241: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 253: .dispatch(requestType, { url: requestURL, data: _this.productCreate })
- Line 259: _this.$router.push(
- Line 280: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 401: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 505: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 521: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 533: _this.$router.go(-1);

### frontend/src/view/pages/part/Create-Partcopy.vue

- Line 27: <v-btn
- Line 38: <v-btn
- Line 104: this.$store.dispatch(CLEAR_ERROR);
- Line 115: .dispatch(GET, { url: "product/" + productId })
- Line 141: .dispatch(POST, {
- Line 180: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 192: .dispatch(requestType, { url: requestURL, data: _this.productCreate })
- Line 198: _this.$router.push(
- Line 219: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 323: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 427: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 443: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 455: _this.$router.go(-1);

### frontend/src/view/pages/part/detail/adjustmentOverview.vue

- Line 883: .dispatch(QUERY, {

### frontend/src/view/pages/part/detail/Overview.vue

- Line 910: .dispatch(QUERY, {

### frontend/src/view/pages/part/Detail-Part.vue

- Line 9: <!-- <v-btn v-on:click="goBack" icon plain>
- Line 327: <v-btn
- Line 359: <v-btn
- Line 373: <v-btn
- Line 524: <!-- <v-btn-toggle
- Line 530: <v-btn value="available"> Available (0) </v-btn>
- Line 532: <v-btn value="sold"> Sold (0)</v-btn>
- Line 836: .dispatch(GET, {
- Line 851: .dispatch(PATCH, {
- Line 886: this.$router.push(
- Line 895: this.$router.push(
- Line 905: this.$router.push(
- Line 918: .dispatch(GET, {
- Line 930: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 950: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 959: _this.$router.go(-1);
- Line 972: this.$router.push({ query });

### frontend/src/view/pages/part/partials/Create copy.vue

- Line 336: <v-btn
- Line 338: @click="addCostSupplier()"
- Line 394: <v-btn
- Line 397: @click="removeCostSupplier(index)"
- Line 481: <v-btn
- Line 486: @click="addPrice()"
- Line 676: <v-btn
- Line 682: @click="removePrice(index, row)"
- Line 750: <v-btn
- Line 755: @click="addSupplier()"
- Line 915: <v-btn
- Line 920: @click="removeSupplier(index, row)"
- Line 1379: <v-btn
- Line 1391: <v-btn
- Line 1447: <v-btn
- Line 1459: <v-btn
- Line 1659: this.$store.dispatch(CLEAR_ERROR);
- Line 1959: .dispatch(PATCH, {
- Line 2074: .dispatch(DELETE, {
- Line 2094: .dispatch(QUERY, {
- Line 2203: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 2276: this.$store.dispatch(SET_LOCAL_DB).then(() => {

### frontend/src/view/pages/part/partials/Create.vue

- Line 77: <v-btn
- Line 236: <v-icon small @click="BrandData">mdi-cog</v-icon>
- Line 244: <v-icon small @click="manageCategoryDialog = true"
- Line 407: <v-btn
- Line 409: @click="addCostSupplier()"
- Line 469: <v-btn
- Line 472: @click="removeCostSupplier(index)"
- Line 544: <v-btn
- Line 549: @click="addPrice()"
- Line 666: <v-btn
- Line 672: @click="removePrice(index, row)"
- Line 852: <v-btn
- Line 857: @click="addSupplier()"
- Line 1005: <v-btn
- Line 1010: @click="removeSupplier(index, row)"
- Line 1210: <v-btn
- Line 1222: <v-btn
- Line 1315: <v-icon small @click="UomData">mdi-cog</v-icon>
- Line 1534: <v-btn
- Line 1538: @click="importDialog = true"
- Line 1623: <v-btn
- Line 1633: @click="generatePrefixes()"
- Line 1671: @click="deleteNumber(rowindex)"
- Line 1730: <v-btn
- Line 1850: this.$store.dispatch(CLEAR_ERROR);
- Line 2338: .dispatch(PATCH, {
- Line 2453: .dispatch(DELETE, {
- Line 2473: .dispatch(QUERY, {
- Line 2576: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 2582: .dispatch(GET, {
- Line 2589: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 2670: this.$store.dispatch(SET_LOCAL_DB).then(() => {

### frontend/src/view/pages/product/adjustment/Create-Adjustment.vue

- Line 18: <v-btn
- Line 26: <v-btn
- Line 72: @click:clear="getproduct"
- Line 845: <!-- <v-btn
- Line 864: <v-btn
- Line 963: <v-btn
- Line 970: <v-btn
- Line 1233: .dispatch(DELETE, { url: "line-item/" + id }) */
- Line 1295: .dispatch(GET, { url: "product/get-line-products" })
- Line 1364: .dispatch(GET, { url: `supplier/options/${id}`, supplier: id })
- Line 1382: .dispatch(GET, { url: "listing/all" })
- Line 1426: .dispatch(POST, {
- Line 1454: .dispatch(PUT, {
- Line 1486: _this.$router.push({ name: "admin.adjustment" });
- Line 1490: _this.$router.go(-1);
- Line 1513: .dispatch(QUERY, {
- Line 1610: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1616: this.$store.dispatch(SET_LOCAL_DB).then(() => {

### frontend/src/view/pages/product/adjustment/Detail-Adjustment.vue

- Line 49: <!--  <v-btn
- Line 80: <!-- <v-btn
- Line 94: <v-btn
- Line 390: .dispatch(PATCH, {
- Line 425: this.$router.push(
- Line 434: this.$router.push(
- Line 445: this.$router.push(
- Line 458: .dispatch(GET, {
- Line 464: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 483: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 492: _this.$router.go(-1);
- Line 505: this.$router.push({ query });

### frontend/src/view/pages/product/Create-Product copy.vue

- Line 27: <v-btn
- Line 38: <v-btn
- Line 104: this.$store.dispatch(CLEAR_ERROR);
- Line 115: .dispatch(GET, { url: "product/" + productId })
- Line 141: .dispatch(POST, {
- Line 180: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 192: .dispatch(requestType, { url: requestURL, data: _this.productCreate })
- Line 198: _this.$router.push(
- Line 219: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 323: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 427: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 443: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 455: _this.$router.go(-1);

### frontend/src/view/pages/product/Create-Product.vue

- Line 18: <v-btn
- Line 26: <v-btn
- Line 72: <v-btn
- Line 83: <v-btn
- Line 168: this.$store.dispatch(CLEAR_ERROR);
- Line 186: .dispatch(GET, { url: "product/" + productId })
- Line 212: .dispatch(POST, {
- Line 277: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 289: .dispatch(requestType, { url: requestURL, data: _this.productCreate })
- Line 296: _this.$router.push(
- Line 317: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 438: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 542: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 558: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 570: _this.$router.go(-1);

### frontend/src/view/pages/product/detail/adjustmentOverview.vue

- Line 911: .dispatch(QUERY, {

### frontend/src/view/pages/product/detail/Overview.vue

- Line 1008: .dispatch(QUERY, {

### frontend/src/view/pages/product/Detail-Product.vue

- Line 9: <!-- <v-btn v-on:click="goBack" icon plain>
- Line 384: <v-btn
- Line 416: <v-btn
- Line 430: <v-btn
- Line 587: <!-- <v-btn-toggle
- Line 593: <v-btn value="available"> Available (0) </v-btn>
- Line 595: <v-btn value="sold"> Sold (0)</v-btn>
- Line 900: .dispatch(PATCH, {
- Line 918: .dispatch(GET, {
- Line 950: this.$router.push(
- Line 959: this.$router.push(
- Line 970: this.$router.push(
- Line 983: .dispatch(GET, {
- Line 995: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1015: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1024: _this.$router.go(-1);
- Line 1037: this.$router.push({ query });

### frontend/src/view/pages/product/partials/Create copy.vue

- Line 336: <v-btn
- Line 338: @click="addCostSupplier()"
- Line 394: <v-btn
- Line 397: @click="removeCostSupplier(index)"
- Line 481: <v-btn
- Line 486: @click="addPrice()"
- Line 676: <v-btn
- Line 682: @click="removePrice(index, row)"
- Line 750: <v-btn
- Line 755: @click="addSupplier()"
- Line 915: <v-btn
- Line 920: @click="removeSupplier(index, row)"
- Line 1379: <v-btn
- Line 1391: <v-btn
- Line 1447: <v-btn
- Line 1459: <v-btn
- Line 1659: this.$store.dispatch(CLEAR_ERROR);
- Line 1959: .dispatch(PATCH, {
- Line 2074: .dispatch(DELETE, {
- Line 2094: .dispatch(QUERY, {
- Line 2203: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 2276: this.$store.dispatch(SET_LOCAL_DB).then(() => {

### frontend/src/view/pages/product/partials/Create.vue

- Line 56: <v-btn
- Line 191: <v-icon small @click="BrandData">mdi-cog</v-icon>
- Line 199: <v-icon small @click="manageCategoryDialog = true"
- Line 362: <v-btn
- Line 364: @click="addCostSupplier()"
- Line 424: <v-btn
- Line 427: @click="removeCostSupplier(index)"
- Line 498: <v-btn
- Line 503: @click="addPrice()"
- Line 620: <v-btn
- Line 626: @click="removePrice(index, row)"
- Line 805: <v-btn
- Line 810: @click="addSupplier()"
- Line 958: <v-btn
- Line 963: @click="removeSupplier(index, row)"
- Line 1163: <v-btn
- Line 1175: <v-btn
- Line 1258: <v-icon small @click="UomData">mdi-cog</v-icon>
- Line 1473: <v-btn
- Line 1477: @click="importDialog = true"
- Line 1562: <v-btn
- Line 1572: @click="generatePrefixes()"
- Line 1610: @click="deleteNumber(rowindex)"
- Line 1670: <v-btn
- Line 1792: this.$store.dispatch(CLEAR_ERROR);
- Line 2276: .dispatch(PATCH, {
- Line 2391: .dispatch(DELETE, {
- Line 2411: .dispatch(QUERY, {
- Line 2513: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 2519: .dispatch(GET, {
- Line 2526: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 2604: this.$store.dispatch(SET_LOCAL_DB).then(() => {

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

