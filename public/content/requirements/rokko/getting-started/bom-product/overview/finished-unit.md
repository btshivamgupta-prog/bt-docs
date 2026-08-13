
# Requirement — Rework "Mark Faulty" & "Rollback" for Finished Unit

> **Status:** Draft for verification (no code changes yet)
> **Endpoint affected:** `POST /bom-product/finished-unit/status` → `BomProductController::updateFinishedUnitStatus()`
> **Frontend affected:** `MarkFaultyDialog.vue`, `Serials-Composition.vue`, `detail-finished-unit.vue`

---

## 1. Purpose

Change the behaviour of the finished-unit status flow so that:

1. **`mark_faulty`** only marks the finished unit as Faulty and its serials as faulty — it must **NOT** change the component row's status (`finished_unit_components.status` stays as it is, e.g. `Assigned`).
2. **`rollback`** becomes **replacement-history-aware**: it rolls back any prior replacement and restores the previous component; if there is no replacement history, it resets the component to its **initial phase**.

---

## 2. Glossary

| Term | Meaning |
|---|---|
| Finished unit | `product_serial_numbers` row with `product_type = 'bom_product'` |
| Component row | `finished_unit_components` row (per unit, per BOM component) |
| Assignment | `finished_unit_component_assignments` row (which serial/qty is on the unit) |
| Replacement history | `finished_unit_component_replacements` row (old/new serial, reason, warranty) |
| Serial | `product_serial_numbers` row for a component |
| Component type | One of: serialized product / non-serialized product / serialized "Other" / non-serialized "Other" |

---

## 3. Payload (shape unchanged)

```json
{
  "unit_ids": [201],
  "status": 4,
  "reason": "Failed Quality Inspection",
  "remarks": "",
  "return_components": false,
  "components": [
    { "bom_component_id": 72, "component_product_id": 26, "assigned_qty": 2, "action": "rollback" },
    { "bom_component_id": 73, "serial_number": "SDF", "action": "mark_faulty" }
  ]
}
```

`components[].action` is one of `mark_faulty` | `rollback`.

---

## 4. Action: `mark_faulty`

### 4.1 Unit level (always)
- `product_serial_numbers.status = 4` (Faulty)
- `status_reason = reason`, `remarks = remarks`
- Unit-level **Outbound** movement (Main Warehouse → Finished Unit).

### 4.2 Per component — `mark_faulty`

**Serialized component** (has a serial — real product or "Other"):
- Mark the assigned serial in `product_serial_numbers.status = 4` (Faulty).
- Record **Outbound** movement to **Quarantine** for that serial.
- `finished_unit_components.status` → **UNCHANGED** (stays `Assigned`).

**Non-serialized component** (quantity-based — real product or "Other"):
- Record a **history entry** noting that **N qty was marked faulty** (reason = `Faulty`).
- `finished_unit_components.status` → **UNCHANGED** (stays `Assigned`).
- Record **Outbound** movement to **Quarantine** with qty = N.

### 4.3 What changes vs current behaviour
| Aspect | Current | New |
|---|---|---|
| `finished_unit_components.status` on mark_faulty | set to `Faulty (4)` | **unchanged** (stays `Assigned`) |
| Assignments on mark_faulty | kept | kept |
| Serial → faulty (`product_serial_numbers.status=4`) | yes | yes (unchanged) |
| Non-serialized mark_faulty → history | none | **add history** (N qty faulty) |
| Movements | Outbound to Quarantine | Outbound to Quarantine (unchanged) |
---

## 5. Action: `rollback` — history-aware

**Goal:** roll back any prior replacement and restore the previous component. If there is no replacement history, reset the component to its **initial phase**.

### 5.1 General rule (applies to all 4 component types)

For a component (or serial) being rolled back:

- **If a replacement history record exists** for it → **roll back the replacement**:
  - restore the **old / previous** value (serial or qty) from the history onto the unit,
  - remove the **current / new** value (restore to stock / release).
- **If there is NO replacement history** → **reset to initial phase**:
  - status = `Pending`,
  - `assigned_qty` = `0`,
  - `req` shows `0 of N` (0 assigned of N required).

