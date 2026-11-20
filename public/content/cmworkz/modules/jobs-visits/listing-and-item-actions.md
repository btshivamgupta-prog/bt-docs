# jobs-visits — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Jobs depend on Customer/Site, Engineer/Team, Products/Parts, Equipment, Service Forms, Quotations/Contracts, Invoices, Calendar, and Tracking.

## Listing page actions

### frontend/src/view/pages/assessment/Assessment.vue

- Line 317: this.$store.dispatch(SET_BREADCRUMB, [{ title: this.title }]);
- Line 367: .dispatch(QUERY, {
- Line 403: this.$router.push({ query });

### frontend/src/view/pages/assessment/Assessment-Listing-Template.vue

- Line 12: <v-btn
- Line 30: <v-btn
- Line 52: <v-btn
- Line 327: @click="data.select"
- Line 328: @click:close="remove(data.item)"
- Line 518: <v-btn
- Line 621: $router.push(
- Line 1223: <v-btn
- Line 1347: <v-btn
- Line 1354: <v-btn
- Line 1671: .dispatch(POST, {
- Line 1684: this.$router.push(
- Line 1704: this.$router.push({
- Line 1749: .dispatch(DELETE, { url: `assessment/${this.deleteVisitId}` })
- Line 1764: this.$router.push(this.getDefaultRoute("assessment.create"));
- Line 1912: _this.$router.push(
- Line 2181: .dispatch(QUERY, {
- Line 2221: .dispatch(GET, { url: "tags/visit" })
- Line 2243: .dispatch(GET, { url: "setting/job" })
- Line 2261: .dispatch(QUERY, {
- Line 2287: .dispatch(QUERY, {
- Line 2316: .dispatch(QUERY, {
- Line 2405: .dispatch(QUERY, { url: "visit/status", data: filter })

### frontend/src/view/pages/delivery/Visit.vue

- Line 487: this.$store.dispatch(SET_BREADCRUMB, [{ title: this.title }]);
- Line 527: .dispatch(QUERY, {
- Line 566: this.$router.push({ query });

### frontend/src/view/pages/delivery/Visit-Listing-Template.vue

- Line 13: <v-btn
- Line 21: <v-btn
- Line 339: <v-btn
- Line 360: <v-btn
- Line 376: <v-btn
- Line 395: <v-btn
- Line 536: ? $router.push(
- Line 823: <v-btn
- Line 920: <v-btn
- Line 927: <v-btn
- Line 1245: this.$router.push({
- Line 1263: .dispatch(POST, {
- Line 1313: .dispatch(DELETE, { url: `visit/${this.deleteVisitId}` })
- Line 1430: _this.$router.push(
- Line 1633: .dispatch(QUERY, {
- Line 1676: .dispatch(QUERY, {
- Line 1702: .dispatch(QUERY, {
- Line 1731: .dispatch(QUERY, {
- Line 1818: .dispatch(QUERY, { url: "delivery/status", data: filter })

### frontend/src/view/pages/delivery-job/Job.vue

- Line 33: <v-btn
- Line 64: <v-btn
- Line 115: <v-btn
- Line 124: <v-btn
- Line 132: <v-btn
- Line 135: $router.push(
- Line 151: <v-btn
- Line 203: <v-btn
- Line 709: <v-btn
- Line 717: <v-btn
- Line 766: <v-btn
- Line 966: .dispatch(DELETE, {
- Line 1054: _this.$router.push(
- Line 1112: .dispatch(DOWNLOAD, {
- Line 1127: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/delivery-job/partials/Add-Visit-Dialog.vue

- Line 103: $router.push(
- Line 196: <v-btn
- Line 205: <v-btn
- Line 330: .dispatch(PUT, {
- Line 375: .dispatch(PUT, {

### frontend/src/view/pages/delivery-job/partials/Add-Visit-Note-Dialog.vue

- Line 26: <v-btn
- Line 35: <v-btn
- Line 84: .dispatch(PUT, {

### frontend/src/view/pages/delivery-job/partials/Add-Visit-Team-Dialog.vue

- Line 136: <v-btn
- Line 145: <v-btn
- Line 250: .dispatch(PUT, {
- Line 294: .dispatch(QUERY, {

### frontend/src/view/pages/delivery-job/partials/Job-Schedule-Team-Body.vue

- Line 29: <v-btn icon color="red lighten-1">

### frontend/src/view/pages/delivery-job/partials/Job-Schedule-Team-Header.vue

- Line 61: <v-btn
- Line 138: <v-btn
- Line 188: <v-btn
- Line 272: <v-btn
- Line 400: .dispatch(QUERY, {
- Line 466: .dispatch(QUERY, {
- Line 506: .dispatch(QUERY, {

### frontend/src/view/pages/delivery-job/partials/One-Off-Schedule-Body.vue

- Line 324: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/One-Off-Schedule-Header.vue

- Line 9: <v-btn

### frontend/src/view/pages/delivery-job/partials/Recurring-Schedule-Body.vue

- Line 242: <v-btn
- Line 358: <v-btn
- Line 365: <v-btn
- Line 490: <v-btn
- Line 497: <v-btn
- Line 842: .dispatch(QUERY, {

### frontend/src/view/pages/delivery-job/partials/Recurring-Schedule-Header.vue

- Line 9: <v-btn

### frontend/src/view/pages/delivery-job/partials/Select-Visit-Job.vue

- Line 16: <v-btn
- Line 178: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Ticket-Visit-Reminder.vue

- Line 167: <v-btn
- Line 183: <v-btn
- Line 455: .dispatch(QUERY, {

### frontend/src/view/pages/delivery-job/partials/Visit-History.vue

- Line 63: <v-btn
- Line 221: .dispatch(QUERY, {

### frontend/src/view/pages/delivery-job/partials/Visit-Timestamp.vue

- Line 48: <v-btn
- Line 270: .dispatch(QUERY, {
- Line 290: .dispatch(QUERY, {

### frontend/src/view/pages/follow-up/Dialogcomp.vue

- Line 33: <v-btn
- Line 41: <v-btn

### frontend/src/view/pages/follow-up/Follow-ups.vue

- Line 90: <v-btn
- Line 98: <v-btn
- Line 283: this.$router.push({ query });

### frontend/src/view/pages/follow-up/Tabledata.vue

- Line 326: <v-btn
- Line 334: <v-btn
- Line 467: <v-btn
- Line 548: .dispatch(QUERY, {
- Line 568: .dispatch(GET, {
- Line 676: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 682: .dispatch(requestType, { url: requestURL, data: _this.remarkCreate })

### frontend/src/view/pages/job/Job.vue

- Line 33: <v-btn
- Line 64: <v-btn
- Line 117: <v-btn
- Line 126: <v-btn
- Line 134: <v-btn
- Line 137: $router.push(
- Line 153: <v-btn
- Line 205: <v-btn
- Line 711: <v-btn
- Line 719: <v-btn
- Line 768: <v-btn
- Line 968: .dispatch(DELETE, {
- Line 1056: _this.$router.push(
- Line 1114: .dispatch(DOWNLOAD, {
- Line 1129: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/job/partials/Add-Visit-Dialog.vue

- Line 103: $router.push(
- Line 196: <v-btn
- Line 205: <v-btn
- Line 330: .dispatch(PUT, {
- Line 375: .dispatch(PUT, {

### frontend/src/view/pages/job/partials/Add-Visit-Note-Dialog.vue

- Line 26: <v-btn
- Line 35: <v-btn
- Line 84: .dispatch(PUT, {

### frontend/src/view/pages/job/partials/Add-Visit-Team-Dialog.vue

- Line 136: <v-btn
- Line 145: <v-btn
- Line 250: .dispatch(PUT, {
- Line 294: .dispatch(QUERY, {

### frontend/src/view/pages/job/partials/Job-List.vue

- Line 6: <v-btn
- Line 10: @click="isRightCollapsePanel = !isRightCollapsePanel"
- Line 41: @click="selectJobs(item)"

### frontend/src/view/pages/job/partials/Job-Schedule-Team-Body.vue

- Line 29: <!-- <v-btn icon color="red lighten-1">

### frontend/src/view/pages/job/partials/Job-Schedule-Team-Header.vue

- Line 34: <v-btn
- Line 118: <v-btn
- Line 230: .dispatch(QUERY, {
- Line 273: this.$store.dispatch(SET_VISIT_DATA, visit_data);

### frontend/src/view/pages/job/partials/Line-Item-V1.vue

- Line 6: <v-btn-toggle v-model="product_type" color="cyan" group>
- Line 7: <v-btn
- Line 17: <v-btn
- Line 26: <v-btn
- Line 35: <v-btn
- Line 48: <v-btn
- Line 208: <v-btn
- Line 302: <v-btn
- Line 315: @click="addLocation()"
- Line 332: <v-btn
- Line 408: <v-btn
- Line 422: @click="addEquipmentItems(index, 'goods')"
- Line 431: @click="addEquipmentItems(index, 'service')"
- Line 439: <v-btn
- Line 655: <v-btn
- Line 710: <v-btn
- Line 723: @click="addLocation()"
- Line 740: <v-btn
- Line 904: <v-btn-toggle v-model="product_type" color="cyan" group>
- Line 905: <v-btn
- Line 915: <v-btn
- Line 924: <v-btn
- Line 933: <v-btn
- Line 946: <v-btn
- Line 1238: <v-btn
- Line 1707: <v-btn
- Line 2147: <v-btn
- Line 2339: <v-btn
- Line 2351: <v-btn
- Line 2369: <v-btn
- Line 2382: <v-btn
- Line 2407: <v-btn
- Line 2430: <v-btn
- Line 2443: <v-btn
- Line 2810: <v-btn
- Line 2822: <v-btn
- Line 2869: <v-btn
- Line 2901: @click="open_content = !open_content"
- Line 2970: <v-btn
- Line 2976: <v-btn
- Line 2998: <v-btn
- Line 3005: <v-btn
- Line 3420: .dispatch(DELETE, { url: `line-item/${this.delete_line_item.id}` })
- Line 3708: .dispatch(QUERY, {

### frontend/src/view/pages/job/partials/Line-Item-V2.vue

- Line 5: <v-btn-toggle v-model="product_type" color="cyan" group>
- Line 6: <v-btn
- Line 14: <v-btn
- Line 22: <v-btn
- Line 30: <v-btn
- Line 38: <v-btn
- Line 277: <v-btn
- Line 395: <v-btn v-bind="attrs" v-on="on" icon color="blue darken-4">
- Line 437: <v-btn
- Line 461: <v-btn-toggle v-model="product_type" color="cyan" group>
- Line 462: <v-btn
- Line 470: <v-btn
- Line 478: <v-btn
- Line 486: <v-btn
- Line 494: <v-btn
- Line 628: <v-btn depressed v-on:click="auto_adjust()">Auto</v-btn>
- Line 882: this.$store.dispatch(SET_VISIT_CALCULATION, {
- Line 891: this.$store.dispatch(SET_VISIT_LINE_ITEM, this.selected_line_items);

### frontend/src/view/pages/job/partials/One-Off-Schedule-Body.vue

- Line 242: this.$store.dispatch(SET_VISIT_DATA, visit_data);

### frontend/src/view/pages/job/partials/One-Off-Schedule-Header.vue

- Line 9: <v-btn

### frontend/src/view/pages/job/partials/Recurring-Schedule-Body.vue

- Line 235: <v-btn
- Line 245: <v-btn
- Line 357: <v-btn
- Line 364: <v-btn
- Line 489: <v-btn
- Line 496: <v-btn
- Line 843: .dispatch(QUERY, {

### frontend/src/view/pages/job/partials/Recurring-Schedule-Header.vue

- Line 9: <v-btn

### frontend/src/view/pages/job/partials/Select-Visit-Job.vue

- Line 16: <v-btn
- Line 178: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Ticket-Visit-Reminder.vue

- Line 167: <v-btn
- Line 183: <v-btn
- Line 455: .dispatch(QUERY, {

### frontend/src/view/pages/job/partials/Visit-History.vue

- Line 63: <v-btn
- Line 221: .dispatch(QUERY, {

### frontend/src/view/pages/job/partials/Visit-Timestamp.vue

- Line 48: <v-btn
- Line 291: .dispatch(QUERY, {
- Line 311: .dispatch(QUERY, {

### frontend/src/view/pages/job/partials/Visit-trips.vue

- Line 33: <v-btn
- Line 65: <v-btn
- Line 82: <v-btn
- Line 106: <v-btn
- Line 158: <v-btn
- Line 397: <v-btn
- Line 427: <v-btn
- Line 457: <v-btn
- Line 844: <v-btn
- Line 848: @click="getToRoute(row.engineer.id)"
- Line 874: <v-btn
- Line 902: <v-btn
- Line 1091: .dispatch(GET, {
- Line 1105: const path = this.$router.resolve({
- Line 1130: this.$router.push({ query });
- Line 1151: this.$router.push(

### frontend/src/view/pages/job/partials/Visit-trips-old.vue

- Line 108: <v-btn
- Line 125: <v-btn
- Line 397: this.$router.push({ query });
- Line 423: .dispatch(QUERY, {

### frontend/src/view/pages/job/visit-partials/Recurring-Schedule.vue

- Line 17: <v-btn
- Line 549: <v-btn
- Line 561: <v-btn
- Line 906: .dispatch(QUERY, {
- Line 1037: this.$store.dispatch(SET_VISIT_DATES, this.visitSchedule);
- Line 1038: this.$store.dispatch(SET_RECURRING_SCHEDULE, this.recurring_schedule);

### frontend/src/view/pages/job/visit-partials/Recurring-Schedule-Dialog.vue

- Line 112: <v-btn
- Line 119: <v-btn
- Line 244: <v-btn
- Line 251: <v-btn
- Line 368: this.$store.dispatch(SET_VISIT_DATES, this.visitSchedule);

### frontend/src/view/pages/job/visit-partials/Schedule.vue

- Line 17: <v-btn
- Line 178: this.$store.dispatch(SET_SCHEDULE, this.schedule);

### frontend/src/view/pages/job/visit-partials/Team.vue

- Line 23: <v-btn
- Line 77: <v-btn
- Line 114: <v-btn icon color="red lighten-1">
- Line 194: .dispatch(GET_AVAILABLE_TEAM, request)
- Line 207: this.$store.dispatch(SET_VISIT_TEAM, {

### frontend/src/view/pages/service/search-template.vue

- Line 302: <v-btn color="error" v-on:click="closeDialog"> Close </v-btn>
- Line 303: <v-btn color="primary" type="submit"> Search </v-btn>
- Line 368: .dispatch(GET_MANUFACTURER)
- Line 384: .dispatch(GET_BRANDS)
- Line 400: .dispatch(GET_WAREHOUSES)
- Line 416: .dispatch(GET_SUPPLIERS)
- Line 432: .dispatch(GET_CATEGORY)
- Line 448: .dispatch(GET_TAXES)

### frontend/src/view/pages/service/Service.vue

- Line 17: <v-btn
- Line 29: <v-btn
- Line 79: <v-btn
- Line 111: <v-btn
- Line 208: <v-btn
- Line 217: <v-btn
- Line 226: <!-- <v-btn
- Line 229: $router.push(
- Line 243: <v-btn
- Line 253: <v-btn
- Line 270: <v-btn
- Line 324: <v-btn
- Line 635: <v-btn icon small @click="searchDialog = false">
- Line 681: <v-btn
- Line 686: @click="removeFilters('clear')"
- Line 691: <v-btn
- Line 696: @click="filterRows"
- Line 739: <v-btn
- Line 748: <v-btn
- Line 920: .dispatch(PATCH, {
- Line 995: .dispatch(POST, {
- Line 1013: .dispatch(DOWNLOAD, {
- Line 1028: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/service-form/genic-teams/Service-Report.vue

- Line 302: .dispatch(PATCH, {

### frontend/src/view/pages/service-form/genic-teams/Work-Order.vue

- Line 324: .dispatch(PATCH, {

### frontend/src/view/pages/service-report/Report-Services.vue

- Line 35: <v-btn
- Line 67: <v-btn
- Line 156: <v-btn
- Line 165: <!-- <v-btn
- Line 173: <!-- <v-btn
- Line 176: $router.push(
- Line 192: <v-btn
- Line 246: <v-btn
- Line 528: <v-btn
- Line 550: <v-btn
- Line 629: <v-btn
- Line 638: <v-btn
- Line 661: <v-btn
- Line 693: <v-btn
- Line 701: <v-btn
- Line 836: .dispatch(PATCH, {
- Line 883: .dispatch(POST, {
- Line 901: .dispatch(DOWNLOAD, {
- Line 916: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/service-report/Service-Listing-Template.vue

- Line 302: <v-btn
- Line 319: <v-btn
- Line 336: <v-btn
- Line 351: <v-btn
- Line 418: $router.push(
- Line 844: <v-btn
- Line 941: <v-btn
- Line 948: <v-btn
- Line 1188: this.$router.push({
- Line 1234: .dispatch(DELETE, { url: `visit/${this.deleteVisitId}` })
- Line 1351: _this.$router.push(
- Line 1527: .dispatch(QUERY, {
- Line 1570: .dispatch(QUERY, {
- Line 1596: .dispatch(QUERY, {
- Line 1625: .dispatch(QUERY, {
- Line 1712: .dispatch(QUERY, { url: "visit/status", data: filter })

### frontend/src/view/pages/service-report/ServiceReport.vue

- Line 35: <v-btn
- Line 67: <v-btn
- Line 156: <v-btn
- Line 165: <!-- <v-btn
- Line 173: <!-- <v-btn
- Line 176: $router.push(
- Line 192: <v-btn
- Line 246: <v-btn
- Line 527: <v-btn
- Line 549: <v-btn
- Line 628: <v-btn
- Line 637: <v-btn
- Line 660: <v-btn
- Line 692: <v-btn
- Line 701: <v-btn
- Line 837: .dispatch(PATCH, {
- Line 884: .dispatch(POST, {
- Line 902: .dispatch(DOWNLOAD, {
- Line 917: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/visit/Visit.vue

- Line 373: this.$store.dispatch(SET_BREADCRUMB, [{ title: this.title }]);
- Line 424: .dispatch(QUERY, {
- Line 465: //         this.$router.push({ query });
- Line 477: //         this.$router.push({ query });

### frontend/src/view/pages/visit/Visit-Listing-Template.vue

- Line 19: <v-btn v-bind="attrs" v-on="on" class="mx-2 custom-bold-button custom-btn-color white--text" tile
- Line 29: <v-btn v-if="!internal && this.detailType != 'tickets' && !isDetails" tile depressed :disabled="pageLoading"
- Line 34: <v-btn v-if="!internal" tile depressed :disabled="pageLoading" :type-id="$route.query.tab"
- Line 41: <v-btn depressed :disabled="pageLoading" class="mx-1 custom-bold-button btn-tab-hide"
- Line 167: :input-value="data.selected" close @click="data.select" @click:close="remove(data.item)">
- Line 270: <v-btn v-bind="attrs" v-on="on" class="mx-2 custom-bold-button white--text" color="cyan" tile depressed
- Line 340: $router.push(
- Line 516: <a @click.stop="" :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
- Line 967: <!-- <v-btn
- Line 1063: <v-btn depressed :disabled="deleteVisitLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 1065: <v-btn depressed :disabled="deleteVisitLoading" :loading="deleteVisitLoading"
- Line 1097: <v-btn icon small @click="isFilterDrawer = false">
- Line 1248: text-color="white" dark :input-value="data.selected" close @click="data.select"
- Line 1249: @click:close="remove(data.item)">
- Line 1386: <v-btn class="mr-2 custom-bold-button white--text" color="red" tile depressed :disabled="pageLoading"
- Line 1396: <v-btn class="mr-2 custom-bold-button white--text" color="cyan" tile depressed :disabled="pageLoading"
- Line 1424: <VChip label class="ma-1" close @click:close="() => removeFilters('filter_search')">{{ filter_search }}
- Line 1428: <VChip label class="ma-1" close @click:close="() => removeFilters('dates')">{{ dates.join(" ~ ") }}
- Line 1432: <VChip label class="ma-1" close @click:close="() => removeFilters('filter_tag')">
- Line 1437: <VChip label class="ma-1 text-uppercase" close @click:close="() => removeFilters('filter_option')">Type
- Line 1441: <VChip label class="ma-1 text-uppercase" close @click:close="() => removeFilters('filter_date_type')">
- Line 1445: <VChip label class="ma-1 text-uppercase" close @click:close="() => removeFilters('filter_status')">
- Line 1449: <VChip label class="ma-1" close @click:close="() => removeFilters('filter_customer')">Customer : {{
- Line 1453: <VChip label class="ma-1" close @click:close="() => removeFilters('filter_property')">Site : {{
- Line 1457: <VChip label class="ma-1" close @click:close="() => removeFilters('filter_engineer')">Technician : {{
- Line 1465: <v-btn icon color="red" size="small" v-bind="attrs" v-on="on" @click="removeFilters('all')">
- Line 1790: .dispatch(POST, {
- Line 1803: this.$router.push(
- Line 1823: this.$router.push({
- Line 1879: .dispatch(DELETE, { url: `visit/${this.deleteVisitId}` })
- Line 1894: this.$router.push(
- Line 2058: _this.$router.push(
- Line 2401: .dispatch(QUERY, {
- Line 2441: .dispatch(GET, { url: "tags/visit" })
- Line 2456: .dispatch(GET, { url: "setting/job" })
- Line 2475: .dispatch(QUERY, {
- Line 2501: .dispatch(QUERY, {
- Line 2530: .dispatch(QUERY, {
- Line 2623: .dispatch(QUERY, { url: "visit/status", data: filter })

### frontend/src/view/pages/visit/Visit-Listing-TemplateBackup.vue

- Line 38: <v-btn
- Line 56: <v-btn
- Line 68: <v-btn
- Line 90: <v-btn
- Line 363: @click="data.select"
- Line 364: @click:close="remove(data.item)"
- Line 554: <v-btn
- Line 675: $router.push(
- Line 1424: <!-- <v-btn
- Line 1571: <v-btn
- Line 1578: <v-btn
- Line 1643: <v-btn icon small @click="isFilterDrawer = false">
- Line 1940: @click="data.select"
- Line 1941: @click:close="remove(data.item)"
- Line 2179: <v-btn
- Line 2195: <v-btn
- Line 2239: @click:close="() => removeFilters('filter_search')"
- Line 2248: @click:close="() => removeFilters('dates')"
- Line 2257: @click:close="() => removeFilters('filter_option')"
- Line 2266: @click:close="() => removeFilters('filter_date_type')"
- Line 2275: @click:close="() => removeFilters('filter_status')"
- Line 2284: @click:close="() => removeFilters('filter_customer')"
- Line 2293: @click:close="() => removeFilters('filter_property')"
- Line 2302: @click:close="() => removeFilters('filter_engineer')"
- Line 2311: <v-btn
- Line 2317: @click="removeFilters('all')"
- Line 2615: .dispatch(POST, {
- Line 2628: this.$router.push(
- Line 2648: this.$router.push({
- Line 2693: .dispatch(DELETE, { url: `visit/${this.deleteVisitId}` })
- Line 2708: this.$router.push(this.getDefaultRoute("job.create"));
- Line 2863: _this.$router.push(
- Line 3183: .dispatch(QUERY, {
- Line 3223: .dispatch(GET, { url: "tags/visit" })
- Line 3245: .dispatch(GET, { url: "setting/job" })
- Line 3264: .dispatch(QUERY, {
- Line 3290: .dispatch(QUERY, {
- Line 3319: .dispatch(QUERY, {
- Line 3411: .dispatch(QUERY, { url: "visit/status", data: filter })

## Item/detail/create/edit page actions

### frontend/src/view/pages/assessment/Assessment-Detail.vue

- Line 721: <v-btn
- Line 731: <v-btn
- Line 745: <v-btn
- Line 763: <v-btn
- Line 781: <v-btn
- Line 799: <v-btn
- Line 817: <v-btn
- Line 842: <!-- <v-btn
- Line 854: <v-btn
- Line 873: <v-btn
- Line 891: <v-btn
- Line 910: <v-btn
- Line 928: <v-btn
- Line 946: <v-btn
- Line 961: <v-btn
- Line 990: <v-btn
- Line 1064: <v-btn
- Line 1081: <v-btn
- Line 1142: <v-btn
- Line 1217: <v-btn
- Line 1228: <v-btn
- Line 2251: <v-btn
- Line 2261: <v-btn
- Line 2271: <v-btn
- Line 2365: <v-btn
- Line 2375: <v-btn
- Line 2385: <v-btn
- Line 2418: <v-btn
- Line 2428: <v-btn
- Line 2461: <v-btn
- Line 2472: <v-btn
- Line 2543: <v-btn
- Line 2552: <v-btn
- Line 2576: <v-btn
- Line 2585: <v-btn
- Line 2623: <v-btn
- Line 2630: <v-btn
- Line 2726: <v-btn
- Line 2735: <v-btn
- Line 2824: <v-btn
- Line 2837: <v-btn
- Line 2854: <v-btn
- Line 2863: <v-btn
- Line 2909: <v-btn
- Line 2918: <v-btn
- Line 2929: <v-btn
- Line 2939: <v-btn
- Line 2994: <v-btn
- Line 3001: @click="ticketTab = 'notes'"
- Line 3285: .dispatch(POST, {
- Line 3356: .dispatch(PATCH, {
- Line 3373: .dispatch(QUERY, {
- Line 3386: .dispatch(POST, { url: "checkin/" + this.assessId })
- Line 3403: .dispatch(QUERY, {
- Line 3464: .dispatch(QUERY, {
- Line 3494: .dispatch(PATCH, {
- Line 3551: .dispatch(POST, {
- Line 3631: .dispatch(POST, {
- Line 3664: .dispatch(PATCH, {
- Line 3692: .dispatch(GET, {
- Line 3699: this.$store.dispatch(ADD_CHECKOUT_VISIT, this.checkout);
- Line 3723: .dispatch(PATCH, {
- Line 3771: .dispatch(GET, {
- Line 3793: .dispatch(GET, {
- Line 3866: .dispatch(QUERY, {
- Line 3897: .dispatch(POST, {
- Line 3960: .dispatch(PATCH, { url: "assessment/" + this.assessId + "/resume" })
- Line 4000: .dispatch(PATCH, {
- Line 4039: this.$router.replace(this.getDefaultRoute("assessment"));
- Line 4059: .dispatch(GET_AVAILABLE_TEAM, request)
- Line 4076: .dispatch(QUERY, {
- Line 4105: this.$router.push(
- Line 4128: .dispatch(PUT, {
- Line 4181: .dispatch(PUT, {
- Line 4251: .dispatch(GET, {
- Line 4326: .dispatch(PATCH, {
- Line 4359: this.$router.push(
- Line 4378: this.$router.push(
- Line 4397: .dispatch(GET, { url: "visit/v1/" + this.assessId })
- Line 4443: this.$store.dispatch(SET_BREADCRUMB, [
- Line 4458: this.$router.push(

### frontend/src/view/pages/assessment/components/ServiceFormDetail.vue

- Line 163: <v-btn
- Line 213: <v-btn
- Line 223: <v-btn
- Line 241: <v-btn
- Line 287: <v-btn
- Line 484: .dispatch(DOWNLOAD, {
- Line 501: .dispatch(DOWNLOAD, {
- Line 517: .dispatch(DOWNLOAD, {
- Line 530: .dispatch(DOWNLOAD, {

### frontend/src/view/pages/assessment/Create-Assessment.vue

- Line 25: <v-btn color="primary" dark text v-bind="attrs" v-on="on">
- Line 44: <v-btn color="primary" dark text v-bind="attrs" v-on="on">
- Line 56: <v-btn
- Line 63: <v-btn
- Line 384: <v-btn
- Line 394: <v-btn
- Line 482: <v-btn
- Line 491: <v-btn
- Line 501: <v-btn
- Line 708: @click="show_one_off_job = !show_one_off_job"
- Line 739: @click="show_recurring_job = !show_recurring_job"
- Line 776: @click="show_line_items = !show_line_items"
- Line 824: @click="show_terms_and_conditions = !show_terms_and_conditions"
- Line 870: @click="show_notes_and_attachment = !show_notes_and_attachment"
- Line 960: <v-btn
- Line 972: <v-btn
- Line 1026: <v-btn
- Line 1038: <v-btn
- Line 1330: this.$store.dispatch(SET_SCHEDULE_TYPE, this.scheduleTab);
- Line 1370: .dispatch(GET_OPTION, {
- Line 1378: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1384: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1440: .dispatch(UPLOAD, {
- Line 1447: this.$store.dispatch(RESET_STATE);
- Line 1448: this.$router
- Line 1455: this.$store.dispatch(SET_CUSTOMER, { id: vCustomerId });
- Line 1459: this.$store.dispatch(RESET_STATE);
- Line 1460: this.$router.push(
- Line 1468: this.$store.dispatch(RESET_STATE);
- Line 1469: this.$router.push(
- Line 1488: .dispatch(GET, { url: `contract/${id}` })
- Line 1504: .dispatch(QUERY, {
- Line 1545: .dispatch(POST, { url: "visit-v1", data: request })
- Line 1560: .dispatch(GET, { url: `project-milestone/${id}` })
- Line 1574: .dispatch(GET, { url: `job/update?job-id=${this.updateTicketId}` })
- Line 1782: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1788: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1880: this.$store.dispatch(SET_CUSTOMER, {
- Line 1887: this.$store.dispatch(SET_CUSTOMER, {
- Line 1891: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1903: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1909: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1918: this.$store.dispatch(RESET_CREATE_STATE);
- Line 1921: this.$store.dispatch(RESET_CREATE_STATE);

### frontend/src/view/pages/assessment/Visit-Detail-old.vue

- Line 38: <v-btn
- Line 49: <v-btn
- Line 64: <v-btn
- Line 83: <v-btn
- Line 98: <v-btn
- Line 118: <v-btn
- Line 155: <v-btn
- Line 230: <v-btn
- Line 241: <v-btn
- Line 867: <v-btn
- Line 877: <v-btn
- Line 887: <v-btn
- Line 958: <v-btn
- Line 968: <v-btn
- Line 993: <v-btn
- Line 1003: <v-btn
- Line 1052: <v-btn
- Line 1062: <v-btn
- Line 1205: .dispatch(QUERY, {
- Line 1263: .dispatch(QUERY, {
- Line 1287: .dispatch(PATCH, {
- Line 1314: .dispatch(PATCH, {
- Line 1342: .dispatch(GET, {
- Line 1402: .dispatch(QUERY, {
- Line 1425: .dispatch(POST, {
- Line 1484: .dispatch(PATCH, { url: "visit/" + this.visitId + "/resume" })
- Line 1511: .dispatch(PATCH, {
- Line 1532: this.$router.replace(this.getDefaultRoute("visit"));
- Line 1544: .dispatch(QUERY, {
- Line 1576: .dispatch(PUT, {
- Line 1687: .dispatch(PATCH, {
- Line 1716: this.$router.push(
- Line 1735: this.$router.push(
- Line 1753: .dispatch(GET, { url: "visit/v1/" + this.visitId })
- Line 1776: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/delivery/components/ServiceFormDetail.vue

- Line 163: <v-btn
- Line 213: <v-btn
- Line 223: <v-btn
- Line 241: <v-btn
- Line 287: <v-btn
- Line 484: .dispatch(DOWNLOAD, {
- Line 501: .dispatch(DOWNLOAD, {
- Line 517: .dispatch(DOWNLOAD, {
- Line 530: .dispatch(DOWNLOAD, {

### frontend/src/view/pages/delivery/Visit-Detail - Copy.vue

- Line 44: <v-btn
- Line 51: <v-btn
- Line 68: <v-btn
- Line 134: <v-btn
- Line 211: <v-btn
- Line 224: <v-btn
- Line 363: $router.push(
- Line 744: <v-btn
- Line 1022: <v-btn
- Line 1031: <v-btn
- Line 1058: <v-btn
- Line 1067: <v-btn
- Line 1091: <v-btn
- Line 1100: <v-btn
- Line 1124: <v-btn
- Line 1133: <v-btn
- Line 1209: <v-btn
- Line 1218: <v-btn
- Line 1227: <v-btn
- Line 1297: <v-btn
- Line 1306: <v-btn
- Line 1344: <v-btn
- Line 1353: <v-btn
- Line 1404: <v-btn
- Line 1413: <v-btn
- Line 1488: <v-btn
- Line 1497: <v-btn
- Line 1520: <v-btn
- Line 1525: <v-btn
- Line 1709: .dispatch(PATCH, {
- Line 1745: .dispatch(QUERY, {
- Line 1794: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 1825: .dispatch(PUT, {
- Line 1848: .dispatch(QUERY, {
- Line 1890: this.$router.push(
- Line 1918: .dispatch(POST, {
- Line 1942: .dispatch(QUERY, {
- Line 1974: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 1988: .dispatch(GET, { url: "running-time-sheet" })
- Line 2008: .dispatch(QUERY, {
- Line 2040: .dispatch(PATCH, {
- Line 2063: _this.$router.push(_this.getDefaultRoute("visit"));
- Line 2081: .dispatch(PATCH, {
- Line 2109: .dispatch(PATCH, {
- Line 2179: .dispatch(PATCH, {
- Line 2208: .dispatch(PATCH, {
- Line 2232: .dispatch(PATCH, {
- Line 2259: .dispatch(GET, {
- Line 2311: .dispatch(PATCH, {
- Line 2346: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 2420: .dispatch(GET, {
- Line 2425: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 2476: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 2496: _this.$router.go(-1);
- Line 2545: this.$router.push({ query });

### frontend/src/view/pages/delivery/Visit-Detail.vue

- Line 131: <v-btn
- Line 143: <v-btn
- Line 162: <v-btn
- Line 179: <v-btn
- Line 197: <v-btn
- Line 215: <v-btn
- Line 234: <v-btn
- Line 249: <v-btn
- Line 263: <v-btn
- Line 273: <v-btn
- Line 288: <v-btn
- Line 301: <v-btn
- Line 317: <!--  <v-btn
- Line 332: <v-btn
- Line 347: <v-btn
- Line 355: <v-btn
- Line 363: <v-btn
- Line 382: <v-btn
- Line 442: <v-btn
- Line 517: <v-btn
- Line 537: <v-btn
- Line 620: <v-btn
- Line 631: <v-btn
- Line 1830: <v-btn
- Line 1840: <v-btn
- Line 1850: <v-btn
- Line 1945: <v-btn
- Line 1955: <v-btn
- Line 1965: <v-btn
- Line 1998: <v-btn
- Line 2008: <v-btn
- Line 2041: <v-btn
- Line 2053: <v-btn
- Line 2125: <v-btn
- Line 2135: <v-btn
- Line 2160: <v-btn
- Line 2170: <v-btn
- Line 2209: <v-btn
- Line 2217: <v-btn
- Line 2295: <v-btn
- Line 2302: <v-btn
- Line 2387: <v-btn
- Line 2397: <v-btn
- Line 2471: <v-btn
- Line 2482: <v-btn
- Line 2510: <v-btn
- Line 2521: <v-btn
- Line 2866: .dispatch(PATCH, { url: "checkout/" + this.visitId })
- Line 2878: .dispatch(QUERY, {
- Line 2916: .dispatch(POST, { url: "checkin/" + this.visitId })
- Line 2933: .dispatch(QUERY, {
- Line 2998: .dispatch(QUERY, {
- Line 3028: .dispatch(PATCH, {
- Line 3081: .dispatch(POST, {
- Line 3135: .dispatch(POST, {
- Line 3162: .dispatch(PATCH, {
- Line 3190: .dispatch(GET, {
- Line 3196: this.$store.dispatch(ADD_CHECKOUT_VISIT, this.checkout);
- Line 3220: .dispatch(PATCH, {
- Line 3237: .dispatch(GET, {
- Line 3259: .dispatch(GET, {
- Line 3332: .dispatch(QUERY, {
- Line 3363: .dispatch(POST, {
- Line 3426: .dispatch(PATCH, { url: "visit/" + this.visitId + "/resume" })
- Line 3461: .dispatch(PATCH, {
- Line 3496: this.$router.replace(this.getDefaultRoute("delivery"));
- Line 3508: .dispatch(QUERY, {
- Line 3534: .dispatch(QUERY, {
- Line 3560: this.$router.push(
- Line 3583: .dispatch(PUT, {
- Line 3635: .dispatch(PUT, {
- Line 3708: .dispatch(GET, {
- Line 3783: .dispatch(PATCH, {
- Line 3822: this.$router.push(
- Line 3841: this.$router.push(
- Line 3859: .dispatch(GET, { url: "job/" + id + "/engineers" })
- Line 3872: .dispatch(GET, { url: "visit/v1/" + this.visitId })
- Line 3919: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3934: this.$router.push(

### frontend/src/view/pages/delivery/Visit-Detail-old.vue

- Line 38: <v-btn
- Line 49: <v-btn
- Line 64: <v-btn
- Line 83: <v-btn
- Line 98: <v-btn
- Line 118: <v-btn
- Line 155: <v-btn
- Line 230: <v-btn
- Line 241: <v-btn
- Line 867: <v-btn
- Line 876: <v-btn
- Line 885: <v-btn
- Line 955: <v-btn
- Line 964: <v-btn
- Line 988: <v-btn
- Line 997: <v-btn
- Line 1045: <v-btn
- Line 1054: <v-btn
- Line 1196: .dispatch(QUERY, {
- Line 1254: .dispatch(QUERY, {
- Line 1278: .dispatch(PATCH, {
- Line 1305: .dispatch(PATCH, {
- Line 1333: .dispatch(GET, {
- Line 1393: .dispatch(QUERY, {
- Line 1416: .dispatch(POST, {
- Line 1475: .dispatch(PATCH, { url: "visit/" + this.visitId + "/resume" })
- Line 1502: .dispatch(PATCH, {
- Line 1523: this.$router.replace(this.getDefaultRoute("visit"));
- Line 1535: .dispatch(QUERY, {
- Line 1567: .dispatch(PUT, {
- Line 1678: .dispatch(PATCH, {
- Line 1707: this.$router.push(
- Line 1726: this.$router.push(
- Line 1744: .dispatch(GET, { url: "visit/v1/" + this.visitId })
- Line 1767: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/delivery-job/Create-Job - Copy.vue

- Line 31: <v-btn
- Line 39: <v-btn
- Line 697: <v-btn
- Line 705: <v-btn
- Line 854: this.$router.push(
- Line 906: this.$router
- Line 938: .dispatch(QUERY, {
- Line 960: .dispatch(QUERY, {
- Line 977: .dispatch(QUERY, {
- Line 1099: _this.$router.go(-1);
- Line 1111: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/delivery-job/Create-Job.vue

- Line 41: <v-btn
- Line 49: <v-btn
- Line 60: <v-btn
- Line 1213: <v-btn
- Line 1221: <v-btn
- Line 1247: <v-btn
- Line 1255: <v-btn
- Line 1606: this.$router.push(
- Line 1648: this.$router.push(
- Line 1669: const resolved = this.$router.resolve(route);
- Line 1690: /* const resolved = this.$router.resolve(route);
- Line 1782: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1784: .dispatch(PUT, {
- Line 1808: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 1810: .dispatch(PUT, {
- Line 1834: this.$router
- Line 2050: await _this.$store.dispatch(PUT, {
- Line 2058: const job = await _this.$store.dispatch(POST, {
- Line 2207: _this.$router.push(
- Line 2213: _this.$router.push(_this.getDefaultRoute("delivery", {}));
- Line 2221: .dispatch(QUERY, {
- Line 2393: .dispatch(QUERY, {
- Line 2888: .dispatch(PUT, {
- Line 2938: .dispatch(PUT, {
- Line 2967: .dispatch(PUT, {
- Line 3055: .dispatch(PUT, {
- Line 3072: .dispatch(GET, { url: `delivery/update?job-id=${this.updateId}` })
- Line 3288: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3294: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3323: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3328: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/delivery-job/Detail-Job.vue

- Line 47: <v-btn
- Line 76: <v-btn
- Line 105: <v-btn
- Line 161: $router.push(
- Line 218: $router.push(

### frontend/src/view/pages/delivery-job/partials/Closer-Detail.vue

- Line 55: $router.push(
- Line 632: <v-btn
- Line 729: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Create-Invoice-Reminder.vue

- Line 9: <v-btn
- Line 16: <v-btn
- Line 74: $router.push(
- Line 259: .dispatch(POST, {

### frontend/src/view/pages/delivery-job/partials/Create-Service-Form.vue

- Line 107: <v-btn
- Line 116: <v-btn
- Line 207: .dispatch(POST, {
- Line 230: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Create-Ticket-Closer.vue

- Line 361: <!--  <v-btn
- Line 389: <v-btn
- Line 419: <v-btn
- Line 428: <!-- <v-btn
- Line 438: <!-- <v-btn
- Line 455: <v-btn
- Line 490: <v-btn

### frontend/src/view/pages/delivery-job/partials/Create-Ticket-Reminder.vue

- Line 215: <v-btn
- Line 224: <v-btn

### frontend/src/view/pages/delivery-job/partials/Create-Time-Tracking.vue

- Line 213: <v-btn
- Line 222: <v-btn

### frontend/src/view/pages/delivery-job/partials/Invoice-Reminder-Detail.vue

- Line 84: <v-btn
- Line 110: <v-btn
- Line 179: $router.push(
- Line 291: <v-btn
- Line 470: _this.$router.go(-1);

### frontend/src/view/pages/delivery-job/partials/Service-Form-Detail.vue

- Line 167: <v-btn
- Line 183: <v-btn
- Line 200: <v-btn
- Line 361: <v-btn
- Line 411: <v-btn
- Line 426: <v-btn
- Line 450: <v-btn
- Line 501: <v-btn
- Line 701: .dispatch(DOWNLOAD, {
- Line 718: .dispatch(DOWNLOAD, {
- Line 734: .dispatch(DOWNLOAD, {
- Line 747: .dispatch(DOWNLOAD, {

### frontend/src/view/pages/delivery-job/partials/Single-Contract-Detail.vue

- Line 27: <v-btn
- Line 54: <v-btn
- Line 77: <v-btn
- Line 106: <v-btn
- Line 444: <v-btn
- Line 513: <v-btn
- Line 518: <v-btn
- Line 582: <v-btn
- Line 591: <v-btn
- Line 764: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 796: .dispatch(PUT, {
- Line 819: .dispatch(QUERY, {
- Line 857: this.$router.push(
- Line 885: .dispatch(POST, {
- Line 909: .dispatch(QUERY, {
- Line 943: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 957: .dispatch(GET, { url: "running-time-sheet" })
- Line 977: .dispatch(QUERY, {
- Line 1009: /* .dispatch(PATCH, {
- Line 1030: .dispatch(PATCH, {
- Line 1073: .dispatch(PATCH, {
- Line 1102: .dispatch(PATCH, {
- Line 1173: .dispatch(PATCH, {
- Line 1202: .dispatch(PATCH, {
- Line 1227: .dispatch(PATCH, {
- Line 1255: .dispatch(GET, {
- Line 1314: .dispatch(PATCH, {
- Line 1349: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1423: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Single-Leave-Detail.vue

- Line 37: <v-btn
- Line 64: <v-btn
- Line 87: <v-btn
- Line 116: <v-btn
- Line 352: <v-btn
- Line 468: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Single-Quotation-Detail.vue

- Line 27: <v-btn
- Line 54: <v-btn
- Line 77: <v-btn
- Line 106: <v-btn
- Line 444: <v-btn
- Line 548: <v-btn
- Line 628: <v-btn
- Line 633: <v-btn
- Line 697: <v-btn
- Line 706: <v-btn
- Line 891: this.$router.push({
- Line 907: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 939: .dispatch(PUT, {
- Line 962: .dispatch(QUERY, {
- Line 1000: this.$router.push(
- Line 1028: .dispatch(POST, {
- Line 1052: .dispatch(QUERY, {
- Line 1086: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 1100: .dispatch(GET, { url: "running-time-sheet" })
- Line 1120: .dispatch(QUERY, {
- Line 1152: /* .dispatch(PATCH, {
- Line 1173: .dispatch(PATCH, {
- Line 1216: .dispatch(PATCH, {
- Line 1245: .dispatch(PATCH, {
- Line 1316: .dispatch(PATCH, {
- Line 1345: .dispatch(PATCH, {
- Line 1370: .dispatch(PATCH, {
- Line 1398: .dispatch(GET, {
- Line 1457: .dispatch(PATCH, {
- Line 1492: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1566: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Single-Visit-Detail.vue

- Line 22: <v-btn
- Line 330: <v-btn
- Line 401: <v-btn
- Line 406: <v-btn
- Line 470: <v-btn
- Line 479: <v-btn
- Line 649: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 681: .dispatch(PUT, {
- Line 704: .dispatch(QUERY, {
- Line 742: this.$router.push(
- Line 770: .dispatch(POST, {
- Line 794: .dispatch(QUERY, {
- Line 828: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 842: .dispatch(GET, { url: "running-time-sheet" })
- Line 862: .dispatch(QUERY, {
- Line 894: /* .dispatch(PATCH, {
- Line 915: .dispatch(PATCH, {
- Line 958: .dispatch(PATCH, {
- Line 987: .dispatch(PATCH, {
- Line 1058: .dispatch(PATCH, {
- Line 1087: .dispatch(PATCH, {
- Line 1112: .dispatch(PATCH, {
- Line 1140: .dispatch(GET, {
- Line 1199: .dispatch(PATCH, {
- Line 1234: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1311: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Team-Detail.vue

- Line 108: <v-btn
- Line 124: <v-btn
- Line 215: <v-btn icon large v-on:click="deleteEngineerConfirm(data)">

### frontend/src/view/pages/delivery-job/partials/Ticket-Attachment-Detail.vue

- Line 21: <v-btn
- Line 103: <v-btn
- Line 115: <v-btn
- Line 168: <v-btn
- Line 253: <v-btn
- Line 265: <v-btn
- Line 319: <v-btn
- Line 402: <v-btn
- Line 414: <v-btn
- Line 606: <v-btn
- Line 615: <v-btn
- Line 767: .dispatch(POST, {
- Line 842: _this.$router.go(-1);

### frontend/src/view/pages/delivery-job/partials/Ticket-Closer-Detail.vue

- Line 167: <v-btn
- Line 183: <v-btn
- Line 200: <v-btn

### frontend/src/view/pages/delivery-job/partials/Time-Tracking-Detail.vue

- Line 167: <v-btn
- Line 183: <v-btn
- Line 202: <v-btn
- Line 221: <v-btn
- Line 241: <v-btn
- Line 538: $router.push(
- Line 742: <v-btn
- Line 767: <v-btn
- Line 776: <v-btn
- Line 920: .dispatch(PATCH, {

### frontend/src/view/pages/delivery-job/partials/Update-follow-up.vue

- Line 87: <v-btn
- Line 98: <v-btn
- Line 140: <v-btn
- Line 149: <!-- <v-btn
- Line 158: <v-btn
- Line 306: .dispatch(POST, {
- Line 332: .dispatch(GET, { url: requestUrl })

### frontend/src/view/pages/delivery-job/partials/Update-Service-Form.vue

- Line 22: <v-btn
- Line 32: <v-btn
- Line 50: <v-btn
- Line 91: <v-btn
- Line 210: .dispatch(DOWNLOAD, {
- Line 226: .dispatch(GET, {

### frontend/src/view/pages/delivery-job/partials/Visit-Detail.vue

- Line 179: <v-btn
- Line 195: <v-btn
- Line 214: <v-btn
- Line 589: .dispatch(PATCH, {
- Line 704: .dispatch(GET, { url: "visit/status" })
- Line 739: _this.$router.go(-1);

### frontend/src/view/pages/delivery-job/partials/Visit-follow-up-Detail.vue

- Line 10: <v-btn
- Line 224: .dispatch(GET, { url: requestUrl })
- Line 249: .dispatch(GET, { url: requestUrl })

### frontend/src/view/pages/delivery-job/partials/Visit-Notes-Detail.vue

- Line 41: <v-btn
- Line 50: <v-btn
- Line 184: .dispatch(PUT, {
- Line 207: .dispatch(GET, { url: requestUrl })

### frontend/src/view/pages/delivery-job/partials/Visit-Team-Detail.vue

- Line 108: <v-btn
- Line 124: <v-btn
- Line 249: <v-btn icon large v-on:click="deleteEngineerConfirm(data)">

### frontend/src/view/pages/job/Create-Job - BACKUP v1.vue

- Line 41: <v-btn
- Line 49: <v-btn
- Line 1104: this.$router.push(
- Line 1139: this.$router.push(
- Line 1160: const resolved = this.$router.resolve(route);
- Line 1205: this.$router
- Line 1346: _this.$store.dispatch(PUT, {
- Line 1354: const job = await _this.$store.dispatch(POST, {
- Line 1527: .dispatch(GET, { url: `job/${jobId}/basic-detail` })
- Line 1555: .dispatch(QUERY, {
- Line 1702: .dispatch(QUERY, {
- Line 2183: .dispatch(PUT, {
- Line 2226: .dispatch(PUT, {
- Line 2253: .dispatch(PUT, {
- Line 2344: .dispatch(PUT, {
- Line 2361: .dispatch(GET, { url: `job/update?job-id=${this.updateId}` })
- Line 2541: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2547: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2634: this.$store.dispatch(SET_VISIT_DATA, visit_data);
- Line 2645: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2650: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/job/Create-Job - Copy.vue

- Line 31: <v-btn
- Line 39: <v-btn
- Line 697: <v-btn
- Line 705: <v-btn
- Line 854: this.$router.push(
- Line 906: this.$router
- Line 938: .dispatch(QUERY, {
- Line 960: .dispatch(QUERY, {
- Line 977: .dispatch(QUERY, {
- Line 1099: _this.$router.go(-1);
- Line 1111: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/job/Create-Job.vue

- Line 69: <v-btn
- Line 77: <v-btn
- Line 879: <v-btn
- Line 889: <v-btn
- Line 900: <v-btn
- Line 1020: <v-btn
- Line 1030: <v-btn
- Line 1153: <td @click="show_pm = true">
- Line 1184: <v-btn
- Line 1194: <v-btn
- Line 1205: <v-btn
- Line 1485: @click="show_adhoc_job = !show_adhoc_job"
- Line 1518: @click="show_line_items = !show_line_items"
- Line 1560: @click="show_invoicing = !show_invoicing"
- Line 1595: @click="show_invoicing = !show_invoicing"
- Line 1611: <v-btn
- Line 1638: @click="
- Line 1687: @click="
- Line 1880: <v-btn
- Line 1892: <v-btn
- Line 1971: <v-btn
- Line 2152: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 2153: this.$store.dispatch(RESET_CREATE_STATE);
- Line 2154: /*  this.$store.dispatch(CLEAR_LINE_ITEM); */
- Line 2237: this.$router.push(
- Line 2352: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 2402: .dispatch(GET, { url: `contract/${id}` })
- Line 2634: this.$store.dispatch(CREATE_OR_UPDATE, request).then(() => {
- Line 2639: this.$router.replace({
- Line 2644: this.$router.replace({
- Line 2663: .dispatch(GET_TICKET, {
- Line 2673: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2780: .dispatch(QUERY, {
- Line 2823: .dispatch(GET_TICKET, {
- Line 2854: .dispatch(GET_OPTION, {
- Line 2999: this.$store.dispatch(GET_RECURRING_DATE);
- Line 3125: .dispatch(QUERY, {
- Line 3144: this.$store.dispatch(SET_VISIT_LINE_ITEM, data?.pmItems);
- Line 3148: /*   console.log(this.$store.dispatch(SET_VISIT_LINE_ITEM, data?.pmItems)) */
- Line 3187: this.$store.dispatch(CLEAR_TICKET);
- Line 3188: this.$store.dispatch(CLEAR_INVOICE);
- Line 3189: this.$store.dispatch(RESET_STATE);
- Line 3190: this.$store.dispatch(RESET_CREATE_STATE);
- Line 3191: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 3223: this.$store.dispatch(SET_BREADCRUMB, [
- Line 3229: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/job/Create-JobBckup-23-03-24.vue

- Line 54: <v-btn
- Line 62: <v-btn
- Line 429: <v-btn
- Line 439: <v-btn
- Line 450: <v-btn
- Line 566: <v-btn
- Line 576: <v-btn
- Line 622: <v-btn
- Line 632: <v-btn
- Line 643: <v-btn
- Line 918: @click="show_line_items = !show_line_items"
- Line 947: @click="show_terms_and_conditions = !show_terms_and_conditions"
- Line 992: @click="show_notes_and_attachment = !show_notes_and_attachment"
- Line 1157: <v-btn
- Line 1168: <v-btn
- Line 1311: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 1312: this.$store.dispatch(RESET_CREATE_STATE);
- Line 1313: /*  this.$store.dispatch(CLEAR_LINE_ITEM); */
- Line 1458: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1645: this.$store.dispatch(CREATE_OR_UPDATE, request).then(() => {
- Line 1646: this.$router.replace({
- Line 1663: .dispatch(GET_TICKET, {
- Line 1670: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1724: .dispatch(QUERY, {
- Line 1762: .dispatch(GET_TICKET, {
- Line 1793: .dispatch(GET_OPTION, {
- Line 1933: this.$store.dispatch(GET_RECURRING_DATE);
- Line 2006: this.$store.dispatch(CLEAR_TICKET);
- Line 2007: this.$store.dispatch(RESET_STATE);
- Line 2008: this.$store.dispatch(RESET_CREATE_STATE);
- Line 2009: this.$store.dispatch(CLEAR_CUSTOMER);
- Line 2032: this.$store.dispatch(SET_BREADCRUMB, [
- Line 2037: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/job/Create-Job-old-gaia.vue

- Line 25: <v-btn color="primary" dark text v-bind="attrs" v-on="on">
- Line 44: <v-btn color="primary" dark text v-bind="attrs" v-on="on">
- Line 56: <v-btn
- Line 63: <v-btn
- Line 376: <v-btn
- Line 386: <v-btn
- Line 474: <v-btn
- Line 483: <v-btn
- Line 493: <v-btn
- Line 709: @click="show_one_off_job = !show_one_off_job"
- Line 740: @click="show_recurring_job = !show_recurring_job"
- Line 777: @click="show_line_items = !show_line_items"
- Line 807: @click="show_terms_and_conditions = !show_terms_and_conditions"
- Line 851: @click="show_notes_and_attachment = !show_notes_and_attachment"
- Line 946: <v-btn
- Line 958: <v-btn
- Line 1017: <v-btn
- Line 1029: <v-btn
- Line 1323: this.$store.dispatch(SET_SCHEDULE_TYPE, this.scheduleTab);
- Line 1363: .dispatch(GET_OPTION, {
- Line 1383: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1389: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1445: .dispatch(UPLOAD, {
- Line 1452: this.$store.dispatch(RESET_STATE);
- Line 1453: this.$router
- Line 1460: this.$store.dispatch(SET_CUSTOMER, { id: vCustomerId });
- Line 1464: this.$store.dispatch(RESET_STATE);
- Line 1465: this.$router.push(
- Line 1473: this.$store.dispatch(RESET_STATE);
- Line 1474: this.$router.push(
- Line 1493: .dispatch(GET, { url: `contract/${id}` })
- Line 1509: .dispatch(QUERY, {
- Line 1550: .dispatch(POST, { url: "visit-v1", data: request })
- Line 1565: .dispatch(GET, { url: `project-milestone/${id}` })
- Line 1579: .dispatch(GET, { url: `job/update?job-id=${this.updateTicketId}` })
- Line 1792: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1798: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1893: this.$store.dispatch(SET_CUSTOMER, {
- Line 1900: this.$store.dispatch(SET_CUSTOMER, {
- Line 1904: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1916: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1922: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1931: this.$store.dispatch(RESET_CREATE_STATE);
- Line 1934: this.$store.dispatch(RESET_CREATE_STATE);

### frontend/src/view/pages/job/Detail-Job.vue

- Line 47: <v-btn
- Line 76: <v-btn
- Line 105: <v-btn
- Line 161: $router.push(
- Line 218: $router.push(

### frontend/src/view/pages/job/partials/Closer-Detail.vue

- Line 58: $router.push(
- Line 642: <v-btn
- Line 741: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Create-Invoice-Reminder.vue

- Line 9: <v-btn
- Line 16: <v-btn
- Line 74: $router.push(
- Line 259: .dispatch(POST, {

### frontend/src/view/pages/job/partials/Create-Service-Form.vue

- Line 107: <v-btn
- Line 116: <v-btn
- Line 207: .dispatch(POST, {
- Line 230: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Create-Ticket-Closer.vue

- Line 361: <!--  <v-btn
- Line 389: <v-btn
- Line 419: <v-btn
- Line 428: <!-- <v-btn
- Line 438: <!-- <v-btn
- Line 455: <v-btn
- Line 490: <v-btn

### frontend/src/view/pages/job/partials/Create-Ticket-Reminder.vue

- Line 215: <v-btn
- Line 224: <v-btn

### frontend/src/view/pages/job/partials/Create-Time-Tracking.vue

- Line 213: <v-btn
- Line 222: <v-btn

### frontend/src/view/pages/job/partials/Invoice-Reminder-Detail.vue

- Line 84: <v-btn
- Line 110: <v-btn
- Line 179: $router.push(
- Line 291: <v-btn
- Line 470: _this.$router.go(-1);

### frontend/src/view/pages/job/partials/Service-Form-Detail.vue

- Line 132: <v-btn
- Line 149: <v-btn
- Line 167: <v-btn
- Line 446: <v-btn
- Line 455: <v-btn
- Line 471: <v-btn
- Line 498: <v-btn
- Line 583: <v-btn
- Line 598: <v-btn
- Line 622: <v-btn
- Line 673: <v-btn
- Line 821: <v-btn
- Line 1018: .dispatch(QUERY, {
- Line 1055: .dispatch(DOWNLOAD, {
- Line 1072: .dispatch(DOWNLOAD, {
- Line 1088: .dispatch(DOWNLOAD, {
- Line 1101: .dispatch(DOWNLOAD, {

### frontend/src/view/pages/job/partials/Single-Contract-Detail.vue

- Line 27: <v-btn
- Line 54: <v-btn
- Line 77: <v-btn
- Line 106: <v-btn
- Line 497: <v-btn
- Line 502: <v-btn
- Line 568: <v-btn
- Line 577: <v-btn
- Line 750: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 782: .dispatch(PUT, {
- Line 805: .dispatch(QUERY, {
- Line 843: this.$router.push(
- Line 871: .dispatch(POST, {
- Line 895: .dispatch(QUERY, {
- Line 929: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 943: .dispatch(GET, { url: "running-time-sheet" })
- Line 963: .dispatch(QUERY, {
- Line 995: /* .dispatch(PATCH, {
- Line 1016: .dispatch(PATCH, {
- Line 1059: .dispatch(PATCH, {
- Line 1088: .dispatch(PATCH, {
- Line 1159: .dispatch(PATCH, {
- Line 1188: .dispatch(PATCH, {
- Line 1213: .dispatch(PATCH, {
- Line 1241: .dispatch(GET, {
- Line 1300: .dispatch(PATCH, {
- Line 1335: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1409: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Single-Leave-Detail.vue

- Line 37: <v-btn
- Line 64: <v-btn
- Line 87: <v-btn
- Line 116: <v-btn
- Line 352: <v-btn
- Line 468: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Single-Project-Detail.vue

- Line 21: <v-btn
- Line 408: <v-btn
- Line 413: <v-btn
- Line 479: <v-btn
- Line 488: <v-btn
- Line 661: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 693: .dispatch(PUT, {
- Line 716: .dispatch(QUERY, {
- Line 754: this.$router.push(
- Line 782: .dispatch(POST, {
- Line 806: .dispatch(QUERY, {
- Line 840: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 854: .dispatch(GET, { url: "running-time-sheet" })
- Line 874: .dispatch(QUERY, {
- Line 906: /* .dispatch(PATCH, {
- Line 927: .dispatch(PATCH, {
- Line 970: .dispatch(PATCH, {
- Line 999: .dispatch(PATCH, {
- Line 1070: .dispatch(PATCH, {
- Line 1099: .dispatch(PATCH, {
- Line 1124: .dispatch(PATCH, {
- Line 1152: .dispatch(GET, {
- Line 1211: .dispatch(PATCH, {
- Line 1246: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1320: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Single-Quotation-Detail.vue

- Line 27: <v-btn
- Line 54: <v-btn
- Line 77: <v-btn
- Line 106: <v-btn
- Line 444: <v-btn
- Line 628: <v-btn
- Line 692: <v-btn
- Line 792: <v-btn
- Line 797: <v-btn
- Line 863: <v-btn
- Line 872: <v-btn
- Line 1057: this.$router.push({
- Line 1073: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 1105: .dispatch(PUT, {
- Line 1128: .dispatch(QUERY, {
- Line 1166: this.$router.push(
- Line 1194: .dispatch(POST, {
- Line 1218: .dispatch(QUERY, {
- Line 1252: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 1266: .dispatch(GET, { url: "running-time-sheet" })
- Line 1286: .dispatch(QUERY, {
- Line 1318: /* .dispatch(PATCH, {
- Line 1339: .dispatch(PATCH, {
- Line 1382: .dispatch(PATCH, {
- Line 1411: .dispatch(PATCH, {
- Line 1482: .dispatch(PATCH, {
- Line 1511: .dispatch(PATCH, {
- Line 1536: .dispatch(PATCH, {
- Line 1564: .dispatch(GET, {
- Line 1623: .dispatch(PATCH, {
- Line 1658: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1732: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Single-Visit-Detail.vue

- Line 26: <v-btn
- Line 33: <!--<v-btn
- Line 50: <v-btn
- Line 116: <v-btn
- Line 200: <v-btn
- Line 213: <v-btn
- Line 522: <v-btn
- Line 578: <v-btn
- Line 590: <!-- <v-btn
- Line 723: <v-btn
- Line 728: <v-btn
- Line 794: <v-btn
- Line 803: <v-btn
- Line 977: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 1018: .dispatch(PUT, {
- Line 1041: .dispatch(QUERY, {
- Line 1079: this.$router.push(
- Line 1092: this.$router.push(
- Line 1116: .dispatch(POST, {
- Line 1146: .dispatch(QUERY, {
- Line 1180: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 1194: .dispatch(GET, { url: "running-time-sheet" })
- Line 1214: .dispatch(QUERY, {
- Line 1246: /* .dispatch(PATCH, {
- Line 1267: .dispatch(PATCH, {
- Line 1310: .dispatch(PATCH, {
- Line 1339: .dispatch(PATCH, {
- Line 1410: .dispatch(PATCH, {
- Line 1439: .dispatch(PATCH, {
- Line 1464: .dispatch(PATCH, {
- Line 1492: .dispatch(GET, {
- Line 1551: .dispatch(PATCH, {
- Line 1586: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 1660: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Team-Detail.vue

- Line 108: <v-btn
- Line 124: <v-btn
- Line 215: <v-btn icon large v-on:click="deleteEngineerConfirm(data)">

### frontend/src/view/pages/job/partials/Ticket-Attachment-Detail.vue

- Line 21: <v-btn
- Line 103: <v-btn
- Line 115: <v-btn
- Line 168: <v-btn
- Line 253: <v-btn
- Line 265: <v-btn
- Line 319: <v-btn
- Line 402: <v-btn
- Line 414: <v-btn
- Line 606: <v-btn
- Line 615: <v-btn
- Line 767: .dispatch(POST, {
- Line 842: _this.$router.go(-1);

### frontend/src/view/pages/job/partials/Ticket-Closer-Detail.vue

- Line 167: <v-btn
- Line 184: <v-btn
- Line 202: <v-btn

### frontend/src/view/pages/job/partials/Time-Tracking-Detail.vue

- Line 167: <v-btn
- Line 183: <v-btn
- Line 202: <v-btn
- Line 221: <v-btn
- Line 241: <v-btn
- Line 538: $router.push(
- Line 742: <v-btn
- Line 767: <v-btn
- Line 776: <v-btn
- Line 920: .dispatch(PATCH, {

### frontend/src/view/pages/job/partials/Update-follow-up.vue

- Line 83: <v-btn
- Line 94: <v-btn
- Line 135: <v-btn
- Line 144: <!-- <v-btn
- Line 153: <v-btn
- Line 287: .dispatch(POST, {
- Line 313: .dispatch(GET, { url: requestUrl })

### frontend/src/view/pages/job/partials/Update-Service-Form.vue

- Line 22: <v-btn
- Line 32: <v-btn
- Line 50: <v-btn
- Line 91: <v-btn
- Line 210: .dispatch(DOWNLOAD, {
- Line 226: .dispatch(GET, {

### frontend/src/view/pages/job/partials/Visit-Detail.vue

- Line 179: <v-btn
- Line 195: <v-btn
- Line 214: <v-btn
- Line 589: .dispatch(PATCH, {
- Line 704: .dispatch(GET, { url: "visit/status" })
- Line 739: _this.$router.go(-1);

### frontend/src/view/pages/job/partials/Visit-follow-up-Detail.vue

- Line 10: <v-btn
- Line 224: .dispatch(GET, { url: requestUrl })
- Line 249: .dispatch(GET, { url: requestUrl })

### frontend/src/view/pages/job/partials/Visit-Notes-Detail.vue

- Line 41: <v-btn
- Line 50: <v-btn
- Line 184: .dispatch(PUT, {
- Line 207: .dispatch(GET, { url: requestUrl })

### frontend/src/view/pages/job/partials/Visit-Team-Detail.vue

- Line 108: <v-btn
- Line 125: <v-btn
- Line 324: <!--   <v-btn icon large v-on:click="deleteEngineerConfirm(data)">
- Line 440: this.$router.push({

### frontend/src/view/pages/service/Create-Service.vue

- Line 17: <v-btn
- Line 24: <v-btn
- Line 72: <v-btn
- Line 79: <v-btn
- Line 146: this.$store.dispatch(CLEAR_ERROR);
- Line 157: .dispatch(GET, { url: "service/" + serviceId })
- Line 183: .dispatch(POST, {
- Line 217: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 228: .dispatch(requestType, { url: requestURL, data: _this.serviceCreate })
- Line 234: _this.$router.push(
- Line 256: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 329: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 381: _this.$store.dispatch(UPDATE_ERROR, error);
- Line 397: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 409: _this.$router.go(-1);

### frontend/src/view/pages/service/detail/Overview.vue

- Line 214: .dispatch(GET, { url: "setting/service" })

### frontend/src/view/pages/service/Detail-Service.vue

- Line 9: <!-- <v-btn v-on:click="goBack" icon plain>
- Line 308: <v-btn
- Line 340: <v-btn
- Line 353: <v-btn
- Line 593: .dispatch(PATCH, {
- Line 622: this.$router.push(
- Line 634: .dispatch(GET, {
- Line 645: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 663: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 672: _this.$router.go(-1);
- Line 685: this.$router.push({ query });
- Line 694: // 	this.$store.dispatch(SET_BREADCRUMB, []);

### frontend/src/view/pages/service/partials/Create.vue

- Line 51: <v-btn
- Line 179: <v-icon small @click="BrandData">mdi-cog</v-icon>
- Line 214: <v-icon @click="CategoryData" small
- Line 286: <v-icon small @click="UomData">mdi-cog</v-icon>
- Line 407: <v-btn
- Line 412: @click="addPrice()"
- Line 531: <v-btn
- Line 539: @click="removePrice(index, row)"
- Line 678: <v-btn
- Line 683: @click="addCert_dialog = true"
- Line 735: <v-btn
- Line 740: @click="removeCert(index, row)"
- Line 962: this.$store.dispatch(CLEAR_ERROR);
- Line 1343: .dispatch(DELETE, {
- Line 1364: .dispatch(QUERY, {
- Line 1480: _this.$store.dispatch(UPDATE_ERROR, error);

### frontend/src/view/pages/visit/components/ServiceFormDetail.vue

- Line 163: <v-btn
- Line 213: <v-btn
- Line 223: <v-btn
- Line 241: <v-btn
- Line 287: <v-btn
- Line 484: .dispatch(DOWNLOAD, {
- Line 501: .dispatch(DOWNLOAD, {
- Line 517: .dispatch(DOWNLOAD, {
- Line 530: .dispatch(DOWNLOAD, {

### frontend/src/view/pages/visit/Visit-Detail - Copy.vue

- Line 44: <v-btn
- Line 51: <v-btn
- Line 68: <v-btn
- Line 134: <v-btn
- Line 211: <v-btn
- Line 224: <v-btn
- Line 363: $router.push(
- Line 744: <v-btn
- Line 1022: <v-btn
- Line 1031: <v-btn
- Line 1058: <v-btn
- Line 1067: <v-btn
- Line 1091: <v-btn
- Line 1100: <v-btn
- Line 1124: <v-btn
- Line 1133: <v-btn
- Line 1209: <v-btn
- Line 1218: <v-btn
- Line 1227: <v-btn
- Line 1297: <v-btn
- Line 1306: <v-btn
- Line 1344: <v-btn
- Line 1353: <v-btn
- Line 1403: <v-btn
- Line 1412: <v-btn
- Line 1487: <v-btn
- Line 1496: <v-btn
- Line 1519: <v-btn
- Line 1524: <v-btn
- Line 1708: .dispatch(PATCH, {
- Line 1744: .dispatch(QUERY, {
- Line 1793: .dispatch(PUT, { url: `visit/${this.visitDetail.id}/mark-as-cancel` })
- Line 1824: .dispatch(PUT, {
- Line 1847: .dispatch(QUERY, {
- Line 1889: this.$router.push(
- Line 1917: .dispatch(POST, {
- Line 1941: .dispatch(QUERY, {
- Line 1973: .dispatch(PATCH, { url: "running-time-sheet" })
- Line 1987: .dispatch(GET, { url: "running-time-sheet" })
- Line 2007: .dispatch(QUERY, {
- Line 2039: .dispatch(PATCH, {
- Line 2062: _this.$router.push(_this.getDefaultRoute("visit"));
- Line 2080: .dispatch(PATCH, {
- Line 2108: .dispatch(PATCH, {
- Line 2178: .dispatch(PATCH, {
- Line 2207: .dispatch(PATCH, {
- Line 2231: .dispatch(PATCH, {
- Line 2258: .dispatch(GET, {
- Line 2310: .dispatch(PATCH, {
- Line 2345: .dispatch(PATCH, { url: "visit/" + _this.visit + "/resume" })
- Line 2419: .dispatch(GET, {
- Line 2424: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 2475: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 2495: _this.$router.go(-1);
- Line 2544: this.$router.push({ query });

### frontend/src/view/pages/visit/Visit-Detail.vue

- Line 796: <v-btn
- Line 804: @click="updateMoreAction('mark_as_forceclosed')"
- Line 856: <v-btn
- Line 866: <v-btn
- Line 880: <v-btn
- Line 898: <v-btn
- Line 916: <v-btn
- Line 934: <v-btn
- Line 952: <v-btn
- Line 976: <!-- <v-btn
- Line 988: <v-btn
- Line 1007: <v-btn
- Line 1025: <v-btn
- Line 1044: <v-btn
- Line 1062: <v-btn
- Line 1080: <v-btn
- Line 1095: <v-btn
- Line 1124: <v-btn
- Line 1196: <v-btn
- Line 1218: <v-btn
- Line 1279: <v-btn
- Line 1354: <v-btn
- Line 1374: <v-btn
- Line 1400: <v-btn
- Line 1415: <v-btn
- Line 2979: <v-btn
- Line 2988: <v-btn
- Line 2997: <v-btn
- Line 3082: <v-btn
- Line 3091: <v-btn
- Line 3100: <v-btn
- Line 3132: <v-btn
- Line 3141: <v-btn
- Line 3173: <v-btn
- Line 3184: <v-btn
- Line 3255: <v-btn
- Line 3264: <v-btn
- Line 3288: <v-btn
- Line 3297: <v-btn
- Line 3336: <v-btn
- Line 3343: <v-btn
- Line 3439: <v-btn
- Line 3448: <v-btn
- Line 3549: <v-btn
- Line 3562: <v-btn
- Line 3579: <v-btn
- Line 3588: <v-btn
- Line 3634: <v-btn
- Line 3644: <v-btn
- Line 3656: <v-btn
- Line 3667: <v-btn
- Line 3701: <v-btn
- Line 3709: <v-btn
- Line 3813: <v-btn
- Line 3826: <v-btn
- Line 3844: <v-btn
- Line 3855: <v-btn
- Line 3937: <v-btn
- Line 3958: <v-btn class="text-white" color="red darken-4" depressed tile v-on:click="closeDialog">
- Line 4261: .dispatch(POST, {
- Line 4313: .dispatch(POST, {
- Line 4333: this.$router.push({
- Line 4394: .dispatch(POST, {
- Line 4477: .dispatch(PATCH, {
- Line 4494: .dispatch(QUERY, {
- Line 4507: .dispatch(POST, { url: "checkin/" + this.visitId })
- Line 4524: .dispatch(QUERY, {
- Line 4588: .dispatch(QUERY, {
- Line 4618: .dispatch(PATCH, {
- Line 4671: .dispatch(POST, {
- Line 4750: .dispatch(POST, {
- Line 4779: .dispatch(PATCH, {
- Line 4807: //       .dispatch(GET, {
- Line 4814: //         this.$store.dispatch(ADD_CHECKOUT_VISIT, this.checkout);
- Line 4838: .dispatch(PATCH, {
- Line 4886: .dispatch(GET, {
- Line 4908: .dispatch(GET, {
- Line 4981: .dispatch(QUERY, {
- Line 5012: .dispatch(POST, {
- Line 5075: .dispatch(PATCH, { url: "visit/" + this.visitId + "/resume" })
- Line 5115: .dispatch(PATCH, {
- Line 5150: this.$router.replace(this.getDefaultRoute("visit"));
- Line 5170: .dispatch(GET_AVAILABLE_TEAM, request)
- Line 5196: .dispatch(QUERY, {
- Line 5223: this.$router.push(
- Line 5246: .dispatch(PUT, {
- Line 5285: .dispatch(PUT, {
- Line 5355: .dispatch(GET, {
- Line 5430: .dispatch(PATCH, {
- Line 5463: this.$router.push(
- Line 5482: this.$router.push(
- Line 5501: .dispatch(GET, { url: "visit/v1/" + this.visitId })
- Line 5555: this.$store.dispatch(SET_BREADCRUMB, [
- Line 5591: this.$router.push(
- Line 5724: this.$router.push({ query });

### frontend/src/view/pages/visit/Visit-Detail-old.vue

- Line 38: <v-btn
- Line 49: <v-btn
- Line 64: <v-btn
- Line 83: <v-btn
- Line 98: <v-btn
- Line 118: <v-btn
- Line 155: <v-btn
- Line 230: <v-btn
- Line 241: <v-btn
- Line 867: <v-btn
- Line 876: <v-btn
- Line 885: <v-btn
- Line 955: <v-btn
- Line 965: <v-btn
- Line 990: <v-btn
- Line 1000: <v-btn
- Line 1049: <v-btn
- Line 1058: <v-btn
- Line 1200: .dispatch(QUERY, {
- Line 1258: .dispatch(QUERY, {
- Line 1282: .dispatch(PATCH, {
- Line 1309: .dispatch(PATCH, {
- Line 1337: .dispatch(GET, {
- Line 1397: .dispatch(QUERY, {
- Line 1420: .dispatch(POST, {
- Line 1479: .dispatch(PATCH, { url: "visit/" + this.visitId + "/resume" })
- Line 1506: .dispatch(PATCH, {
- Line 1527: this.$router.replace(this.getDefaultRoute("visit"));
- Line 1539: .dispatch(QUERY, {
- Line 1571: .dispatch(PUT, {
- Line 1682: .dispatch(PATCH, {
- Line 1711: this.$router.push(
- Line 1730: this.$router.push(
- Line 1748: .dispatch(GET, { url: "visit/v1/" + this.visitId })
- Line 1771: this.$store.dispatch(SET_BREADCRUMB, [

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

