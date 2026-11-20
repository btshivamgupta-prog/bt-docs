# equipment-assets — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Assets depend on Customer/Site and Product/Part data; Jobs, Visits, Warranty, Rental, and Preventive Maintenance consume asset records.

## Listing page actions

### frontend/src/view/pages/equipment/detail/Warranty.vue

- Line 191: <v-btn
- Line 328: <v-btn
- Line 335: <v-btn
- Line 356: <v-btn
- Line 365: <v-btn
- Line 460: .dispatch(DELETE, {
- Line 508: .dispatch(QUERY, {
- Line 526: .dispatch(GET, {

### frontend/src/view/pages/equipment/Equipment.vue

- Line 19: <v-btn
- Line 30: <v-btn
- Line 78: <v-btn
- Line 109: <v-btn
- Line 395: <v-btn
- Line 404: <v-btn
- Line 413: <!-- <v-btn
- Line 419: $router.push(
- Line 432: <v-btn
- Line 440: <v-btn
- Line 476: <!-- <v-btn
- Line 484: <v-btn
- Line 521: <v-btn
- Line 567: <v-btn
- Line 1351: <v-btn icon color="red lighten-1"
- Line 1469: <v-btn icon small @click="searchDialog = false">
- Line 1532: <v-btn
- Line 1537: @click="removeFilters('clear')"
- Line 1542: <v-btn
- Line 1607: <v-btn
- Line 1616: <v-btn
- Line 1821: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1852: .dispatch(PATCH, {
- Line 1871: this.$router.push(
- Line 1880: this.$router.push(

### frontend/src/view/pages/equipment/Equipment-Company.vue

- Line 19: <v-btn
- Line 30: <v-btn
- Line 78: <v-btn
- Line 109: <v-btn
- Line 429: <v-btn
- Line 438: <v-btn
- Line 447: <!-- <v-btn
- Line 453: $router.push(
- Line 466: <v-btn
- Line 474: <v-btn
- Line 510: <!-- <v-btn
- Line 518: <v-btn
- Line 555: <v-btn
- Line 601: <v-btn
- Line 1401: <v-btn icon color="red lighten-1"
- Line 1519: <v-btn icon small @click="searchDialog = false">
- Line 1582: <v-btn
- Line 1587: @click="removeFilters('clear')"
- Line 1592: <v-btn
- Line 1658: <v-btn
- Line 1667: <v-btn
- Line 1874: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1905: .dispatch(PATCH, {
- Line 1923: this.$router.push(
- Line 1932: this.$router.push(
- Line 1941: this.$router.push(

### frontend/src/view/pages/equipment-client/detail/Warranty.vue

- Line 191: <v-btn
- Line 328: <v-btn
- Line 335: <v-btn
- Line 356: <v-btn
- Line 365: <v-btn
- Line 460: .dispatch(DELETE, {
- Line 508: .dispatch(QUERY, {
- Line 526: .dispatch(GET, {

### frontend/src/view/pages/equipment-client/Equipment.vue

- Line 35: <v-btn
- Line 66: <v-btn
- Line 337: <v-btn
- Line 346: <v-btn
- Line 355: <!-- <v-btn
- Line 361: $router.push(
- Line 374: <v-btn
- Line 382: <v-btn
- Line 418: <!-- <v-btn
- Line 426: <v-btn
- Line 463: <v-btn
- Line 509: <v-btn
- Line 971: @click.stop=""
- Line 1550: <v-btn icon color="red lighten-1"
- Line 1668: <v-btn icon small @click="searchDialog = false">
- Line 1718: <v-btn
- Line 1723: @click="removeFilters('clear')"
- Line 1728: <v-btn
- Line 1778: <v-btn
- Line 1787: <v-btn
- Line 1983: .dispatch(PATCH, {
- Line 2002: this.$router.push(
- Line 2011: this.$router.push(
- Line 2127: .dispatch(GET, { url: "equipment/options" })
- Line 2141: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment/Asset.vue

- Line 18: <v-btn
- Line 29: <v-btn
- Line 77: <v-btn
- Line 108: <v-btn
- Line 160: <v-btn
- Line 169: <v-btn
- Line 177: <v-btn
- Line 183: $router.push(
- Line 196: <v-btn
- Line 204: <v-btn
- Line 241: <v-btn
- Line 285: <v-btn
- Line 420: @click="goToAsset"
- Line 773: <v-btn
- Line 781: <v-btn
- Line 827: <v-btn depressed tile v-on:click="barcodeDialog = false"
- Line 962: this.$router.push({ path: "admin/cdscsdcdc" });
- Line 1037: .dispatch(POST, {
- Line 1053: .dispatch(PATCH, {

### frontend/src/view/pages/new-equipment/reminder.vue

- Line 63: <v-btn
- Line 257: .dispatch(PATCH, {

### frontend/src/view/pages/new-equipment-client/Asset.vue

- Line 18: <v-btn
- Line 29: <v-btn
- Line 77: <v-btn
- Line 108: <v-btn
- Line 160: <v-btn
- Line 169: <v-btn
- Line 177: <v-btn
- Line 183: $router.push(
- Line 196: <v-btn
- Line 204: <v-btn
- Line 241: <v-btn
- Line 285: <v-btn
- Line 420: @click="goToAsset"
- Line 773: <v-btn
- Line 781: <v-btn
- Line 827: <v-btn depressed tile v-on:click="barcodeDialog = false"
- Line 962: this.$router.push({ path: "admin/cdscsdcdc" });
- Line 1037: .dispatch(POST, {
- Line 1053: .dispatch(PATCH, {

### frontend/src/view/pages/new-equipment-client/reminder.vue

- Line 63: <v-btn
- Line 257: .dispatch(PATCH, {

### frontend/src/view/pages/rental/detail/Warranty.vue

- Line 191: <v-btn
- Line 328: <v-btn
- Line 335: <v-btn
- Line 356: <v-btn
- Line 365: <v-btn
- Line 460: .dispatch(DELETE, {
- Line 508: .dispatch(QUERY, {
- Line 526: .dispatch(GET, {

### frontend/src/view/pages/rental/Rental.vue

- Line 31: <v-btn
- Line 43: <v-btn
- Line 156: <v-btn
- Line 173: <v-btn
- Line 681: <v-btn
- Line 689: <v-btn
- Line 833: .dispatch(PATCH, {
- Line 852: this.$router.push(
- Line 861: this.$router.push(
- Line 973: .dispatch(GET, { url: "rental/options" })

### frontend/src/view/pages/warranty/Extension-Log.vue

- Line 153: <v-btn
- Line 158: @click="showDescription(row.description)"
- Line 199: <v-btn
- Line 253: .dispatch(GET, { url: `warranty-extension/${this.relatedId}` })

### frontend/src/view/pages/warranty/Terminat-Warranty.vue

- Line 128: <v-btn
- Line 139: <v-btn
- Line 161: <v-btn
- Line 170: <v-btn
- Line 273: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 303: .dispatch(requestTYPE, {
- Line 365: .dispatch(GET, { url: "customer-list" })
- Line 376: .dispatch(GET, { url: "equipment-list" })
- Line 387: .dispatch(GET, { url: "warranty/options" })

### frontend/src/view/pages/warranty/Warranty.vue

- Line 18: <v-btn
- Line 29: <v-btn
- Line 77: <v-btn
- Line 109: <v-btn
- Line 399: <v-btn
- Line 408: <v-btn
- Line 418: <v-btn
- Line 425: $router.push(
- Line 438: <v-btn
- Line 446: <v-btn
- Line 483: <v-btn
- Line 529: <v-btn
- Line 684: <v-btn
- Line 705: <v-btn
- Line 726: <v-btn
- Line 755: <v-btn
- Line 1237: <v-btn icon small @click="searchDialog = false">
- Line 1281: <v-btn
- Line 1286: @click="removeFilters('clear')"
- Line 1291: <v-btn
- Line 1341: <v-btn
- Line 1349: <v-btn
- Line 1607: .dispatch(GET, {
- Line 1629: .dispatch(GET, { url: "customer-list" })
- Line 1655: this.$router.push(
- Line 1663: this.$router.push(
- Line 1740: .dispatch(POST, {
- Line 1756: .dispatch(PATCH, {
- Line 1773: .dispatch(DOWNLOAD, {
- Line 1788: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/warranty/WarrantyOld.vue

- Line 340: <v-btn
- Line 363: <v-btn
- Line 462: $router.push(
- Line 590: <v-btn
- Line 606: <v-btn
- Line 615: <v-btn
- Line 623: <v-btn
- Line 673: <v-btn
- Line 682: <v-btn
- Line 876: this.$router.push(
- Line 884: this.$router.push(
- Line 925: .dispatch(DELETE, {
- Line 948: .dispatch(DELETE, {
- Line 978: .dispatch(GET, { url: "job/list-all" })
- Line 989: .dispatch(GET, { url: "product/warranty" })
- Line 1029: .dispatch(QUERY, {
- Line 1061: .dispatch(GET, { url: "customer-list" })
- Line 1072: .dispatch(GET, { url: "product/get-line-product-service" })
- Line 1088: _this.$router
- Line 1130: _this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/equipment/Create-Equipment.vue

- Line 12: <v-btn
- Line 20: <v-btn
- Line 445: <v-btn
- Line 460: <v-btn
- Line 904: .dispatch(DELETE, {
- Line 938: .dispatch(POST, {
- Line 963: .dispatch(QUERY, {
- Line 987: .dispatch(GET, {
- Line 1061: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1103: _this.equipmentObject = await _this.$store.dispatch(POST, {
- Line 1115: _this.$router.push(
- Line 1139: .dispatch(QUERY, {
- Line 1181: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/equipment/Detail-Company-Equipment.vue

- Line 136: <v-btn
- Line 168: <v-btn
- Line 186: <v-btn
- Line 660: .dispatch(PATCH, {
- Line 712: this.$router.push(
- Line 724: .dispatch(GET, {
- Line 775: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 801: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 814: _this.$router.go(-1);
- Line 827: this.$router.push({ query });

### frontend/src/view/pages/equipment/Detail-Equipment.vue

- Line 109: <v-btn
- Line 141: <v-btn
- Line 159: <v-btn
- Line 489: .dispatch(PATCH, {
- Line 535: this.$router.push(
- Line 547: .dispatch(GET, {
- Line 598: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 624: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 645: _this.$router.go(-1);
- Line 658: this.$router.push({ query });

### frontend/src/view/pages/equipment/Update-Equipment.vue

- Line 11: <v-btn
- Line 19: <v-btn
- Line 335: <v-btn
- Line 350: <v-btn
- Line 761: .dispatch(DELETE, {
- Line 795: .dispatch(POST, {
- Line 820: .dispatch(QUERY, {
- Line 841: .dispatch(GET, {
- Line 915: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 951: _this.equipmentObject = await _this.$store.dispatch(PUT, {
- Line 963: _this.$router.push(
- Line 989: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/equipment-client/Create-Equipment.vue

- Line 11: <v-btn
- Line 19: <v-btn
- Line 443: <v-btn
- Line 458: <v-btn
- Line 904: .dispatch(DELETE, {
- Line 938: .dispatch(POST, {
- Line 963: .dispatch(QUERY, {
- Line 987: .dispatch(GET, {
- Line 1061: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1103: _this.equipmentObject = await _this.$store.dispatch(POST, {
- Line 1115: _this.$router.push(
- Line 1139: .dispatch(QUERY, {
- Line 1181: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/equipment-client/Detail-Equipment.vue

- Line 68: <v-btn :disabled="pageLoading" class="mx-2 custom-bold-button white--text" color="cyan" depressed
- Line 91: <v-btn :disabled="pageLoading" :loading="pageLoading" class="mx-2 custom-bold-button white--text" color="cyan"
- Line 101: <v-btn class="mx-2 custom-grey-border custom-bold-button" depressed v-on:click="goBack">
- Line 239: <v-btn color="cyan" depressed class="custom-bold-button white--text" @click="loadMoreSampleData">
- Line 303: <v-btn depressed class="mx-2 custom-grey-border custom-bold-button white--text" color="cyan"
- Line 307: <v-btn depressed class="mx-2 custom-grey-border custom-bold-button" v-on:click="typeConfirmDialog = false">
- Line 568: Promise.all(rows.map((row) => this.$store.dispatch(POST, {
- Line 599: _this.$router.push(
- Line 632: .dispatch(PATCH, {
- Line 681: this.$router.push(
- Line 693: .dispatch(GET, {
- Line 744: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 762: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 784: _this.$router.go(-1);

### frontend/src/view/pages/equipment-client/Update-Equipment.vue

- Line 11: <v-btn
- Line 19: <v-btn
- Line 335: <v-btn
- Line 349: <v-btn
- Line 759: .dispatch(DELETE, {
- Line 793: .dispatch(POST, {
- Line 818: .dispatch(QUERY, {
- Line 839: .dispatch(GET, {
- Line 913: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 949: _this.equipmentObject = await _this.$store.dispatch(PUT, {
- Line 961: _this.$router.push(
- Line 987: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment/Create-Company-Equipment.vue

- Line 30: <v-btn
- Line 40: <v-btn
- Line 96: <v-btn
- Line 790: <v-icon @click="manage_brand = true" small
- Line 830: @click="manageGroupDialog = true"
- Line 991: <v-btn
- Line 996: @click="addCert_dialog = true"
- Line 1068: <v-btn
- Line 1073: @click="removeCert(index)"
- Line 1305: @click="manage_location = true"
- Line 2092: <v-btn
- Line 2109: <v-btn
- Line 2199: <v-btn
- Line 2216: <v-btn
- Line 2570: <v-btn
- Line 2590: <v-btn
- Line 2716: <v-btn
- Line 2735: <v-btn
- Line 3143: this.$store.dispatch(CLEAR_ERROR, {});
- Line 3218: this.$router.push(
- Line 3227: this.$router.push(
- Line 3236: this.$router.push(
- Line 3327: .dispatch(GET, { url: `equipment/${this.equipmentId}` })
- Line 3502: .dispatch(QUERY, {
- Line 4379: .dispatch(requestTYPE, {
- Line 4405: this.$store.dispatch(SET_BREADCRUMB, [
- Line 4412: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment/Create-New-Equipment copy.vue

- Line 25: <v-btn
- Line 35: <v-btn
- Line 116: <v-btn
- Line 131: <v-btn
- Line 1411: <v-btn
- Line 1838: <v-btn
- Line 1856: <v-btn
- Line 1957: <v-btn
- Line 1974: <v-btn
- Line 2325: <v-btn
- Line 2345: <v-btn
- Line 2471: <v-btn
- Line 2490: <v-btn
- Line 2833: this.$store.dispatch(CLEAR_ERROR, {});
- Line 2851: this.$router.push(
- Line 2860: this.$router.push(
- Line 2869: this.$router.push(
- Line 3013: .dispatch(GET, { url: `equipment/${this.equipmentId}` })
- Line 3165: .dispatch(QUERY, {
- Line 3956: .dispatch(requestTYPE, {
- Line 3982: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3989: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment/Create-New-Equipment.vue

- Line 31: <v-btn
- Line 41: <v-btn
- Line 97: <v-btn
- Line 224: <v-icon @click="manage_brand = true" small
- Line 264: @click="manageGroupDialog = true"
- Line 548: @click="manage_location = true"
- Line 1351: <v-btn
- Line 1369: <v-btn
- Line 1470: <v-btn
- Line 1487: <v-btn
- Line 1903: this.$store.dispatch(CLEAR_ERROR, {});
- Line 1959: this.$router.push(
- Line 1968: this.$router.push(
- Line 1977: this.$router.push(
- Line 2067: .dispatch(GET, { url: `equipment/${this.equipmentId}` })
- Line 2232: .dispatch(QUERY, {
- Line 3055: .dispatch(requestTYPE, {
- Line 3081: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3088: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment/Detail-Asset.vue

- Line 124: <v-btn
- Line 166: <v-btn
- Line 193: <v-btn
- Line 268: <v-btn
- Line 304: <v-btn
- Line 452: <v-btn
- Line 461: <v-btn
- Line 513: <v-btn
- Line 524: <v-btn
- Line 560: <v-btn
- Line 569: <v-btn
- Line 603: <v-btn
- Line 612: <v-btn
- Line 827: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 834: this.$store.dispatch(SET_CC_PERSONS, _this.customerArr.persons);
- Line 839: _this.$router.go(-1);
- Line 850: .dispatch(GET, { url: "asset/" + _this.customer })
- Line 903: .dispatch(PATCH, {
- Line 1005: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1080: await _this.$store.dispatch(PATCH, {
- Line 1087: await _this.$store.dispatch(PUT, {
- Line 1094: await _this.$store.dispatch(PUT, {
- Line 1101: await _this.$store.dispatch(PUT, {
- Line 1169: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1176: this.$store.dispatch(SET_CC_PERSONS, _this.customerArr.persons);
- Line 1181: _this.$router.go(-1);
- Line 1191: _this.$router.go(-1);
- Line 1216: this.$router.push({ query });

### frontend/src/view/pages/new-equipment/overview.vue

- Line 630: <v-btn depressed tile v-on:click="barcodeDialog = false"
- Line 796: .dispatch(QUERY, {

### frontend/src/view/pages/new-equipment-client/Create-Client-Equipment.vue

- Line 25: <v-btn
- Line 36: <v-btn
- Line 92: <v-btn
- Line 817: @click="manage_oil_type = true"
- Line 932: <v-icon small @click="manage_brand = true"
- Line 968: <v-icon small @click="manageGroupDialog = true"
- Line 1381: this.$store.dispatch(CLEAR_ERROR, {});
- Line 1505: .dispatch(GET, { url: `equipment/${this.equipmentId}` })
- Line 1625: .dispatch(QUERY, {
- Line 2065: .dispatch(requestTYPE, {
- Line 2072: this.$router.push(
- Line 2091: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2096: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment-client/Create-Client-Equipment_06_04_2026.vue

- Line 18: <v-btn depresed v-if="!isCustomer" v-on:click="goBack" :disabled="formLoading" depressed
- Line 23: <v-btn depresed :disabled="!formValid || formLoading" :loading="formLoading"
- Line 54: <v-btn class="my-4 custom-bold-button" outlined small v-on:click="selectImage" color="cyan"
- Line 550: @click="manage_oil_type = true">mdi-cog</v-icon>
- Line 642: <v-icon small @click="manage_brand = true">mdi-cog</v-icon>
- Line 658: <v-icon small @click="manageGroupDialog = true">mdi-cog</v-icon>
- Line 1321: <v-btn :disabled="asset.warranty_reminder.length < 2
- Line 1328: <v-btn :disabled="asset.warranty_reminder.length > 4 ||
- Line 1383: <v-btn :disabled="wtx_attachments.length < 2"
- Line 1390: <v-btn :disabled="wtx_attachments.length > 4" v-on:click="addMoreWarranty()"
- Line 1605: <v-btn :disabled="mtx_attachments.length < 2
- Line 1614: <v-btn :disabled="mtx_attachments.length > 4 ||
- Line 1992: this.$store.dispatch(CLEAR_ERROR, {});
- Line 2210: .dispatch(GET, { url: `equipment/${this.equipmentId}` })
- Line 2392: .dispatch(QUERY, {
- Line 3242: .dispatch(requestTYPE, {
- Line 3253: this.$router.push(
- Line 3272: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3279: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/new-equipment-client/Detail-Asset.vue

- Line 124: <v-btn
- Line 166: <v-btn
- Line 193: <v-btn
- Line 268: <v-btn
- Line 304: <v-btn
- Line 452: <v-btn
- Line 461: <v-btn
- Line 512: <v-btn
- Line 523: <v-btn
- Line 559: <v-btn
- Line 568: <v-btn
- Line 602: <v-btn
- Line 611: <v-btn
- Line 820: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 827: this.$store.dispatch(SET_CC_PERSONS, _this.customerArr.persons);
- Line 832: _this.$router.go(-1);
- Line 843: .dispatch(GET, { url: "asset/" + _this.customer })
- Line 888: .dispatch(PATCH, {
- Line 990: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1065: await _this.$store.dispatch(PATCH, {
- Line 1072: await _this.$store.dispatch(PUT, {
- Line 1079: await _this.$store.dispatch(PUT, {
- Line 1086: await _this.$store.dispatch(PUT, {
- Line 1154: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1161: this.$store.dispatch(SET_CC_PERSONS, _this.customerArr.persons);
- Line 1166: _this.$router.go(-1);
- Line 1176: _this.$router.go(-1);
- Line 1201: this.$router.push({ query });

### frontend/src/view/pages/new-equipment-client/overview.vue

- Line 630: <v-btn depressed tile v-on:click="barcodeDialog = false"
- Line 796: .dispatch(QUERY, {

### frontend/src/view/pages/rental/Create-New-Rental.vue

- Line 36: <v-btn
- Line 43: <v-btn
- Line 618: <v-btn
- Line 945: .dispatch(SET_CUSTOMER, row)
- Line 1030: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1152: .dispatch(requestType, { url: requestURL, data: request })
- Line 1154: this.$store.dispatch(RESET_STATE);
- Line 1155: this.$store.dispatch(CLEAR_LINE_ITEM);
- Line 1158: this.$router.push(
- Line 1176: .dispatch(QUERY, {
- Line 1185: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1191: this.$store.dispatch(
- Line 1196: this.$store.dispatch(
- Line 1315: this.$store.dispatch(SET_EDIT_CALCULATION, {
- Line 1333: this.$store.dispatch(SET_EDIT_LINE_ITEM, lineItemsToSet);
- Line 1339: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1362: this.$store.dispatch(SET_BREADCRUMB, []);
- Line 1383: this.$store.dispatch(RESET_STATE);
- Line 1384: this.$store.dispatch(CLEAR_LINE_ITEM);
- Line 1397: this.$store.dispatch(RESET_STATE);
- Line 1398: this.$store.dispatch(CLEAR_LINE_ITEM);

### frontend/src/view/pages/rental/Detail-Rental.vue

- Line 36: <v-btn
- Line 67: <v-btn
- Line 102: <v-btn
- Line 116: <v-btn v-on:click="goBack()" depressed class="custom-bold-button"
- Line 811: <v-btn
- Line 827: <v-btn
- Line 834: <v-btn
- Line 953: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 973: .dispatch(PATCH, {
- Line 1055: this.$router.push(
- Line 1062: this.$router.push(
- Line 1069: this.$router.push(
- Line 1077: this.$router.push(
- Line 1084: this.$router.push(
- Line 1092: .dispatch(GET, {
- Line 1106: this.$router.push(
- Line 1128: this.$router.push(
- Line 1144: this.$router.push(
- Line 1163: .dispatch(GET, { url: "rental/" + id })
- Line 1166: this.$store.dispatch(SET_VIEW_CALCULATION, {
- Line 1183: this.$store.dispatch(SET_VIEW_LINE_ITEM, data.line_item);
- Line 1184: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/rental/partials/Create.vue

- Line 278: <v-btn
- Line 283: @click="addPrice()"
- Line 389: <v-btn
- Line 395: @click="removePrice(index, row)"
- Line 611: this.$store.dispatch(CLEAR_ERROR);
- Line 857: .dispatch(PATCH, {
- Line 972: .dispatch(DELETE, {
- Line 992: .dispatch(QUERY, {
- Line 1108: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 1169: this.$store.dispatch(SET_LOCAL_DB).then(() => {

### frontend/src/view/pages/warranty/Extended-Warranty.vue

- Line 705: <v-btn
- Line 718: <v-btn
- Line 772: <v-btn
- Line 783: <v-btn
- Line 805: <v-btn
- Line 814: <v-btn
- Line 1069: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1158: .dispatch(requestTYPE, {
- Line 1196: .dispatch(QUERY, { url: `equipment/${id}` })
- Line 1215: .dispatch(GET, { url: "customer-list" })
- Line 1226: .dispatch(GET, { url: "equipment-list" })
- Line 1240: .dispatch(QUERY, {

### frontend/src/view/pages/warranty/Renew-Warranty.vue

- Line 708: <v-btn
- Line 721: <v-btn
- Line 775: <v-btn
- Line 786: <v-btn
- Line 808: <v-btn
- Line 817: <v-btn
- Line 1083: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1172: .dispatch(requestTYPE, {
- Line 1210: .dispatch(QUERY, { url: `equipment/${id}` })
- Line 1229: .dispatch(GET, { url: "customer-list" })
- Line 1240: .dispatch(GET, { url: "equipment-list" })
- Line 1254: .dispatch(QUERY, {

### frontend/src/view/pages/warranty/Warranty-Detail.vue

- Line 636: <v-btn
- Line 660: <v-btn
- Line 684: <v-btn
- Line 699: <v-btn
- Line 1110: @click="
- Line 2027: this.$router.push(
- Line 2126: this.$router.push(
- Line 2153: .dispatch(GET, {
- Line 2164: _this.$store.dispatch(SET_BREADCRUMB, [

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

