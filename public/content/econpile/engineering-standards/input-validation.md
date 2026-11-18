# Input Validation & Data Quality

This page defines the shared input rules that new Econpile features should follow. Client checks improve usability; the Laravel request/controller layer remains the authority for validation, authorization, and business invariants.

## Global emoji guard

`frontend/src/main.js` installs `@/core/plugins/no-emoji`. The plugin blocks emoji entry and sanitizes pasted, dropped, and input-event text across editable inputs, textareas, and contenteditable elements. It supports direct typing, paste, drop, and rich-text text-node cleanup.

Emoji are deliberately allowed inside `[data-allow-emoji]`, `.allow-emoji`, and `.message-content` (the chat/notes composer). Use one of these explicit opt-outs only where emoji are a valid product requirement. The optional `v-no-emoji` directive can guard an individual container; `$noEmoji` exposes `allow`, `deny`, `enable`, and `disable` for exceptional runtime needs.

Do not copy the emoji regex into forms. The shared helper `@/core/lib/emoji.lib.js` is the single source of truth. Server-side validation/sanitization is still required for API, import, and integration payloads that bypass the browser.

## Text fields and numeric-only values

Use `validateRules.notNumericOnly(value, field)` for human-readable fields such as names, designations, and address text when a number-only value is invalid. Do not apply it to identifiers, phone numbers, postcodes, quantities, codes, or money.

## Numeric and price input

Use `frontend/src/view/components/app-component/PriceInput.vue` for user-entered monetary/decimal values. It renders a text input with decimal input mode; permits digits and one decimal separator; normalizes commas; optionally permits a leading negative sign; and sanitizes keyboard, paste, and drop input.

`maxLength`, `maxDecimals`, and `maxValue` are configurable (defaults: 13, 2, and 9,999,999,999.99). The component emits the display string on `input` and a numeric-or-null value on `numeric-input`.

Treat `numeric-input` as a convenience, not proof of validity. On submit, validate requiredness, decimal precision, ranges, currency/unit semantics, and business ceilings on the server. Use a decimal-safe persistence/calculation strategy; JavaScript floating-point values are not suitable as the sole monetary authority.

## Required implementation checklist

1. Use the shared control/rules instead of local regexes.
2. Normalize and validate again in Laravel Form Requests.
3. Authorize the relationship being submitted (customer/site, asset/parent, rental/line).
4. Return field-level errors that the Vue form can display.
5. Test keyboard, paste, drop, direct API, import, and concurrent submission paths.