### 5.2 Per component type

#### a) Serialized product (has `component_product_id`, `is_serialized = 1`, product from `products`)
Example: component A assigned serials **A1, A2**.
- For each serial (A1, A2):
  - **Has history** → that serial replaced an older one → restore the older serial as the assignment and remove the current serial (restore current to In Stock).
  - **No history** → remove the serial (restore to In Stock). When all serials are removed, the component resets to `Pending` (`req 0 of 2`).

#### b) Non-serialized product (has `component_product_id`, quantity-based)
- **Has history** → restore the previous quantity/component.
- **No history** → reset `assigned_qty` to `0`, status `Pending`, restore product stock by the removed qty.

#### c) Serialized "Other" (`is_other = 1`, has `serial_number`, no product)
- **Has history** → restore the previous serial (recorded in history).
- **No history** → remove the serial, reset component to `Pending`.

#### d) Non-serialized "Other" (`is_other = 1`, quantity-based, no product)
- **Has history** → restore the previous quantity.
- **No history** → reset to `Pending`, `assigned_qty = 0`.

### 5.3 What changes vs current behaviour
| Aspect | Current | New |
|---|---|---|
| Rollback checks replacement history | no | **yes** — restores previous component if history exists |
| Rollback with no history | removes serial, restores stock | **reset to initial phase** (Pending, qty 0) |
| `finished_unit_components.status` on rollback | Faulty/Removed | **Pending** (initial phase) when no history; restored value when history exists |
| Assignment rows | deleted | deleted (current new serial removed; old serial re-added when history exists) |

---

## 6. Tables affected

| Table | mark_faulty | rollback |
|---|---|---|
| `product_serial_numbers` | unit → 4; serials → 4 | serials → In Stock (restored) |
| `finished_unit_components` | **status unchanged** | reset to Pending / restored previous |
| `finished_unit_component_assignments` | unchanged | delete current; re-add old if history |
| `finished_unit_component_replacements` | **add faulty-qty history** (non-serialized) | read history to restore previous |
| `serial_number_movements` | Outbound → Quarantine | Inbound (restore) / Outbound |
| `products` (stock) | unchanged | restore/deduct stock |
---

## 7. Example Scenarios

### Scenario A — mark_faulty, serialized component (no rollback)
**Payload:** unit 201 faulty; component = serialized product, serial 160.
- Unit 201 → `status = 4`.
- Serial 160 → `status = 4` (Faulty).
- `finished_unit_components.status` → **stays Assigned** (unchanged).
- Movement: Outbound → Quarantine.

### Scenario B — mark_faulty, non-serialized component (qty 2)
**Payload:** unit 201 faulty; component = non-serialized product, `assigned_qty = 2`.
- Unit 201 → `status = 4`.
- History entry: **"2 qty marked faulty"** (reason = Faulty).
- `finished_unit_components.status` → **stays Assigned** (unchanged).
- Movement: Outbound → Quarantine, qty 2.

### Scenario C — rollback, serialized product WITH replacement history
Component A originally had serial **OLD**, later replaced with **NEW** (recorded in replacement history).
- Rollback → restore **OLD** back onto unit (create assignment), remove **NEW** (restore NEW to In Stock).
- Component A returns to its previous state (OLD assigned).

### Scenario D — rollback, serialized product WITHOUT replacement history
Component A has serials **A1, A2** assigned, no replacement history.
- Rollback → remove A1 and A2 (restore each to In Stock).
- Component A → **initial phase**: status `Pending`, `assigned_qty = 0`, `req 0 of 2`.

---

## 8. Confirmed Decisions & Clarifying Examples

