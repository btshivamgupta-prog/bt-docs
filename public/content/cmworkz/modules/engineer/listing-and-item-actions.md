# engineer — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Engineers and teams are consumed by Jobs, Visits, scheduling, leave, calendar, tracking, and permissions.

## Listing page actions

### frontend/src/view/pages/engineer/Additional-Documents.vue

- Line 51: <v-btn depressed v-on:click="getFiles()" color="cyan white--text"
- Line 55: <v-btn
- Line 235: <v-btn
- Line 245: <v-btn
- Line 469: <v-btn
- Line 477: <v-btn
- Line 536: <v-btn
- Line 547: <v-btn
- Line 795: .dispatch(QUERY, {

### frontend/src/view/pages/engineer/create-or-update/Engineer-Address.vue

- Line 369: .dispatch(QUERY, {
- Line 396: .dispatch(QUERY, {

### frontend/src/view/pages/engineer/create-or-update/Personal-Info.vue

- Line 601: <v-btn v-else class="mx-4 custom-bold-button" outlined small :disabled="primaryLoader"
- Line 818: .dispatch(GET, { url: "user-role-new" })
- Line 831: .dispatch(GET, {

### frontend/src/view/pages/engineer/create-or-update/Skilles-Certificate.vue

- Line 253: .dispatch(GET, {

### frontend/src/view/pages/engineer/create-or-update/Skills-Certificate.vue

- Line 590: <v-btn
- Line 611: @click="removeCertificate(index)"
- Line 621: @click="addCertificate()"
- Line 875: .dispatch(GET, {

### frontend/src/view/pages/engineer/detail/Personal-Info.vue

- Line 25: <v-btn
- Line 417: .dispatch(PATCH, {

### frontend/src/view/pages/engineer/detail/Personal-Info-old.vue

- Line 24: <v-btn
- Line 155: .dispatch(PATCH, {

### frontend/src/view/pages/engineer/Engineer.vue

- Line 37: <v-btn
- Line 69: <v-btn
- Line 119: <v-btn
- Line 128: <v-btn
- Line 137: <!--  <v-btn
- Line 140: $router.push(
- Line 161: <v-btn
- Line 170: <v-btn
- Line 179: <!-- <v-btn
- Line 232: <v-btn
- Line 1020: <v-btn icon small @click="searchDialog = false">
- Line 1062: <v-btn
- Line 1067: @click="removeFilters('clear')"
- Line 1072: <v-btn
- Line 1077: @click="filterRows"
- Line 1116: <v-btn
- Line 1125: <v-btn
- Line 1256: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1349: .dispatch(PATCH, {
- Line 1366: .dispatch(DOWNLOAD, {
- Line 1381: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/leave/Leave.vue

- Line 32: <v-btn
- Line 64: <v-btn
- Line 116: <v-btn
- Line 126: <v-btn
- Line 135: <v-btn
- Line 138: $router.push(
- Line 154: <v-btn
- Line 207: <v-btn
- Line 565: <v-btn
- Line 573: <v-btn
- Line 698: .dispatch(PATCH, {
- Line 730: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/leave/Leave2.vue

- Line 32: <v-btn
- Line 64: <v-btn
- Line 208: <v-btn
- Line 213: @click="create_leave_dialog = true"
- Line 219: <v-btn
- Line 224: @click="leaveListingEvent = !leaveListingEvent"
- Line 231: <v-btn
- Line 350: <v-btn
- Line 354: @click="dropData(visits.visitId)"
- Line 372: <v-btn
- Line 374: @click="statusDialog = false"
- Line 485: .dispatch(GET, {
- Line 530: .dispatch(PATCH, {
- Line 556: .dispatch(PATCH, {
- Line 583: _this.$store.dispatch(SET_FILTER, leaveFilter);
- Line 589: .dispatch(GET, {
- Line 628: .dispatch(DELETE, {
- Line 643: _this.$store.dispatch(SET_LOADING, true);
- Line 645: .dispatch(GET_LEAVE_STATUS, {})
- Line 650: _this.$store.dispatch(SET_LOADING, false);
- Line 658: this.$store.dispatch(SET_BREADCRUMB, [
- Line 665: this.$store.dispatch(RESET_STATE);

### frontend/src/view/pages/leave/LeaveKanban.vue

- Line 106: <v-btn
- Line 438: <v-btn
- Line 455: <v-btn
- Line 537: this.$router.push({ name: "admin.leave.detail", params: { id: id } });
- Line 582: .dispatch(QUERY, {
- Line 614: .dispatch(PATCH, {
- Line 740: .dispatch(GET, {

### frontend/src/view/pages/leave/LeaveKanbanOld.vue

- Line 55: @click="goToDetail(data)"
- Line 115: <v-btn
- Line 437: <v-btn
- Line 453: <v-btn
- Line 528: this.$router.push({ name: "admin.leave.detail", params: { id: id } });
- Line 569: .dispatch(QUERY, {
- Line 602: .dispatch(PATCH, {
- Line 672: .dispatch(GET, {

### frontend/src/view/pages/leave/LeaveListing.vue

- Line 280: @click="updateStatus(item.value, row)"
- Line 460: .dispatch(POST, {
- Line 473: this.$router.push(
- Line 569: .dispatch(QUERY, {

### frontend/src/view/pages/team/detail/Staff-Personal-Info.vue

- Line 27: <v-btn
- Line 187: .dispatch(PATCH, {
- Line 203: .dispatch(QUERY, {

### frontend/src/view/pages/team/Teams.vue

- Line 36: <v-btn
- Line 67: <v-btn
- Line 113: <v-btn
- Line 121: <v-btn
- Line 136: <v-btn
- Line 180: <!--  <v-btn
- Line 308: <v-btn
- Line 326: <v-btn
- Line 342: <!--     <v-btn
- Line 527: <!-- <v-btn
- Line 692: .dispatch(GET, {
- Line 735: .dispatch(QUERY, {
- Line 791: this.$router.push(
- Line 810: this.$router.push(
- Line 819: this.$router.push(
- Line 839: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/user/detail/RecentActivity.vue

- Line 92: .dispatch(GET, { url: "user/" + _this.user + "/recent-activity" })

### frontend/src/view/pages/user/User.vue

- Line 26: <v-btn
- Line 57: <v-btn
- Line 103: <v-btn
- Line 122: <v-btn
- Line 131: <v-btn
- Line 534: <v-btn
- Line 541: <v-btn
- Line 729: .dispatch(GET, { url: "invoice-v1/" + this.invoiceId })
- Line 733: this.$store.dispatch(SET_VIEW_CALCULATION, {
- Line 751: this.$store.dispatch(SET_VIEW_LINE_ITEM, data.line_item);
- Line 752: this.$store.dispatch(SET_BREADCRUMB, [
- Line 801: .dispatch(POST, {
- Line 817: .dispatch(PATCH, {
- Line 837: .dispatch(PATCH, {
- Line 854: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/user/UserNew.vue

- Line 26: <v-btn
- Line 57: <v-btn
- Line 102: <v-btn
- Line 119: <v-btn
- Line 128: <v-btn
- Line 567: this.$store.dispatch(SET_BREADCRUMB, [
- Line 583: this.$router.replace(targetRoute).catch((err) => {
- Line 706: .dispatch(POST, {
- Line 722: .dispatch(PATCH, {
- Line 742: .dispatch(PATCH, {
- Line 759: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/engineer/Create-Engineer.vue

- Line 40: <v-btn
- Line 55: <v-btn
- Line 311: .dispatch(GET, {
- Line 331: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 339: _this.$router.go(-1);
- Line 349: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 376: _this.$router.go(-1);

### frontend/src/view/pages/engineer/Detail-Engineer.vue

- Line 129: <v-btn
- Line 132: @click="signatureDialog = true"
- Line 163: <v-btn
- Line 167: @click="emailSignature()"
- Line 175: <v-btn depressed class="mx-2" @click="resetPasswordDialog = true">
- Line 187: <v-btn
- Line 201: <v-btn
- Line 215: <v-btn
- Line 378: <!--   <v-btn
- Line 519: <v-btn
- Line 669: <v-btn
- Line 706: <v-btn
- Line 719: <v-btn
- Line 814: <v-btn
- Line 819: @click="resetPassword()"
- Line 823: <v-btn
- Line 827: @click="resetPasswordDialog = false"
- Line 853: <v-btn
- Line 891: <v-btn
- Line 904: <v-btn
- Line 916: <!-- <v-btn
- Line 921: @click="resetPassword()"
- Line 925: <v-btn
- Line 929: @click="signatureDialog = false"
- Line 943: <v-btn
- Line 951: <v-btn
- Line 954: @click="eSignatureDialog = false"
- Line 1070: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1083: .dispatch(PATCH, {
- Line 1100: .dispatch(PUT, {
- Line 1126: .dispatch(PUT, {
- Line 1193: .dispatch(GET, {
- Line 1213: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1221: _this.$router.go(-1);
- Line 1243: _this.$router.go(-1);

### frontend/src/view/pages/engineer/Internal-Engineer.vue

- Line 37: <v-btn
- Line 68: <v-btn
- Line 116: <v-btn
- Line 126: <v-btn
- Line 136: <!--  <v-btn
- Line 139: $router.push(
- Line 160: <v-btn
- Line 169: <v-btn
- Line 178: <!-- <v-btn
- Line 231: <v-btn
- Line 861: <v-btn
- Line 870: <v-btn
- Line 1000: this.$store.dispatch(SET_BREADCRUMB, [
- Line 1016: this.$router.replace(targetRoute).catch((err) => {
- Line 1026: this.$router.replace(
- Line 1114: .dispatch(PATCH, {
- Line 1131: .dispatch(DOWNLOAD, {
- Line 1146: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/engineer/Leave-Update-Engineer.vue

- Line 108: <v-btn
- Line 170: .dispatch(GET, {
- Line 229: .dispatch(GET, {
- Line 270: .dispatch(PUT, {

### frontend/src/view/pages/engineer/PasswordUpdate.vue

- Line 71: <v-btn
- Line 183: .dispatch(PATCH, {

### frontend/src/view/pages/leave/Create-Or-Update/CreateLeave.vue

- Line 24: <v-btn
- Line 34: <!-- <v-btn tile color="" class="ml-2" v-on:click="$emit('close')" -->
- Line 35: <v-btn
- Line 476: <v-btn
- Line 484: <v-btn
- Line 741: .dispatch(GET, {
- Line 758: .dispatch(GET, {
- Line 831: .dispatch(GET, {
- Line 857: .dispatch(GET, { url: `single-user/${id}` })
- Line 969: .dispatch(requestTYPE, {

### frontend/src/view/pages/leave/Create-Or-Update/Create-Leave.vue

- Line 11: <v-btn
- Line 19: <v-btn
- Line 233: <v-btn
- Line 427: .dispatch(GET, {
- Line 450: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 478: .dispatch(POST, {
- Line 483: _this.$router.push(
- Line 507: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/leave/Create-Or-Update/Update-Leave.vue

- Line 11: <v-btn
- Line 18: <v-btn
- Line 410: .dispatch(GET, {
- Line 431: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 459: .dispatch(PUT, {
- Line 464: _this.$router.push(
- Line 483: .dispatch(GET, {
- Line 527: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/leave/Detail/Detail-Leave.vue

- Line 256: <!-- <v-btn
- Line 265: <v-btn
- Line 282: <v-btn
- Line 312: <v-btn
- Line 835: <v-btn depressed color="cyan" class="white--text"
- Line 866: <v-btn-toggle v-model="leaveStatusType">
- Line 867: <v-btn value="all" class="py-2">
- Line 874: <v-btn value="pending" class="py-2">
- Line 886: <v-btn value="accepted" class="py-2">
- Line 896: <v-btn value="rejected" class="py-2">
- Line 1194: _this.$router.push(
- Line 1218: .dispatch(PATCH, {
- Line 1236: .dispatch(GET, {
- Line 1271: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1296: _this.$router.go(-1);

### frontend/src/view/pages/team/Detail-Member.vue

- Line 20: <v-btn
- Line 48: <v-btn
- Line 189: .dispatch(QUERY, {
- Line 210: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 218: _this.$router.go(-1);
- Line 238: _this.$router.go(-1);

### frontend/src/view/pages/user/Create-User.vue

- Line 10: <v-btn
- Line 17: <v-btn
- Line 440: <v-btn
- Line 583: .dispatch(GET, { url: "user-role" })
- Line 596: .dispatch(GET, {
- Line 613: .dispatch(GET, {
- Line 636: .dispatch(PUT, { url: "setting/leave/" + categoriesid,
- Line 687: .dispatch(POST, {
- Line 693: _this.$router.push(
- Line 716: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/user/detail/Leave-Update.vue

- Line 109: <v-btn
- Line 175: .dispatch(GET, {
- Line 231: .dispatch(GET, {
- Line 252: .dispatch(GET, { url: "user/" + _this.user })
- Line 284: .dispatch(PUT, {

### frontend/src/view/pages/user/detail/PasswordUpdate.vue

- Line 131: <v-btn
- Line 295: .dispatch(PATCH, {

### frontend/src/view/pages/user/Detail-User.vue

- Line 9: @click="status_dialog = true"
- Line 70: <v-btn
- Line 190: <v-btn
- Line 194: @click="signatureDialog = true"
- Line 222: <v-btn
- Line 226: @click="emailSignature()"
- Line 253: <v-btn
- Line 257: @click="resetPasswordDialog = true"
- Line 272: <!--  <v-btn
- Line 277: @click="mailDialog = true"
- Line 281: <v-btn
- Line 287: @click="status_dialog = true"
- Line 293: <v-btn
- Line 305: <v-btn
- Line 390: <v-btn
- Line 428: <v-btn
- Line 441: <v-btn
- Line 805: <v-btn
- Line 815: <v-btn
- Line 844: <v-btn
- Line 882: <v-btn
- Line 895: <!--   <v-btn depressed v-on:click="submitSignature" color="cyan white--text"
- Line 901: <v-btn
- Line 909: <v-btn
- Line 913: @click="signatureDialog = false"
- Line 931: <v-btn
- Line 936: @click="resetPassword()"
- Line 940: <v-btn
- Line 944: @click="resetPasswordDialog = false"
- Line 958: <v-btn
- Line 966: <v-btn
- Line 969: @click="eSignatureDialog = false"
- Line 1032: @click.stop="selectDays(item)"
- Line 1046: <v-btn
- Line 1056: <v-btn
- Line 1193: .dispatch(PATCH, {
- Line 1244: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 1264: .dispatch(PATCH, {
- Line 1280: .dispatch(PATCH, {
- Line 1298: .dispatch(PUT, {
- Line 1328: .dispatch(PUT, {
- Line 1361: .dispatch(PATCH, {
- Line 1380: .dispatch(PUT, { url: "setting/leave/" + categoriesid,
- Line 1394: .dispatch(GET, { url: "user/" + _this.user })
- Line 1410: .dispatch(GET, {
- Line 1431: .dispatch(GET, {
- Line 1459: .dispatch(GET, { url: "user-role" })
- Line 1475: .dispatch(GET, {
- Line 1501: _this.$router.go(-1);
- Line 1545: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 1554: _this.$router.go(-1);

### frontend/src/view/pages/user/Detail-UserOld.vue

- Line 46: <v-btn
- Line 58: <v-btn
- Line 143: <v-btn
- Line 181: <v-btn
- Line 194: <v-btn
- Line 553: <v-btn
- Line 563: <v-btn
- Line 678: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 697: .dispatch(PATCH, {
- Line 713: .dispatch(PATCH, {
- Line 731: .dispatch(PUT, {
- Line 764: .dispatch(PATCH, {
- Line 783: .dispatch(PUT, { url: "setting/leave/" + categoriesid,
- Line 797: .dispatch(GET, { url: "user/" + _this.user })
- Line 813: .dispatch(GET, {
- Line 834: .dispatch(GET, {
- Line 862: .dispatch(GET, { url: "user-role" })
- Line 878: .dispatch(GET, {
- Line 904: _this.$router.go(-1);
- Line 941: _this.$store.dispatch(SET_BREADCRUMB, [
- Line 950: _this.$router.go(-1);

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

