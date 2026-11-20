# calendar-tracking — Listing and Item Page Actions

This page documents UI actions found in the active Vue source for this module. It separates list/table pages from create/edit/detail/item pages. Dynamic icon actions may not have a visible text label; the source event or navigation call is the authoritative identifier.

## Module dependencies

Calendar consumes Jobs, Visits, Engineers/Teams, recurring schedules, Google/Outlook integrations, and live tracking data.

## Listing page actions

### frontend/src/view/pages/AllCalendar.vue

- Line 21: <v-btn
- Line 26: @click="setToday()"
- Line 33: <v-btn
- Line 38: @click="prev"
- Line 52: <v-btn
- Line 57: @click="next"
- Line 66: <v-btn
- Line 70: $router.push(getDefaultRoute('calendar.all-calendar'))
- Line 76: <v-btn
- Line 81: v-on:click="$router.push(getDefaultRoute('calendar'))"
- Line 85: <v-btn
- Line 89: $router.push(
- Line 97: <v-btn
- Line 101: $router.push(
- Line 113: <v-btn
- Line 124: <v-list-item @click="type = 'day'">
- Line 127: <v-list-item @click="type = 'week'">
- Line 130: <v-list-item @click="type = 'month'">
- Line 133: <v-list-item @click="type = '4day'">
- Line 149: <v-btn
- Line 152: v-on:click="$router.push(getDefaultRoute('calendar'))"
- Line 159: <v-btn
- Line 163: $router.push(getDefaultRoute('calendar.resource-h'))
- Line 170: <v-btn
- Line 174: $router.push(getDefaultRoute('calendar.map'))
- Line 194: @click:event="showEvent"
- Line 195: @click:more="showEventPopup($event)"
- Line 196: @click:date="viewDay"
- Line 305: <v-btn
- Line 308: @click="selectedOpen = false"
- Line 492: _this.$store.dispatch(SET_BREADCRUMB, [{ title: "Calendar" }]);
- Line 545: .dispatch(QUERY, {
- Line 753: .dispatch(GET, {
- Line 772: .dispatch(GET, {
- Line 850: .dispatch(GET, {

### frontend/src/view/pages/calendar/Calendar.vue

- Line 6: <v-btn depressed tile color="cyan white--text" @click="setToday">
- Line 9: <v-btn fab outlined height="28" width="28" class="ml-3" color="grey darken-2" @click="prev">
- Line 12: <v-btn fab outlined height="28" width="28" class="ml-3" color="grey darken-2" @click="next">
- Line 106: <v-btn depressed tile outlined color="blue darken-4" class="mr-3" v-bind="attrs" v-on="on">
- Line 112: <v-list-item class="border-bottom" @click="calendarFilterType = 'Assigned Visit'">
- Line 115: <v-list-item @click="calendarFilterType = 'UnAssigned Visit'">
- Line 122: <v-btn depressed tile color="cyan white--text" class="white--text" v-bind="attrs" v-on="on">
- Line 128: <v-list-item @click="type = 'day'">
- Line 131: <v-list-item @click="type = 'week'">
- Line 134: <v-list-item @click="type = '4day'">
- Line 137: <v-list-item @click="type = 'month'">
- Line 142: <v-btn depressed tile color="cyan white--text" class="white--text ml-3"
- Line 146: <!--   <v-btn
- Line 153: @click="toggleVisit = !toggleVisit"
- Line 171: :event-color="getEventColor" :type="type" @click:event="openSingledata" @click:more="showAllEvent"
- Line 172: @click:date="createGoogleEvent" @change="updateRange" :weekdays="cWeekdays">
- Line 265: }" @click="handleStatusClick(row)">
- Line 299: @click="selectedOpen = false"
- Line 353: <v-list-item link @click="filterType = 'All visit'">
- Line 359: <v-list-item link @click="filterType = 'Assigned Visit'">
- Line 365: <v-list-item link @click="filterType = 'UnAssigned Visit'">
- Line 375: <v-btn fab icon small @click="showCalendarFilter = !showCalendarFilter">
- Line 378: <!--  <v-btn fab icon small min-width="30" width="30">
- Line 497: <v-icon class="cursor-pointer ml-4" size="18" @click="eventPopover = false">mdi-close</v-icon>
- Line 555: <v-btn depressed :disabled="googleEventLoading" @click="googleEventDialog = false"
- Line 559: <v-btn depressed :disabled="googleEventLoading" :loading="googleEventLoading" @click="handleGoogleEvent"
- Line 748: //       .dispatch(POST, {
- Line 766: //     .dispatch(GET, { url: "oauth/google/events" })
- Line 1040: .dispatch(QUERY, {
- Line 1083: .dispatch(QUERY, {
- Line 1109: .dispatch(QUERY, {
- Line 1135: .dispatch(QUERY, {

### frontend/src/view/pages/calendar/ResourceCalendar.vue

- Line 25: @click="changeModule('Visit')"
- Line 30: <v-list-item @click="changeModule('Delivery')">
- Line 35: <v-btn
- Line 44: <v-btn
- Line 58: <v-btn
- Line 192: <v-btn
- Line 202: <v-btn
- Line 212: <v-btn
- Line 222: <v-btn
- Line 232: <v-btn
- Line 239: @click="toggleVisit = !toggleVisit"
- Line 301: @click="filterType = 'Assigned Ticket'"
- Line 317: @click="filterType = 'UnAssigned Ticket'"
- Line 335: <v-btn
- Line 339: @click="showCalendarFilter = !showCalendarFilter"
- Line 343: <!--  <v-btn fab icon small min-width="30" width="30">
- Line 539: <v-btn
- Line 547: <v-btn
- Line 973: .dispatch(PATCH, {
- Line 1050: .dispatch(QUERY, {
- Line 1116: .dispatch(QUERY, {

### frontend/src/view/pages/calendar/ResourceCalendarMap.vue

- Line 11: <v-btn
- Line 18: @click="toggleVisit = !toggleVisit"
- Line 68: @click="filterEngineer(item)"
- Line 142: <v-btn
- Line 146: @click="isLeftCollapsePanel = !isLeftCollapsePanel"
- Line 625: <v-btn
- Line 629: @click="isRightCollapsePanel = !isRightCollapsePanel"
- Line 670: @click="selectJobs(item)"

## Item/detail/create/edit page actions

### frontend/src/view/pages/calendar/CreateEvent.vue

- Line 105: <v-btn depressed tile v-on:click="$emit('close', false)"> Close </v-btn>
- Line 106: <v-btn class="white--text" depressed color="blue darken-4" tile>

### frontend/src/view/pages/calendar/DetailDrawer.vue

- Line 14: <v-btn depressed tile class="mr-2" v-on:click="$emit('close', true)"
- Line 17: <v-btn tile depressed color="white--text" class="cyan">Edit</v-btn>

## How to trace each button safely

1. Locate the Vue event or navigation line above.
2. Follow the handler in the same component or its mixin/store module.
3. Match the API URL to routes/api.php, then follow the controller method.
4. Check request validation, permissions, model relationships, status changes, jobs, notifications, PDF/export output, and error handling before changing behavior.

## Verification boundary

The inventory records source event bindings and calls. A button label rendered from a translation key or a shared component may not be visible in the page file. Such labels are Not verified unless the source explicitly exposes them.