### Confirmed answers
1. **Non-serialized mark_faulty — qty:** status stays **`Assigned`**, so `assigned_qty` **stays as-is** (does NOT reset). Only a history entry is added.
2. **Initial-phase display:** **`0 of 2`** (0 assigned of 2 required), status `Pending` — confirmed.
3. **Multiple history records:** restore the **latest** replacement record.
4. **Restore warranty/date:** **No** — do NOT restore warranty/purchase dates on rollback.
5. **Partial history (per-serial):** **No** — for now handle rollback at the **component** level, not per-serial.
6. **Stock on rollback with history:** **Yes** — intended (see Example ②).
7. **Non-serialized rollback with no history:** **Yes** — stock restored by the removed qty (see Example ③).
8. **`return_components`:** see discussion below — currently proposed to be **ignored / kept as-is** (no behaviour change).

---

### Example ① — "Initial-phase" display (Q2)

Component A requires **2** serials (`required_qty = 2`). The **Req** column shows `{assigned} of {required}`.

| State | Assigned serials | Req column | Status |
|---|---|---|---|
| Fully assigned (current) | A1, A2 | `2 of 2` | Assigned |
| Replacement happened | A1 replaced by A3 | `2 of 2` | Assigned |
| Rollback with **no history** (initial phase) | **none** | `0 of 2` | **Pending** |

So the question is: in the initial phase, should the Req column show **`0 of 2`** (= 0 assigned of 2 required) or **`2 of 2`** (= the requirement label)?

- **My assumption:** `0 of 2` (0 assigned, 2 required), status `Pending`.
- Your original wording said "req 2 of 2 and status pending" — please confirm whether you want `0 of 2` or `2 of 2`.

### Example ② — Stock on rollback when replacement history EXISTS (Q6)

Component A is a **serialized product** (product 49) on unit 201.

Timeline:
1. Originally serial **OLD-1** was assigned to unit 201.
2. **Replacement:** OLD-1 was replaced by **NEW-1** → a history record exists (`old = OLD-1`, `new = NEW-1`). During the replacement, OLD-1 was returned to stock (+1 available), NEW-1 was drawn from stock (−1 available).
3. Now user does **rollback** on component A.

**Expected behaviour (per new requirement):**
- Remove **NEW-1** from unit 201 → NEW-1 returns to **In Stock** (product 49 available +1, Inbound movement).
- Restore **OLD-1** back onto unit 201 → OLD-1 leaves stock again (product 49 available −1, Outbound movement); create an assignment for OLD-1.
- Component A status → back to **Assigned** (OLD-1 on it).

**Stock net effect on product 49:** 0 (NEW-1 returned +1, OLD-1 redrawn −1).

> Please confirm this is the intended stock behaviour for rollback-with-history.

### Example ③ — Non-serialized rollback with NO history (Q7)

Component B is a **non-serialized product** (product 88) on unit 201, `required_qty = 3`, currently `assigned_qty = 3`. No replacement history.

**Rollback (no history) → reset to initial phase:**
- `finished_unit_components.assigned_qty` → `0`
- `finished_unit_components.status` → `Pending`
- The 3 units of product 88 that were "in" the unit are returned to available stock: product 88 `available_stock` +3, Inbound movement (Finished Unit → Main Warehouse, qty 3).

**Net effect:** component resets to Pending/0, product 88 stock restored by 3.

> Please confirm the stock restoration (+3) on no-history rollback is correct.

---

### Q&A notes — resolved
- **Q4 (restore warranty/date):** **No** — do NOT restore warranty/purchase dates on rollback. Confirmed.

### Q8 — `return_components` (why it exists & recommendation)
`return_components` is accepted in the payload as an optional boolean, but in the current code it is **never actually used** — it was reserved for a future decision about whether rolled-back/removed components should be returned to reusable inventory.

**Why it exists:** it lets the user decide, when marking a unit faulty, whether the components that come off the unit should go **back to usable stock** (`return_components = true`) or be **treated as consumed / not returned** (`return_components = false`).

**Recommendation for the new flow:** since the stock/rollback behaviour is now fully defined and confirmed (see Examples ② and ③), I recommend **keeping `return_components` as it is = ignored** (no behaviour change). This avoids adding a second, potentially confusing decision path. If you later want it to control stock restoration, we can wire it in.

**Decision (confirmed): (A) Stay ignored.** `return_components` keeps its current no-op behaviour; the rollback/stock behaviour is fully defined by the action + history.

