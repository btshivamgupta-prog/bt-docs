# admin-settings — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Settings define module visibility, custom fields, statuses, tax, numbering, permissions, templates, and integration behavior.

## Listing page actions

### frontend/src/view/pages/custom-field-v2/CustomFieldListing.vue

- Line 12: <v-btn
- Line 26: <v-btn-toggle
- Line 32: <v-btn
- Line 52: <v-btn
- Line 61: @click="updateOrder"
- Line 66: <v-btn
- Line 75: @click="isPreview = true"
- Line 80: <v-btn
- Line 90: @click="isPreview = false"
- Line 97: <v-btn
- Line 104: @click="openAddDialog"
- Line 164: <v-btn
- Line 261: <v-btn
- Line 365: <v-btn
- Line 369: @click="
- Line 376: <v-btn
- Line 382: @click="createOrUpdate"
- Line 478: .dispatch(POST, {
- Line 498: .dispatch(POST, {
- Line 530: _this.$store.dispatch(GET_FIELD_DATA, this.fieldTabs).finally(() => {
- Line 534: //   .dispatch(GET, { url: "module/custom-fields/" + this.fieldTabs })
- Line 575: .dispatch(UPDATE_TITLE, { module: this.fieldTabs, title: e })
- Line 586: .dispatch(GET, { url: "module/all-modules" })

### frontend/src/view/pages/formBuilder/components/Address.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/CheckBox.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"
- Line 147: @click="importDialog = false"
- Line 172: <v-btn class="mr-2" tile @click="importDialog = false">
- Line 175: <v-btn
- Line 180: @click="importDialog = false"
- Line 205: @click="copyDialog = false"
- Line 246: @click="assignValueDialog = false"
- Line 380: <v-btn
- Line 383: @click="assignValueDialog = false"
- Line 387: <v-btn
- Line 392: @click="assignValueDialog = false"

### frontend/src/view/pages/formBuilder/components/CheckList.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"
- Line 151: <v-btn icon v-bind="attrs" v-on="on">
- Line 184: @click="addNew(index)"
- Line 192: @click="remove(index)"
- Line 229: @click="importDialog = false"
- Line 254: <v-btn class="mr-2" tile @click="importDialog = false">
- Line 257: <v-btn
- Line 262: @click="importDialog = false"
- Line 287: @click="copyDialog = false"
- Line 328: @click="assignValueDialog = false"
- Line 462: <v-btn
- Line 465: @click="assignValueDialog = false"
- Line 469: <v-btn
- Line 474: @click="assignValueDialog = false"

### frontend/src/view/pages/formBuilder/components/Currency.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Date.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/DecisionBox.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Description.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>

### frontend/src/view/pages/formBuilder/components/Email.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/ImageUpload.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/MultiLine.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Name.vue

- Line 20: <v-btn depressed tile class="mr-2" v-on:click="$emit('close', true)"
- Line 23: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 45: @click="dialog = false"
- Line 58: <v-btn class="mr-2" tile @click="dialog = false">
- Line 61: <v-btn
- Line 65: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Number.vue

- Line 23: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 26: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 48: @click="dialog = false"
- Line 61: <v-btn class="mr-2" tile @click="dialog = false">
- Line 64: <v-btn
- Line 68: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/PageBreak.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>

### frontend/src/view/pages/formBuilder/components/Phone.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Radio.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false"
- Line 63: <v-btn
- Line 67: @click="dialog = false"
- Line 147: @click="importDialog = false"
- Line 172: <v-btn class="mr-2" tile @click="importDialog = false">
- Line 175: <v-btn
- Line 180: @click="importDialog = false"
- Line 205: @click="copyDialog = false"
- Line 246: @click="assignValueDialog = false"
- Line 380: <v-btn
- Line 383: @click="assignValueDialog = false"
- Line 387: <v-btn
- Line 392: @click="assignValueDialog = false"

### frontend/src/view/pages/formBuilder/components/Rating.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Section.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/Signature.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="blue darken-4"
- Line 53: @click="dialog = false"
- Line 66: <v-btn class="mr-2" tile @click="dialog = false">
- Line 69: <v-btn
- Line 73: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/SingleLine.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/TermsAndConditions.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="mr-2" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"
- Line 117: @click="termsDialog = false"
- Line 130: <v-btn class="mr-2" tile @click="termsDialog = false">
- Line 133: <v-btn
- Line 138: @click="termsDialog = false"
- Line 172: @click="declarationDialog = false"
- Line 185: <v-btn class="mr-2" tile @click="declarationDialog = false">
- Line 188: <v-btn
- Line 193: @click="declarationDialog = false"

### frontend/src/view/pages/formBuilder/components/Time.vue

- Line 22: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 25: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 47: @click="dialog = false"
- Line 60: <v-btn class="mr-2" tile @click="dialog = false">
- Line 63: <v-btn
- Line 67: @click="dialog = false"

### frontend/src/view/pages/formBuilder/components/UniqueId.vue

- Line 18: <v-btn depressed tile class="me-2" v-on:click="$emit('close', true)"
- Line 21: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>

### frontend/src/view/pages/formBuilder/components/Website.vue

- Line 22: <v-btn
- Line 29: <v-btn tile depressed color="white--text" class="cyan">Save</v-btn>
- Line 51: @click="dialog = false"
- Line 64: <v-btn class="text" tile @click="dialog = false">
- Line 67: <v-btn
- Line 71: @click="dialog = false"

### frontend/src/view/pages/formBuilder/preview/PageBreak.vue

- Line 5: <v-btn tile depressed color="white--text" class="ma-2 blue darken-4">
- Line 10: <v-btn tile depressed color="white--text" class="ma-2 blue darken-4">

### frontend/src/view/pages/formBuilder/preview/Signature.vue

- Line 16: <v-btn
- Line 25: <v-btn

### frontend/src/view/pages/profile/Activity.vue

- Line 116: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Activity Log" }]);
- Line 124: this.$router.push({ query });

### frontend/src/view/pages/profile/AdminBasic.vue

- Line 149: <v-btn
- Line 187: <v-btn
- Line 200: <v-btn
- Line 297: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 310: .dispatch(PATCH, {
- Line 328: .dispatch(PUT, {
- Line 369: .dispatch(GET, { url: "user/" + _this.userId })
- Line 393: _this.$router.go(-1);
- Line 417: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/profile/EngineerBasic.vue

- Line 19: <v-btn
- Line 53: <v-btn
- Line 60: <v-btn depressed class="mx-2 custom-bold-button">
- Line 128: .dispatch(GET, {
- Line 182: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/profile/MyAccount.vue

- Line 318: .dispatch(QUERY, {
- Line 341: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 354: .dispatch(PATCH, {
- Line 372: .dispatch(PUT, {
- Line 413: .dispatch(GET, { url: "user/" + _this.userId })
- Line 437: _this.$router.go(-1);
- Line 462: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/profile/Reminder.vue

- Line 20: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Profile 2" }]);

### frontend/src/view/pages/profile/Setting.vue

- Line 407: this.$store.dispatch(SET_BREADCRUMB, [
- Line 424: this.$store.dispatch(SET_BREADCRUMB, [
- Line 432: this.$store.dispatch(SET_BREADCRUMB, [
- Line 445: this.$router.push({ query });

### frontend/src/view/pages/profile/Setting/BillingPlanTab.vue

- Line 11: <!--  <v-btn
- Line 137: <v-btn class="rounded" icon color="red">

### frontend/src/view/pages/profile/Setting/Branding.vue

- Line 16: <v-btn
- Line 43: <v-btn
- Line 92: <v-btn
- Line 183: <v-btn
- Line 235: <v-btn
- Line 433: .dispatch(QUERY, {
- Line 451: .dispatch(QUERY, {
- Line 471: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 494: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 515: .dispatch(PATCH, {
- Line 538: .dispatch(PATCH, {
- Line 563: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/Calendar.vue

- Line 17: <v-btn
- Line 26: <v-btn
- Line 76: <v-btn
- Line 161: <v-btn
- Line 166: @click="showDescription(holiday.description)"
- Line 247: <v-btn
- Line 479: <v-btn
- Line 489: <v-btn
- Line 507: <v-btn
- Line 514: <v-btn
- Line 579: <v-btn
- Line 589: <v-btn
- Line 730: .dispatch(DELETE, {
- Line 750: .dispatch(POST, {
- Line 775: .dispatch(POST, { url: "holiday", data: _this.holidayData })
- Line 809: .dispatch(QUERY, { url: "holiday", data: { year: _this.year } })
- Line 825: .dispatch(GET, { url: "common-team" })

### frontend/src/view/pages/profile/Setting/Calendar-Setting.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 99: @click="data.select"
- Line 100: @click:close="remove(data.item, 'visit')"
- Line 155: @click="data.select"
- Line 156: @click:close="remove(data.item, 'quotation')"
- Line 211: @click="data.select"
- Line 212: @click:close="remove(data.item, 'visit')"
- Line 263: @click="data.select"
- Line 264: @click:close="remove(data.item, 'contract')"
- Line 315: @click="data.select"
- Line 316: @click:close="remove(data.item, 'project')"
- Line 367: @click="data.select"
- Line 368: @click:close="remove(data.item, 'leave')"
- Line 510: .dispatch(GET, { url: "setting/calendar-setting-list" })
- Line 564: .dispatch(POST, {

### frontend/src/view/pages/profile/Setting/Company.vue

- Line 16: <v-btn
- Line 44: <v-btn
- Line 75: <v-btn
- Line 119: <v-btn
- Line 447: <v-btn
- Line 819: .dispatch(UPLOAD, { url: "file-manager/upload", data: formData })
- Line 840: .dispatch(PATCH, {
- Line 890: .dispatch(QUERY, {
- Line 918: .dispatch(PATCH, { url: "setting/company", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Contract.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/contract" })
- Line 202: .dispatch(PATCH, { url: "setting/contract", data: _this.setting })

### frontend/src/view/pages/profile/Setting/CountryList.vue

- Line 12: <v-btn
- Line 36: <v-btn
- Line 252: .dispatch(GET, { url: "setting/get-country" })
- Line 292: .dispatch(POST, {

### frontend/src/view/pages/profile/Setting/Customer.vue

- Line 12: <v-btn

### frontend/src/view/pages/profile/Setting/CustomerAsset.vue

- Line 17: <v-btn
- Line 50: <v-btn
- Line 205: .dispatch(GET, { url: "setting/customer-asset" })
- Line 220: .dispatch(PATCH, { url: "setting/customer-asset", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Customer-Review.vue

- Line 12: <v-btn
- Line 45: <v-btn
- Line 208: <v-btn
- Line 360: .dispatch(PATCH, {
- Line 379: .dispatch(GET, {

### frontend/src/view/pages/profile/Setting/Customer-Setting.vue

- Line 12: <v-btn
- Line 50: <v-btn
- Line 176: <v-btn
- Line 347: <v-btn
- Line 357: <v-btn
- Line 377: <v-btn
- Line 384: <v-btn
- Line 409: <v-btn
- Line 416: <v-btn
- Line 570: .dispatch(DELETE, {
- Line 624: .dispatch(PATCH, {
- Line 645: .dispatch(GET, { url: "categories/customer" })

### frontend/src/view/pages/profile/Setting/Delivery.vue

- Line 12: <v-btn
- Line 44: <v-btn
- Line 174: <v-btn
- Line 184: <v-btn
- Line 270: <v-btn
- Line 312: <v-btn
- Line 367: <v-btn
- Line 472: .dispatch(GET, { url: "reason-list" })
- Line 486: .dispatch(DELETE, {
- Line 506: .dispatch(POST, {

### frontend/src/view/pages/profile/Setting/EmailTemplate.vue

- Line 12: <v-btn
- Line 91: <v-btn
- Line 238: <v-btn
- Line 353: <v-btn
- Line 469: <v-btn
- Line 587: <v-btn
- Line 705: <v-btn
- Line 825: <v-btn
- Line 941: <v-btn
- Line 1057: <v-btn
- Line 1177: <v-btn
- Line 1293: <v-btn
- Line 1415: <v-btn
- Line 1537: <v-btn
- Line 1624: this.$router.push(
- Line 1633: .dispatch(GET, { url: "setting/email-template" })
- Line 1721: .dispatch(PATCH, {
- Line 1735: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/Engineer.vue

- Line 12: <v-btn
- Line 45: <v-btn
- Line 146: .dispatch(GET, { url: "setting/engineer" })
- Line 161: .dispatch(PATCH, { url: "setting/engineer", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Entity.vue

- Line 20: <!-- <v-btn
- Line 30: <v-btn
- Line 365: <v-btn
- Line 374: <v-btn
- Line 443: .dispatch(reqType, { url: reqURL, data: _this.entity })
- Line 460: .dispatch(PATCH, { url: `setting/entity/${id}/status` })
- Line 507: .dispatch(GET, { url: "setting/entity" })

### frontend/src/view/pages/profile/Setting/Equipment.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 189: .dispatch(GET, { url: "setting/equipment" })
- Line 204: .dispatch(PATCH, { url: "setting/equipment", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Expense.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/expense" })
- Line 202: .dispatch(PATCH, { url: "setting/expense", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Incident.vue

- Line 12: <v-btn
- Line 44: <v-btn
- Line 131: <v-btn
- Line 219: <v-btn
- Line 297: .dispatch(PATCH, {
- Line 314: .dispatch(GET, { url: "incident-report/setting" })
- Line 339: .dispatch(PATCH, { url: "setting/incident", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Integrate.vue

- Line 12: <v-btn
- Line 62: <v-btn
- Line 74: <v-btn
- Line 113: .dispatch(GET, { url: "google/calendar/url" })
- Line 125: .dispatch(GET, { url: "google/calendar/disconnect" })
- Line 149: .dispatch(GET, { url: "google/calendar/status" })

### frontend/src/view/pages/profile/Setting/Invoice.vue

- Line 15: <v-btn
- Line 48: <v-btn
- Line 140: <v-btn
- Line 234: .dispatch(GET, { url: "setting/invoice" })
- Line 252: .dispatch(PATCH, { url: "setting/invoice", data: _this.setting })

### frontend/src/view/pages/profile/Setting/InvoiceLocking.vue

- Line 39: <v-btn
- Line 46: @click="updateInvoiceLockSetting()"
- Line 210: .dispatch(PATCH, { url: "setting/invoice-locking", data: request })
- Line 222: .dispatch(QUERY, {

### frontend/src/view/pages/profile/Setting/Job.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 170: <v-btn
- Line 180: <v-btn
- Line 253: <v-btn
- Line 304: <v-btn
- Line 400: .dispatch(GET, { url: "setting/job" })
- Line 423: .dispatch(PATCH, { url: "setting/job", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Lead.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/lead" })
- Line 202: .dispatch(PATCH, { url: "setting/lead", data: _this.setting })

### frontend/src/view/pages/profile/Setting/leave.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 52: <v-btn
- Line 170: .dispatch(POST, {
- Line 218: .dispatch(DELETE, {
- Line 237: .dispatch(GET, {
- Line 258: .dispatch(GET, { url: "setting/engineer" })
- Line 273: .dispatch(PATCH, { url: "setting/engineer", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Leave-barcode.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 143: .dispatch(GET, { url: "setting/leave-barcode" })
- Line 158: .dispatch(PATCH, { url: "setting/leave-barcode", data: _this.setting })

### frontend/src/view/pages/profile/Setting/LineItem.vue

- Line 12: <v-btn
- Line 36: <v-btn
- Line 524: .dispatch(GET, { url: "setting/line-item" })
- Line 539: .dispatch(PATCH, { url: "setting/line-item", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Module-Setting.vue

- Line 12: <v-btn
- Line 39: <v-btn
- Line 101: .dispatch(PATCH, {
- Line 108: /*   this.$store.dispatch(HIDEMODULE);
- Line 122: .dispatch(GET, { url: "setting/modules" })

### frontend/src/view/pages/profile/Setting/MyAccontUsers.vue

- Line 91: <!--   @click="routeToDetail(row.id)" -->
- Line 152: this.$router.push(
- Line 165: .dispatch(QUERY, {

### frontend/src/view/pages/profile/Setting/Note.vue

- Line 12: <v-btn
- Line 39: <v-btn
- Line 150: <v-btn
- Line 156: @click="showDescription(row.description)"
- Line 172: <v-btn
- Line 181: <v-btn disabled class="ml-4" small icon color="red">
- Line 191: <v-btn
- Line 199: <v-btn
- Line 341: <v-btn
- Line 347: @click="showDescription(row.description)"
- Line 363: <v-btn
- Line 372: <v-btn disabled class="ml-4" small icon color="red">
- Line 382: <v-btn
- Line 390: <v-btn
- Line 574: <v-btn
- Line 581: <v-btn
- Line 601: <v-btn
- Line 689: .dispatch(DELETE, { url: `delete-autocomplete/${id}` })
- Line 713: .dispatch(PATCH, { url: "setting/autocompletes", data: _this.note })
- Line 730: .dispatch(GET, { url: `setting/autocompletes?type=${this.module}` })

### frontend/src/view/pages/profile/Setting/Oil-Sample.vue

- Line 11: <v-btn depressed class="custom-grey-border custom-bold-button" v-on:click="goBack">
- Line 31: <v-btn depressed small class="text-white" color="cyan" v-on:click="updateBatch"
- Line 78: <v-btn depressed small class="text-white mr-4" color="cyan" @click="createTestType">
- Line 81: <v-btn depressed small class="text-white" color="cyan" @click="updateTest">
- Line 102: <v-icon @click="deleteTestType(index, type.id)" color="deep-orange"
- Line 129: <v-btn depressed small class="text-white mr-4" color="cyan" @click="createPressureType">
- Line 132: <v-btn depressed small class="text-white" color="cyan" @click="updatePressure">
- Line 152: <v-icon @click="deletePressureType(index)" color="deep-orange" v-bind="attrs" v-on="on">
- Line 178: <v-btn depressed small class="text-white mr-4" color="cyan" @click="createReportSummary">
- Line 261: <v-btn depressed :loading="pageLoading" :disabled="pageLoading || !formValid"
- Line 266: <v-btn depressed :disabled="pageLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 280: <v-btn depressed :disabled="deleteJobLoading" class="mx-2 custom-grey-border custom-bold-button"
- Line 282: <v-btn depressed :disabled="deleteJobLoading" :loading="deleteJobLoading" color="red lighten-1 white--text"
- Line 342: .dispatch(DELETE, {
- Line 359: .dispatch(GET, { url: "setting/oilsample" })
- Line 374: .dispatch(PATCH, {
- Line 389: .dispatch(PATCH, { url: "setting/oilsample", data: _this.setting })
- Line 401: .dispatch(PATCH, {
- Line 417: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/OwnAsset.vue

- Line 17: <v-btn
- Line 50: <v-btn
- Line 114: .dispatch(GET, { url: "setting/own-asset" })
- Line 129: .dispatch(PATCH, { url: "setting/own-asset", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Part.vue

- Line 17: <v-btn
- Line 45: <v-btn
- Line 140: <v-btn
- Line 290: <v-btn
- Line 297: <v-btn
- Line 347: <v-btn
- Line 357: <v-btn
- Line 376: <v-btn
- Line 383: <v-btn
- Line 450: .dispatch(DELETE, {
- Line 502: .dispatch(PATCH, {
- Line 529: .dispatch(GET, { url: "setting/part" })
- Line 546: .dispatch(PATCH, { url: "setting/part", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Contract-barcode.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 131: <v-btn
- Line 191: .dispatch(GET, { url: "setting/contract" })
- Line 206: .dispatch(PATCH, { url: "setting/contract", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Customer-barcode.vue

- Line 19: <v-btn
- Line 116: .dispatch(GET, { url: "setting/customer" })
- Line 131: .dispatch(PATCH, { url: "setting/customer", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Delivery-barcode.vue

- Line 19: <v-btn
- Line 110: <v-btn
- Line 171: .dispatch(GET, { url: "setting/delivery" })
- Line 186: .dispatch(PATCH, { url: "setting/delivery", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/IncidentReport-barcode.vue

- Line 19: <v-btn
- Line 110: <v-btn
- Line 225: .dispatch(PATCH, {
- Line 242: .dispatch(GET, { url: "incident-report/setting" })
- Line 267: .dispatch(PATCH, { url: "setting/incident", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Invoice-barcode.vue

- Line 19: <v-btn
- Line 122: .dispatch(GET, { url: "setting/invoice" })
- Line 137: .dispatch(PATCH, { url: "setting/invoice", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Leave-barcode.vue

- Line 19: <v-btn
- Line 118: .dispatch(GET, { url: "setting/leave-barcode" })
- Line 133: .dispatch(PATCH, { url: "setting/leave-barcode", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Payment-barcode.vue

- Line 19: <v-btn
- Line 110: <v-btn
- Line 175: .dispatch(GET, { url: "setting/payment" })
- Line 190: .dispatch(PATCH, { url: "setting/payment", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Product-barcode.vue

- Line 22: <v-btn
- Line 223: <v-btn
- Line 311: .dispatch(GET, { url: "setting/product" })
- Line 326: .dispatch(PATCH, { url: "setting/product", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Property-barcode.vue

- Line 19: <v-btn
- Line 116: .dispatch(GET, { url: "setting/property" })
- Line 131: .dispatch(PATCH, { url: "setting/property", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Quotation-barcode.vue

- Line 19: <v-btn
- Line 110: <v-btn
- Line 170: .dispatch(GET, { url: "setting/quotation" })
- Line 185: .dispatch(PATCH, { url: "setting/quotation", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Service-barcode.vue

- Line 19: <v-btn
- Line 110: <v-btn
- Line 171: .dispatch(GET, { url: "setting/service" })
- Line 186: .dispatch(PATCH, { url: "setting/service", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Supplier-barcode.vue

- Line 23: <v-btn
- Line 120: .dispatch(GET, { url: "setting/supplier" })
- Line 135: .dispatch(PATCH, { url: "setting/supplier", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Technicians-barcode.vue

- Line 22: <v-btn
- Line 113: <v-btn
- Line 121: <v-btn
- Line 167: @click="deleteJobType(index)"
- Line 235: .dispatch(GET, { url: "setting/engineer" })
- Line 266: .dispatch(PATCH, { url: "setting/engineer", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Partial/Visit-barcode.vue

- Line 19: <v-btn
- Line 182: .dispatch(GET, { url: "setting/job" })
- Line 205: .dispatch(PATCH, { url: "setting/job", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Payment.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 130: <v-btn
- Line 196: .dispatch(GET, { url: "setting/payment" })
- Line 211: .dispatch(PATCH, { url: "setting/payment", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Pickup.vue

- Line 19: <v-btn
- Line 28: <v-btn
- Line 204: <v-btn
- Line 212: <v-btn
- Line 288: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 299: .dispatch(requestType, {
- Line 323: .dispatch(PATCH, {
- Line 340: .dispatch(GET, {
- Line 357: .dispatch(GET, { url: "pic-address" })

### frontend/src/view/pages/profile/Setting/Pickup-Address.vue

- Line 510: .dispatch(GET, { url: `pic-single-address/${id}` })
- Line 535: .dispatch(QUERY, {
- Line 562: .dispatch(QUERY, {
- Line 618: .dispatch(QUERY, {

### frontend/src/view/pages/profile/Setting/Product.vue

- Line 17: <v-btn
- Line 45: <v-btn
- Line 248: <v-btn
- Line 302: <v-btn
- Line 465: <v-btn
- Line 472: <v-btn
- Line 522: <v-btn
- Line 532: <v-btn
- Line 551: <v-btn
- Line 558: <v-btn
- Line 655: .dispatch(DELETE, {
- Line 707: .dispatch(PATCH, {
- Line 734: .dispatch(GET, { url: "setting/product" })
- Line 751: .dispatch(PATCH, { url: "setting/product", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Project.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/project" })
- Line 202: .dispatch(PATCH, { url: "setting/project", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Property.vue

- Line 12: <v-btn
- Line 45: <v-btn
- Line 145: <v-btn
- Line 272: <v-btn
- Line 424: <v-btn
- Line 431: <v-btn
- Line 481: <v-btn
- Line 491: <v-btn
- Line 510: <v-btn
- Line 517: <v-btn
- Line 584: .dispatch(DELETE, {
- Line 636: .dispatch(PATCH, {
- Line 663: .dispatch(GET, { url: "setting/property" })
- Line 680: .dispatch(PATCH, { url: "setting/property", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Proposal.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/proposal" })
- Line 202: .dispatch(PATCH, { url: "setting/proposal", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Purchase-Order.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/purchase-order" })
- Line 202: .dispatch(PATCH, { url: "setting/purchase-order", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Quotation.vue

- Line 12: <v-btn
- Line 38: <v-btn
- Line 100: <v-btn
- Line 227: <v-btn
- Line 337: <v-btn
- Line 383: <v-btn
- Line 493: .dispatch(GET, { url: "setting/quotation" })
- Line 516: .dispatch(PATCH, {
- Line 538: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/Quotation-Invoice.vue

- Line 12: <v-btn
- Line 54: <v-btn
- Line 184: <v-btn
- Line 334: <v-btn
- Line 341: <v-btn
- Line 396: <v-btn
- Line 406: <v-btn
- Line 425: <v-btn
- Line 432: <v-btn
- Line 517: .dispatch(DELETE, {
- Line 569: .dispatch(PATCH, {
- Line 596: .dispatch(GET, { url: "setting/validity/quotation" })
- Line 614: .dispatch(GET, { url: "setting/invoice" })
- Line 629: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/Quotation-Setting.vue

- Line 18: <v-btn
- Line 113: .dispatch(GET, { url: "setting/quotation" })
- Line 133: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/RolePermission.vue

- Line 12: <v-btn
- Line 45: <v-btn
- Line 50: v-on:click="$router.push(getDefaultRoute('role.create'))"
- Line 99: <v-btn-toggle dense v-model="role_action[index]">
- Line 100: <v-btn
- Line 103: $router.push(
- Line 116: <v-btn
- Line 120: $router.push(
- Line 133: <v-btn
- Line 232: .dispatch(GET, { url: "role" })

### frontend/src/view/pages/profile/Setting/schedule.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 52: <v-btn
- Line 168: .dispatch(POST, {
- Line 217: .dispatch(DELETE, {
- Line 236: .dispatch(GET, {
- Line 260: .dispatch(GET, { url: "setting/engineer" })
- Line 275: .dispatch(PATCH, { url: "setting/engineer", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Service.vue

- Line 12: <v-btn
- Line 45: <v-btn
- Line 116: .dispatch(PATCH, {
- Line 133: .dispatch(GET, { url: "setting/job" })

### frontend/src/view/pages/profile/Setting/Servicepld.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 48: <v-btn
- Line 211: @click="setSummary('skill')"
- Line 251: <v-btn
- Line 261: <v-btn
- Line 445: @click="setSummary('certificate')"
- Line 502: <v-btn
- Line 512: <v-btn
- Line 694: @click="setSummary('license')"
- Line 861: .dispatch(PATCH, {
- Line 906: .dispatch(PATCH, {
- Line 950: .dispatch(PATCH, {
- Line 983: .dispatch(DELETE, { url: `service-license/${type.value}/${type.id}` })
- Line 997: .dispatch(DELETE, { url: `service-skill/${type.value}/${type.id}` })
- Line 1011: .dispatch(GET, { url: "setting/service" })
- Line 1053: .dispatch(PATCH, { url: "setting/service", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Siklls-Cert-Lice copy.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 158: <v-btn
- Line 277: <v-btn
- Line 431: <v-btn
- Line 441: <v-btn
- Line 461: <v-btn
- Line 468: <v-btn
- Line 493: <v-btn
- Line 500: <v-btn
- Line 647: .dispatch(DELETE, {
- Line 701: .dispatch(PATCH, {
- Line 722: .dispatch(GET, { url: "setting/service" })

### frontend/src/view/pages/profile/Setting/Siklls-Cert-Lice.vue

- Line 12: <v-btn
- Line 43: <v-btn
- Line 112: @click="updateSkillService(jobs, 'skill')"
- Line 119: @click="deleteSkills(jobs, 'skill')"
- Line 182: <v-btn
- Line 257: @click="updateSkillService(jobs, 'certificate')"
- Line 264: @click="deleteSkills(jobs, 'certificate')"
- Line 328: <v-btn
- Line 399: @click="updateSkillService(jobs, 'license')"
- Line 406: @click="deleteSkills(jobs, 'license')"
- Line 507: <v-btn
- Line 517: <v-btn
- Line 537: <v-btn
- Line 544: <v-btn
- Line 569: <v-btn
- Line 576: <v-btn
- Line 727: .dispatch(DELETE, {
- Line 781: .dispatch(PATCH, {
- Line 802: .dispatch(GET, { url: "setting/service" })

### frontend/src/view/pages/profile/Setting/Supplier.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/supplier" })
- Line 202: .dispatch(PATCH, { url: "setting/supplier", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Supplier-Setting.vue

- Line 12: <v-btn
- Line 50: <v-btn
- Line 174: <v-btn
- Line 346: <v-btn
- Line 356: <v-btn
- Line 376: <v-btn
- Line 383: <v-btn
- Line 408: <v-btn
- Line 415: <v-btn
- Line 572: .dispatch(DELETE, {
- Line 626: .dispatch(PATCH, {
- Line 647: .dispatch(GET, { url: "categories/supplier" })

### frontend/src/view/pages/profile/Setting/Tags-List.vue

- Line 84: <v-btn
- Line 97: <v-btn
- Line 233: <v-btn
- Line 243: <v-btn
- Line 263: <v-btn
- Line 270: <v-btn
- Line 295: <v-btn
- Line 302: <v-btn
- Line 499: .dispatch(QUERY, { url: "tags-list", data: data })
- Line 562: .dispatch(DELETE, {
- Line 604: .dispatch(POST, {

### frontend/src/view/pages/profile/Setting/Task.vue

- Line 12: <v-btn
- Line 40: <v-btn
- Line 127: <v-btn
- Line 187: .dispatch(GET, { url: "setting/task" })
- Line 202: .dispatch(PATCH, { url: "setting/task", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Taxes.vue

- Line 12: <v-btn
- Line 35: <v-btn
- Line 45: <v-btn
- Line 234: <v-btn
- Line 243: <v-btn
- Line 475: .dispatch(DELETE, { url: "setting/taxes/" + id })
- Line 511: .dispatch(DELETE, { url: "setting/tax_exemptions/" + id })
- Line 536: .dispatch(GET, { url: "setting/taxes" })
- Line 572: .dispatch(PATCH, { url: "setting/taxes", data: _this.setting })

### frontend/src/view/pages/profile/Setting/TermsAndCondition.vue

- Line 12: <v-btn
- Line 21: <v-btn
- Line 485: <v-btn
- Line 494: <v-btn
- Line 584: .dispatch(reqType, { url: reqURL, data: _this.termsData })
- Line 601: .dispatch(PATCH, { url: `setting/quote-terms/${id}/status` })
- Line 617: .dispatch(PATCH, { url: `setting/quote-terms/${id}/make-default` })
- Line 665: .dispatch(GET, { url: "setting/quote-terms" })

### frontend/src/view/pages/profile/Setting/Time-Slotes.vue

- Line 12: <v-btn
- Line 44: <v-btn
- Line 54: <v-btn
- Line 220: .dispatch(POST, {
- Line 248: .dispatch(GET, {

### frontend/src/view/pages/profile/Setting/Tool.vue

- Line 13: <v-btn
- Line 46: <v-btn
- Line 156: .dispatch(GET, { url: "setting/equipment" })
- Line 171: .dispatch(PATCH, { url: "setting/equipment", data: _this.setting })

### frontend/src/view/pages/profile/Setting/Visit.vue

- Line 12: <v-btn
- Line 46: <v-btn
- Line 119: <v-btn
- Line 124: @click="showDescription(jobs.description)"
- Line 146: @click="updatejobsType(jobs)"
- Line 153: @click="deletejobs(jobs)"
- Line 253: <v-btn
- Line 259: @click="showDescription(jobs.description)"
- Line 333: <v-btn
- Line 453: <v-btn
- Line 507: <v-btn
- Line 577: <v-btn
- Line 659: <v-btn
- Line 748: <v-btn
- Line 882: <v-btn
- Line 892: <v-btn
- Line 910: <v-btn
- Line 917: <v-btn
- Line 941: <v-btn
- Line 948: <v-btn
- Line 1106: .dispatch(GET, { url: "setting/service" })
- Line 1145: .dispatch(GET, { url: "setting/job" })
- Line 1184: .dispatch(DELETE, {
- Line 1222: .dispatch(PATCH, {
- Line 1258: .dispatch(PATCH, {
- Line 1276: .dispatch(PATCH, { url: "setting/job-invoice", data: _this.setting })
- Line 1289: .dispatch(PATCH, {
- Line 1318: .dispatch(PATCH, {
- Line 1334: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/ZoneTemplate.vue

- Line 12: <v-btn
- Line 57: <v-btn
- Line 178: <v-btn
- Line 247: <v-btn
- Line 253: @click="showDescription(jobs.description)"
- Line 407: <v-btn
- Line 417: <v-btn
- Line 440: <v-btn
- Line 447: <v-btn
- Line 466: <v-btn
- Line 473: <v-btn
- Line 493: <v-btn
- Line 626: .dispatch(GET, { url: "setting/zones" })
- Line 653: .dispatch(DELETE, {
- Line 676: .dispatch(PATCH, {
- Line 724: .dispatch(PATCH, {
- Line 772: .dispatch(GET, { url: "setting/job" })

### frontend/src/view/pages/profile/TimeSheet.vue

- Line 26: <v-btn
- Line 58: <v-btn
- Line 193: <v-btn
- Line 211: <v-btn
- Line 532: <v-btn
- Line 540: <v-btn
- Line 743: .dispatch(QUERY, {
- Line 782: this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/profile/UserPermission.vue

- Line 30: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Permission" }]);

### frontend/src/view/pages/profile/UserPermissionList.vue

- Line 19: .dispatch(GET, {

### frontend/src/view/pages/profile/UserRoleTableTemplate.vue

- Line 9: <v-btn
- Line 40: <v-btn
- Line 93: <v-btn
- Line 100: $router.push(
- Line 148: <v-btn
- Line 158: <v-btn
- Line 227: .dispatch(QUERY, {
- Line 260: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 267: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Users.vue

- Line 56: this.$store.dispatch(SET_BREADCRUMB, [{ title: "Users" }]);

### frontend/src/view/pages/profile/UserTableTemplate.vue

- Line 58: <v-btn
- Line 159: <v-btn
- Line 169: <v-btn
- Line 239: .dispatch(QUERY, {
- Line 269: _this.$store.dispatch(CLEAR_ERROR, {});
- Line 280: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Visit-TImeSheet.vue

- Line 26: <v-btn
- Line 58: <v-btn
- Line 193: <v-btn
- Line 211: <v-btn
- Line 550: <v-btn
- Line 558: <v-btn
- Line 747: this.$router.replace({ query: {} });
- Line 766: .dispatch(QUERY, {
- Line 800: this.$store.dispatch(SET_BREADCRUMB, [

## Item/detail/create/edit page actions

### frontend/src/view/pages/custom-field/Create-Custom-Field.vue

- Line 146: <v-btn
- Line 172: <v-btn
- Line 182: <v-btn
- Line 251: .dispatch(POST, { url: "custom-field", data: _this.customField })

### frontend/src/view/pages/custom-field-v2/CreateCustomField.vue

- Line 635: .dispatch(POST, { url: "module/custom-fields", data: payload })
- Line 656: .dispatch(GET, { url: `module/customField/${this.getUpdateId}` })

### frontend/src/view/pages/custom-field-v2/CustomForm.vue

- Line 169: this.$store.dispatch(GET_FIELD_DATA, this.module);

### frontend/src/view/pages/custom-field-v2/CustomFormDetail.vue

- Line 20: <v-btn
- Line 26: @click="updateDialog = true"
- Line 171: <v-btn
- Line 181: <v-btn
- Line 215: <v-btn
- Line 219: @click="updateDialog = false"
- Line 223: <v-btn
- Line 229: @click="onUpdate"
- Line 254: <v-btn
- Line 265: <v-btn
- Line 368: .dispatch(PUT, {

### frontend/src/view/pages/custom-field-v2/field-properties/CreateOptions.vue

- Line 26: <v-btn min-width="30" width="30" height="32" icon>
- Line 48: <v-btn
- Line 55: @click="removeOptions(index)"
- Line 65: <v-btn
- Line 70: @click="addOptions()"

### frontend/src/view/pages/custom-field-v2/field-properties/c-text-editable.vue

- Line 24: @click="makeEditable"

### frontend/src/view/pages/formBuilder/Form.vue

- Line 8: <v-btn
- Line 16: <v-btn
- Line 152: <!-- <v-btn
- Line 160: <v-btn
- Line 232: <v-btn
- Line 239: <v-btn tile depressed color="white--text" class="cyan"

### frontend/src/view/pages/profile/Setting/CreateEmailTemplate.vue

- Line 25: <v-btn
- Line 33: <v-btn
- Line 375: .dispatch(GET, { url: "setting/email-template/" + _this.template })
- Line 409: .dispatch(PATCH, {
- Line 415: _this.$router.go(-1);
- Line 428: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/profile/Setting/CreateRole.vue

- Line 13: <v-btn
- Line 16: $router.push(
- Line 29: <v-btn
- Line 504: .dispatch(POST, {
- Line 526: .dispatch(PATCH, {
- Line 562: _this.$router.push(
- Line 579: .dispatch(GET, { url: "permission" })
- Line 592: .dispatch(GET, {
- Line 642: .dispatch(GET, { url: "role" })
- Line 679: _this.$store.dispatch(SET_BREADCRUMB, [

### frontend/src/view/pages/profile/Setting/OverviewTab.vue

- Line 338: <v-btn
- Line 501: @click="routeToDetail(row.id)"
- Line 559: this.$router.push(
- Line 572: .dispatch(QUERY, {

### frontend/src/view/pages/profile/Setting/ServiceForm.vue

- Line 12: <v-btn
- Line 281: <v-btn
- Line 288: <v-btn
- Line 378: .dispatch(GET, { url: "setting/service-form" })
- Line 393: .dispatch(PATCH, {

### frontend/src/view/pages/profile/Setting/ServiceFormTemplate.vue

- Line 18: <v-btn
- Line 24: $router.push(getDefaultRoute('serviceFormTemplate.create'))
- Line 33: <v-btn
- Line 118: $router.push(
- Line 173: <v-btn
- Line 180: <v-btn
- Line 239: _this.$router.push(
- Line 253: .dispatch(PUT, {
- Line 275: .dispatch(GET, { url: "service-form-templates" })

### frontend/src/view/pages/profile/Users-Detail.vue

- Line 159: .dispatch(GET, {

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

