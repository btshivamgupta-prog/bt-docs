# 7. Rules for Developers

[← Back to overview](overview.md)

Quick guardrails to avoid corrupting stock when writing new code.

---

1. **Never write `available_stock` directly.** Always go through a helper from
   [Stock Helper Methods](stock-helpers.md) so the invariant
   `available = stock_on_hand - committed` holds.

2. **Commit reserves; consume removes.** Use `commitProductStock` for reservations and
   `consumeProductStock` only when stock physically leaves (visit completion).

3. **Editing already releases + re-commits.** Don't hand-fix `committed_stock` in new
   code — reuse `restoreVisitLineItemsForUpdate` and its returned diffs.

4. **Aggregate history.** Prefer one `ProductHistory` row with a count + preview over N
   rows when an action touches many serials; keep the full list in `attributes`.

5. **Serialized products need both tracks in step.** Keep the quantity columns *and* the
   `product_serial_numbers` outbound flags consistent — use `handleSerializedOutbond` to
   mark outbound and reset them inline on release (as `restoreVisitLineItemsForUpdate` does).