---

## 9. Serial Inventory State Conventions (important)

A serial's availability is driven by `product_serial_numbers`:

| State | `status` | `activated` | `is_outbond` | `bond_type` | `outbond_id` | Meaning |
|---|---|---|---|---|---|---|
| **In Stock / Available** | 1 (In Stock) | 1 | 0 | inbond | 0 | can be assigned |
| **On a finished unit** | 3 (Out of Stock) | 0 | 1 | outbond | finished-unit id | assigned, used |

`availableSerials()` only returns serials where `activated = 1`, `status` is null/In Stock, and `is_outbond` is null/0.

> **Rule:** when a serial is re-assigned back onto a finished unit it MUST be `status = 3`, `is_outbond = 1`, `outbond_id = <unit>`. When a serial is returned to inventory it MUST be `status = 1`, `is_outbond = 0`.

---

## 10. Use Case — Mixed Rollback: serials A & C, where C has replacement history (old B → new C)

### Scenario
Component (bom 71, product 49, required 2) on unit 218 currently has serials **A** and **C** assigned. **C** replaced **B** earlier (history: old = B, new = C). **A** has no history.

### Rollback of both A and C (payload sends both as `rollback`)

Because the history lookup is **per-serial** (`new_serial_id`), the two are handled independently:

**A (no history)** → `rollbackSerializedComponent(A)`:
- A removed from unit → A becomes **In Stock (1)**, `is_outbond = 0` (available).
- Component assigned_qty decremented.

**C (history: old B, new C)** → `restorePreviousComponent(C)`:
1. **C removed** from unit → C becomes **In Stock (1)**, `is_outbond = 0` (available).
2. **B restored** onto unit → B becomes **Out of Stock (3)**, `is_outbond = 1`, `outbond_id = 218` (on unit), and a new assignment row is created for B.
3. Component row → recalculated from actual assignments (only B remains → `assigned_qty = 1`).

### Final state
| Serial | Inventory state | On unit? |
|---|---|---|
| A | In Stock (1), available | no |
| C | In Stock (1), available | no |
| B | **Out of Stock (3), on unit** | **yes** |

The finished unit now has **B** assigned only. `finished_unit_components.assigned_qty = 1`, `required_qty = 2`. Because the component is **not fully assigned (1 of 2)**, its status is **`Pending`** (not Assigned).

> **`assigned_qty` / status maintenance:** `assigned_qty` is always **recalculated from the actual assignments** (`getComponentAssignedQty`) after every rollback via `recalcFinishedUnitComponentRow`. So:
> - `required_qty` stays the static recipe value (e.g. 2).
> - `assigned_qty` = real count of assigned serials/quantities (e.g. 1 when only B is on the unit).
> - `status` = **`Assigned` when `assigned_qty >= required_qty`** (fully assigned), otherwise **`Pending`** (e.g. 1 of 2 → Pending).
>
> This prevents the row from showing `assigned_qty = 0` while a serial (B) is still assigned.

### Requirement
- All serials that come off the unit (A, C) return to **In Stock**.
- The serial restored from history (B) is marked **Out of Stock / on unit** — **not** In Stock.
- The component row keeps the restored serial (B), but its status is **`Pending`** because it is not fully assigned (1 of 2 < required 2); it becomes `Assigned` only when fully assigned (`assigned_qty >= required_qty`).

---

## 11. Use Case Summary Table (all rollback paths)

| Component type | Replacement history? | Result |
|---|---|---|
| Serialized product | Yes | New serial → In Stock; previous serial → Out of Stock (on unit); component → recalc (`Assigned` if fully assigned, else `Pending` e.g. 1 of 2) |
| Serialized product | No | Serial → In Stock; component → Pending, qty 0 |
| Serialized "Other" | Yes | New serial → removed; previous serial → restored; component → recalc (`Assigned` if fully assigned, else `Pending`) |
| Serialized "Other" | No | Serial removed; component → Pending, qty 0 |
| Non-serialized product | Yes * | Restore all assigned qty → 0; component → **Pending**; product stock restored; **history maintained** |
| Non-serialized product | No | Restore all assigned qty → 0; component → **Pending**; product stock restored |
| Non-serialized "Other" | Yes * | Restore all qty → 0; component → **Pending** |
| Non-serialized "Other" | No | Restore all qty → 0; component → **Pending** |

> **\* Non-serialized components ignore replacement history:** rollback always resets a non-serialized component to its initial phase (status `Pending`, `assigned_qty 0`) and restores the product stock. The history-aware "restore previous" behavior only applies to **serialized** components.

> **Status constants note:** the `finished_unit_components.status` column uses **`BomProductComponent::STATUS_*`** semantics (`ASSIGNED = 1`, `PENDING = 2`, `FAULTY = 4`, `REMOVED = 5`), NOT `FinishedUnitComponent::STATUS_*` (which are reversed). All code must use `BomProductComponent::STATUS_*` for this column.

---

## 12. Non-Consumable BOM Product Flow (new requirement)

### 12.1 Context / Current behaviour
For a **non-consumable** BOM product:
- When a BOM is created with components and then manufactured, the finished units are created **without an assignment phase** (`finished_unit_components.status = Assigned`, `assigned_qty = required_qty`).
- The finished unit is set to **In Stock** and the **manufacturing batch is set to `completed`** immediately.
- In the frontend, the only per-component action is **Replace** (there is no Assign step for non-consumable).

### 12.2 Requirement — Replace-only + replacement-aware Mark Faulty

1. **Frontend: Replace only (no Assign)** — for non-consumable BOM products, the component action menu must show **only Replace** (Assign is not shown). This is already the case and must be preserved.

2. **Mark Faulty dialog — show only components that have a replacement** — in the Mark Faulty dialog (`Serials-Composition.vue`), only components that **actually have replacement history** should be shown in the replacement area / listed for rollback. Components with no replacement history should **not** appear as rollback candidates.

3. **Rollback of non-serialized product / "Other" components — do NOT reduce component stock**:
   - For **non-serialized product** components, rolling them back in a non-consumable context should **NOT decrement / reduce the component (product) stock**. The component comes back to the unit state but the underlying component product stock is not touched.
   - For **"Other"** (non-product) components, same — no product stock to adjust anyway.

### 12.3 Why stock is not reduced
In a **non-consumable** BOM there is no separate Assign phase — components are treated as part of the finished unit from manufacture. Rolling back a non-serialized (or "Other") component removes it from the `finished_unit_components` state but does **not** return stock to the component product (there is no outbound/inbound stock event for these in this flow). Serialized components, by contrast, do have a serial lifecycle (In Stock / on unit) and their serial state is managed.

### 12.4 Behaviour summary (non-consumable)
| Component type | Assign option | Replace option | Mark Faulty dialog shows | Rollback stock effect |
|---|---|---|---|---|
| Serialized product | ❌ | ✅ | ✅ (if has replacement history) | serial → In Stock / on unit |
| Non-serialized product | ❌ | ✅ | ✅ (if has replacement history) | **no product stock change** |
| Serialized "Other" | ❌ | ✅ | ✅ (if has replacement history) | serial removed / restored |
| Non-serialized "Other" | ❌ | ✅ | ✅ (if has replacement history) | **no stock change** |

### 12.5 Open question for confirmation
- **Q-A:** For non-serialized product rollback in a non-consumable context, should the component still reset to `Pending` + `assigned_qty 0` (just without touching component product stock)?
  - **CONFIRMED: NO.** Do NOT reset the component to Pending / assigned_qty 0 on rollback. The component stays as-is until the user **replaces** it with another serial. (Rollback alone does not change the non-serialized component's state.)
- **Q-B:** Should serialized components **without** replacement history also be hidden in the Mark Faulty dialog (only replacement-having components shown), or should they still appear for `mark_faulty`?
  - **CONFIRMED: YES — hide them.** In the Mark Faulty dialog, only components that have replacement history should be shown/listed for rollback. Serialized components **without** replacement history are hidden as rollback candidates.