
# BOM Product — The Complete Guide

*A plain-and-technical reference to how BOM (Bill of Materials) products work in this application — written so both a non-technical business user and a developer can read the same document and come away understanding every concept.*



---

## Part 0 — How to read this document

| If you are… | Read this first | Notes |
|---|---|---|
| A business / non-technical user | Part 1 → Part 2 → Part 3 → Part 5 | Understands "what happens" without code |
| A product owner / QA | Part 2, Part 5, Part 6, Part 7, Part 10, Part 13, Part 14 | Understands behaviour, decisions, limitations & roadmap |
| A developer | Part 4, Part 8, Part 9, Part 11, Part 12, Part 13, Part 14 | Understands tables, APIs, flows & improvement work |

The document re-explains the same concepts in plain words first, then in technical terms, so different audiences are covered by the same guide.

---

## 1. What is a BOM Product? 

Think of a **BOM product** as an **assembled item** made from several smaller parts.

- **Example:** A **Security Camera Kit** is not one single item you buy ready-made — it is assembled from a **Camera**, a **DVR recorder**, and some **cabling**.
- The **BOM** (Bill of Materials) is simply the **"recipe"** that says *"to build one Security Camera Kit you need two Cameras, two DVRs and one cable."*
- Each finished assembled item is called a **Finished Unit** (a unique serial number of the assembled kit).
- Every finished unit remembers **which specific parts went into it** — e.g. *"Kit serial 421 contains Camera 255, DVR 256 and Other 257."*

So the whole system is about:
1. **Defining the recipe** (what parts, and how many, make one item). ✅
2. **Manufacturing** a batch of finished units from that recipe.
3. **Assigning** the real parts to each finished unit.
4. **Managing problems** later — replacing a faulty part, marking a unit faulty, removing/rolling back a part.

### One-minute summary
> A BOM product = a recipe + finished units. The recipe lives once (globally), but **each finished unit keeps its own copy** of which parts are on it, in what quantity, and in what state — because one unit's parts can differ from another's.

---
## 2. Glossary of Terms

Each term is given in plain language and in technical terms.

| Term | Plain meaning | Technical meaning (table / field) |
|---|---|---|
| **BOM** | The recipe of parts needed to build one item | Definition stored in `bom_product_components` |
| **BOM product** | The finished (assembled) item you sell/make | A row in `products` with `product_type = 'bom_product'` |
| **Finished unit** | One physical assembled kit (e.g. Kit #421) | A row in `product_serial_numbers` with `product_type = 'bom_product'` |
| **Recipe** | The global list of parts + quantities | `bom_product_components` (the template) |
| **Component** | One of the parts that goes into a finished unit | `finished_unit_components` (per-unit copy of a recipe line) |
| **Assignment** | The record saying *"this serial/qty is on that unit"* | `finished_unit_component_assignments` |
| **Replacement history** | The log of old→new part swaps on a unit | `finished_unit_component_replacements` |
| **Serial** | A unique barcode/number of one physical part or unit | `product_serial_numbers` |
| **Consumable** BOM | Parts are assigned step-by-step after manufacture (e.g. installs where parts get used up) | `products.is_consumable = 1` |
| **Non-consumable** BOM | Parts are treated as permanently part of the unit from manufacture (e.g. a fixed kit) | `products.is_consumable = 0` |
| **Serialized** component | Part tracked by unique serial numbers | `bom_product_components.is_serialized = 1` |
| **Non-serialized** component | Part tracked only by quantity (no individual serials) | `is_serialized = 0` |
| **"Other" component** | A part that is **not a product** in the system — a manual / free-text item | `finished_unit_components.is_other = 1`, `component_product_id = NULL` |
| **Stock** | How much of a part/product is available in the warehouse | `products.initial_stock`, `stock_on_hand`, `available_stock` |
| **Movement** | An audit log of every item that moved in/out of a location | `serial_number_movements` |
| **Quarantine** | The holding location for faulty items | a movement destination `to_location` |
| **Adjustment** | A manual correction to a product's stock after production | `product_adjustments` / `product_adjustment_line_items` |
| **Mark Faulty** | Flag a unit (and/or its parts) as broken | sets `product_serial_numbers.status = 4` |
| **Rollback** | Undo the last replacement (or reset a part to its start state) | rewrites assignments + writes history |
| **Remove** | Take a part out of a finished unit's composition (Faulty or Roll Back) | `removeComponentSerial` |
| **Lockdown** | Faulty units cannot be edited (Replace/Assign/Remove disabled) until repaired | UI guard `!isUnitFaulty` |

---
## 3. Core Concepts — Plain + Technical

### 3.1 Consumable vs Non-Consumable BOM products

> **Why it matters:** this is the single biggest split in the product. It decides whether parts are assigned step-by-step later, or are assumed to already be part of the unit when it is manufactured.

**Consumable (plain):** When you manufacture the unit, the parts are *not yet chosen*. Later you "assign" real parts one by one until the unit is complete. Components start as **Pending** with `assigned_qty = 0` (0 of N assigned).

**Non-consumable (plain):** When you manufacture the unit, the parts are *already considered part of it*. There is **no Assign step**; components are created pre-assigned (`Assigned`, `assigned_qty = required_qty`). The only per-component action is **Replace**.

| Aspect | Consumable | Non-consumable |
|---|---|---|
| Components start as | Pending, `assigned_qty 0` | Assigned, `assigned_qty = required_qty` |
| Assign step | ✅ shown | ❌ hidden |
| Replace step | ✅ | ✅ (only action) |
| Manufacturing batch status | completed when all assigned | completed immediately |
| Rollback non-serialized stock | product stock restored | ❌ no product stock change |

### 3.2 Serialized vs Non-Serialized components

> **Why it matters:** a serialized part is tracked by its unique barcode and can "move" between states (in stock → on unit → faulty). A non-serialized part is just a running quantity.

| Aspect | Serialized | Non-serialized |
|---|---|---|
| Tracked by | unique serial numbers | quantity only |
| Assignment uses | `assigned_serial_id` / `serial_number` | `assigned_qty` |
| On removal | serial restored to **In Stock** (or marked Faulty) | quantity restored to product stock |
| Example | Camera SN 255 | 2 metres of cable |

### 3.3 Real product vs "Other" component

> **Why it matters:** a real product is something tracked in your product database (so stock can be deducted/restored), while an "Other" component is a free-text part with **no product and no stock** behind it.

| Aspect | Real product component | "Other" component |
|---|---|---|
| In `products` table | yes | no |
| `is_other` | 0 | 1 |
| `component_product_id` | set | **NULL** |
| Has a name/code | from product | manual `component_name` / `component_code` |
| Stock deduction / restoration | ✅ yes | ❌ none (nothing to adjust) |

### 3.4 The two status systems (important)

There are **two separate statuses** to understand, and they are **not** the same:

**A) Serial status** — the state of a physical item (`product_serial_numbers.status`).

| Code | Meaning |
|---|---|
| 1 | In Stock |
| 2 | Rented |
| 3 | Out of Stock |
| 4 | Faulty |
| 5 | Damaged |
| 6 | Scrapped |
| 7 | Pending |

**B) Component status** — the state of a part *inside a finished unit* (`finished_unit_components.status`).

| Code | Meaning |
|---|---|
| 1 | Assigned (fully assigned, `assigned_qty >= required_qty`) |
| 2 | Pending (not fully assigned) |
| 3 | Installed |
| 4 | Faulty |
| 5 | Removed |

> ⚠️ **Critical naming trap for developers:** the `finished_unit_components.status` column uses the **`BomProductComponent::STATUS_*`** constants (ASSIGNED=1, PENDING=2, FAULTY=4, REMOVED=5). The `FinishedUnitComponent::STATUS_*` class has the **reversed** values and must **not** be used for this column (see Part 8.2).

### 3.5 Global recipe vs per-unit state

- **Global recipe** (`bom_product_components`): one list of parts shared by all units of a product. It is the *template*.
- **Per-unit state** (`finished_unit_components`): each finished unit keeps its **own copy** of every component's current status and assigned quantity, so two units of the same product can be in different states at the same time.

Example:

```
Finished Unit 421:   Camera -> Assigned,  DVR -> Pending,   Other -> Pending
Finished Unit 422:   Camera -> Pending,   DVR -> Pending,   Other -> Pending
```

When the API returns a unit's composition, it merges the *global recipe* and overrides only `status`, `assigned_qty`, and `remarks` with the per-unit values.

---
## 4. The Big Picture — Lifecycle at a Glance

```
Create BOM product            products (product_type = 'bom_product')
   ↓
Define the recipe             bom_product_components  (the global template)
   ↓
Manufacture a batch           bom_product_manufacturing_batches
   ↓                          product_serial_numbers      (finished units)
                              finished_unit_components    (per-unit component rows)
   ↓
Assign components (per unit)  finished_unit_component_assignments
        │                     finished_unit_components.assigned_qty / status
        │                     serial_number_movements (outbound from stock)
        │
        ├─ Replace part       finished_unit_component_replacements (history) + stock
        ├─ Mark unit faulty   product_serial_numbers.status = 4, components, replacements, movements
        ├─ Rollback part      restore previous component / reset to start
        └─ Remove part        remove a component (Faulty or Roll Back)
   ↓
Finished unit detail / audits (composition, replacements, movements)
   ↓
Stock adjustments (post-production corrections)
```

---

## 5. The Lifecycle — Step-by-Step (Plain-English Walkthrough)

### 5.1 Create a BOM product
You create a new assembled item (e.g. "Security Camera Kit"). This creates the product header — name, barcode, category, price, and whether it is consumable or not.

### 5.2 Define the recipe (the composition)
You list every part and how many of each are needed to build one unit. For each part you decide:
- Is it a **real product** in your system, or an **"Other"** manual part?
- Is it **serialized** (tracked by barcode) or **non-serialized** (just a quantity)?
- How many are required per unit (e.g. 2 cameras)?
- Is it mandatory?

This recipe is the **global template** — all future units of this product start from it.

### 5.3 Manufacture a batch
You say "make 5 Security Camera Kits". The system:
1. Creates one manufacturing batch.
2. Creates 5 finished units (each a unique serial).
3. Copies the recipe into each unit as its own component rows.

For a **consumable** product the parts start unassigned (Pending, 0/N). For a **non-consumable** product the parts are treated as already installed (Assigned).

### 5.4 Assign components (consumable only)
For each component you pick the actual part(s): either select existing serials from stock, or type manual serials. The system:
- Links that serial/qty to the finished unit.
- Deducts the component's stock.
- Marks the component **Assigned** once it has all required parts (N of N).
- When everything is assigned, the unit is set **In Stock** and the batch completes.

### 5.5 Replace a component
When a part goes bad, you replace it with another. The system:
- Takes the old part off the unit (restores its serial to stock / adjusts stock).
- Puts the new part on the unit.
- Records the swap in **replacement history** (old → new, reason, warranty).

### 5.6 Mark a unit faulty / rollback components
If the whole finished unit is broken, you mark it **Faulty**. Optionally you can also:
- **Mark parts faulty** (send them to Quarantine), and/or
- **Roll back** parts — undo the last replacement (restoring the previous part) or reset a part to its starting state.

While a unit is Faulty, it is **locked down** — you cannot Assign, Replace, or Remove parts until the unit is repaired and its status is set back to In Stock.

### 5.7 Remove a component
On a component row you can choose **Remove** → **Faulty** or **Roll Back**. This is the same underlying idea as above but done component-by-component from the composition screen.

### 5.8 Stock adjustments (post-production)
If production changed stock in a way that needs a manual correction, you create an **adjustment** (a header + line items) that records the quantity change and reason. Every movement is also audited in `serial_number_movements`.

---
## 6. The Four Component Types

Every component on a BOM is a combination of two yes/no choices, giving **four** possible types. Every rule in this system is stated for these four types, so it helps to memorise the grid.

| # | Real product or "Other"? | Serialized? | Tracks… | Stock behind it? | Example |
|---|---|---|---|---|---|
| 1 | Real product | Serialized | unique serials | yes | Camera SN 255 |
| 2 | Real product | Non-serialized | quantity | yes | 2m cable |
| 3 | "Other" | Serialized | manual serial text | no | Custom bracket SN |
| 4 | "Other" | Non-serialized | quantity | no | "Labour" x 1 |

### What each type does on a key action (for the non-technical reader)

**Marking the part faulty:**
- Types 1 & 2 (real products): the part is flagged faulty and sent to Quarantine.
- Types 3 & 4 ("Other"): nothing is tracked as faulty in stock (there is no product). The unit is still marked faulty.

**Replacing the part:**
- Types 1 & 3 (serialized): you swap one serial for another; the old serial comes off, the new serial goes on.
- Types 2 & 4 (non-serialized): you change the quantity assigned from that product/other-part.

**Rolling back the part:**
- Type 1: restore the old serial from history and put the current serial back to stock.
- Type 2: restore the previous quantity; in a non-consumable BOM this does **not** touch product stock.
- Type 3: restore the previous manual serial from history.
- Type 4: restore the previous quantity (no stock involved).

---

## 7. Actions Reference (For Everyone)

### 7.1 Assign (consumable only)
**Shown for:** components that are not yet fully assigned, on consumable products.
**Effect:** links chosen serials/quantities to the unit, deducts component stock, advances the component status to Assigned when complete.

### 7.2 Replace
**Shown for:** any component that is already assigned.
**Effect:** removes old part(s), adds new part(s), adjusts stock, and writes a **replacement-history** row (old → new, reason, warranty).

### 7.3 Mark Faulty (unit-level)
**Shown for:** a finished unit.
**Effect:** sets the unit (and chosen components/serials) to Faulty, moves them Outbound to Quarantine. Faulty units are locked down until repaired.

### 7.4 Rollback (unit-level, in the Mark Faulty flow)
**Shown for:** components inside the Mark Faulty dialog.
**Effect:** undoes the latest replacement (restores the previous component) for that component, or resets it to its starting phase if it has no replacement history.

### 7.5 Remove → Faulty / Remove → Roll Back (component-wise)
**Shown for:** a single component row, via the **Remove** action.
**Effect:**
- **Faulty:** mark that component's assigned serials as Faulty (moved to Quarantine). Does **not** remove the component from the composition.
- **Roll Back:** undo the component's latest replacement and restore the previous part (only shown when the component has replacement history).
- Remove is **hidden/disabled** when the finished unit itself is Faulty.

| Dialog option | Availability | What it really does |
|---|---|---|
| Faulty | Always (if component not Pending) | Marks serials faulty, no stock change |
| Roll Back | Only if `has_replacement` | Restores previous part / resets component |

> ⚠️ **Note on older behaviour:** the original `bom-flow.md` showed `mark_faulty` setting the component status to Faulty (4). The newer requirement docs clarify that **`mark_faulty` should leave the component status UNCHANGED (stays Assigned)** and only the serials go faulty. **This guide follows the newer requirement.**

---
## 8. Technical Deep-Dive

> This section is for developers. It covers the data model, the status-constant convention, the API surface, backend flow internals, the frontend flow, and the tricky null-handling / matching rules.

### 8.1 Database tables

| Table | Purpose | Key columns |
|---|---|---|
| `products` | Master product list. BOM products have `product_type = 'bom_product'`. | id, name, barcode, product_type, is_consumable, initial/available/stock_on_hand |
| `product_serial_numbers` | Serial numbers. Stores **finished units** (`product_type = 'bom_product'`) and component serials. | id, text, product, product_type, status, batch, activated, bond_type, inbond/outbond fields, status_reason, remarks |
| `bom_product_components` | The BOM **definition** (recipe), global & shared. | id, product_id, component_product_id, component_name, component_code, qty, is_mandatory, is_serialized, is_other, is_consumable, sort_order, status |
| `bom_product_manufacturing_batches` | A manufacturing run producing N finished units. | id, product_id, status, qty, completed_qty, ... |
| `finished_unit_components` | **Per-unit** component state (overrides the global recipe). | id, parent_serial_id, bom_product_id, bom_component_id, is_other, component_product_id, component_name, component_code, required_qty, assigned_qty, status, warranty_*, remarks |
| `finished_unit_component_assignments` | **Which serial/quantity** was assigned to a component on a unit. | id, bom_product_id, parent_serial_id, bom_component_id, component_product_id, assigned_serial_id, serial_number, assigned_qty, is_serialized, warranty_*, status |
| `finished_unit_component_replacements` | History of replacements / rollbacks. | id, parent_serial_id, bom_product_id, bom_component_id, component_product_id, old/new_serial_*, reason, warranty_action, remarks, replaced_by, replaced_at |
| `serial_number_movements` | Audit trail of every stock movement. | id, product_type, module, module_id, serial_number_id, product_id, movement_type (Inbound/Outbound), bond_type, from_location, to_location, quantity, remarks, added_by |
| `product_adjustments` / `product_adjustment_line_items` | Stock adjustments (header + line items). | id, product, adjustment_type, qty, reason, status, ... |

### 8.2 Status constants — read this before writing code ⚠️

The **`finished_unit_components.status`** column uses **`BomProductComponent::STATUS_*`**:

```php
BomProductComponent::STATUS_ASSIGNED = 1
BomProductComponent::STATUS_PENDING  = 2
BomProductComponent::STATUS_FAULTY   = 4
BomProductComponent::STATUS_REMOVED  = 5
```

Do **NOT** use `FinishedUnitComponent::STATUS_*` for this column — that class holds **reversed** values and would write the wrong status. `bom_product_components.status` mirrors the same 1–5 scheme.

### 8.3 API endpoints (backend `BomProductController`)

| Method | Route | Purpose / handler |
|---|---|---|
| POST | `bom-product` | Create/update a BOM product (`updateOrCreate`) |
| PUT | `bom-product/{product}` | Update a BOM product |
| PUT | `bom-product/{product}/composition` | Update composition (`updateBomComposition`) |
| GET | `bom-product` | List BOM products (`getBomProducts`) |
| GET | `bom-product/{product}` | Get one BOM product (`getProduct`) |
| POST | `bom-product/manufacture` | Create a manufacturing batch (`createManufactureBatch`) |
| GET | `bom-product/{product}/components` | Get BOM components (`getBomComponents`) |
| GET | `bom-product/finished-unit/{unit}/composition` | Unit composition (`getFinishedUnitComposition`) |
| GET | `bom-product/finished-unit/{unit}/replacements` | Replacement history (`getFinishedUnitReplacements`) |
| GET | `bom-product/finished-unit/{unit}/movements` | Unit movements (`getFinishedUnitMovements`) |
| GET | `bom-product/{product}/stock-movements` | Product stock movements (`getStockMovements`) |
| POST | `bom-product/finished-unit/component/assign` | Assign a component serial (`assignComponentSerial`) |
| POST | `bom-product/finished-unit/component/replace` | Replace a component serial (`replaceComponentSerial`) |
| POST | `bom-product/finished-unit/component/remove` | Remove a component (`removeComponentSerial`) |
| POST | `bom-product/finished-unit/status` | Mark faulty / rollback (`updateFinishedUnitStatus`) |
| GET | `bom-product/finished-unit/{id}` | Finished unit detail (`getFinishedUnitDetail`) |
| GET | `bom-product/component/{product}/available-serials` | Available serials (`availableSerials`) |
| PATCH | `bom-product` | Update product statuses (`updateStatusProducts`) |
| POST | `bom-product/adjustment` | Stock adjustments (`createAdjustment`) |

---
### 8.4 Backend flow internals

**Manufacture (`createManufactureBatch`)** — for each requested quantity:
1. Create a batch row.
2. Create a finished unit in `product_serial_numbers` (`product_type = 'bom_product'`, `status = In Stock` or Pending for consumable).
3. Copy every BOM component into `finished_unit_components`:
   - consumable → `assigned_qty 0`, `status Pending`;
   - non-consumable → `assigned_qty = required_qty`, `status Assigned`.

**Assign (`assignComponentSerial`)** — only for consumable:
1. Validate `parent_serial_id`, `bom_component_id`, `component_product_id`; prevent over-assignment beyond `required_qty`.
2. Create `finished_unit_component_assignments` (real serial → `assigned_serial_id`; "Other" serial → `serial_number`; non-serialized → `assigned_qty`).
3. Update `finished_unit_components.assigned_qty/status` (→ Assigned when full).
4. Record Outbound serial movement (stock → finished unit).
5. When all components assigned, `autoCompleteFinishedUnit` may set unit In Stock + complete batch.

**Replace (`replaceComponentSerial`)**:
1. Locate old assignment (serial id / serial number / product id).
2. Create new assignment(s), delete old.
3. Adjust stock (deduct new, restore old).
4. Insert `finished_unit_component_replacements` history (old/new serial, reason, warranty).
5. Set component status; move serials Inbound/Outbound.

**Mark Faulty / Rollback (`updateFinishedUnitStatus`)** — payload:
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
`components[].action` is `mark_faulty` | `rollback`.

Per unit:
1. Validate `unit_ids`, `status` (1–6), `reason`, `components[].action`.
2. Load units where `product_type = 'bom_product'`.
3. Set `product_serial_numbers.status = 4`; if Faulty store `status_reason` + `remarks`.
4. Record 2 unit-level serial movements (Outbound, Main Warehouse → Finished Unit).
5. For each component action:
   - **`mark_faulty`** → `markComponentFaulty()`:
     - serial → `status = 4` (Faulty);
     - `finished_unit_components.status` → **unchanged** (new requirement);
     - Outbound movement to **Quarantine**; no stock change.
   - **`rollback`** → `rollbackComponent()` dispatches by identifier:
     - real serialized → `rollbackSerializedComponent()`: restore serial **In Stock**, delete assignment, decrement qty, mark component, restore product stock, Inbound movement;
     - "Other" serialized → `rollbackOtherSerializedComponent()`: delete assignment, decrement qty, mark component, Inbound;
     - real non-serialized → `rollbackNonSerializedComponent()`: mark Removed, restore stock, Inbound;
     - "Other" non-serialized → `rollbackOtherNonSerializedComponent()`: mark Removed, Inbound.
6. Each rollback writes a `finished_unit_component_replacements` history row (reason = "Rollback", warranty_action = "continue").
7. Wrap in a DB transaction.

**Rollback is history-aware** (new requirement):
- If the component **has** replacement history → roll back the replacement: restore the old/previous value, remove the current/new value.
- If **no** history → reset to initial phase: `status = Pending`, `assigned_qty = 0` (0 of N).
- Non-serialized components always reset to initial phase on rollback (history is ignored for them); only **serialized** components use the history-aware restore.

**Key backend helpers** (in `BomProductController`):

| Method | Role |
|---|---|
| `markComponentFaulty` | Mark a component + its serial faulty |
| `rollbackComponent` | Dispatcher → picks the right rollback strategy |
| `rollbackSerializedComponent` | Restore real serial to stock, remove from unit |
| `rollbackOtherSerializedComponent` | Remove manual-serial component |
| `rollbackNonSerializedComponent` | Restore a real product's qty |
| `rollbackOtherNonSerializedComponent` | Remove an "Other" quantity component |
| `findFinishedUnitAssignment` | Locate assignment by serial id/serial no/product/bom id |
| `insertSerialMovement` | Shared movement audit writer |
| `recordComponentReplacement` | Shared replacement-history writer |
| `restoreComponentProductStock` / `deductComponentProductStock` | Stock adjustments |
| `updateFinishedUnitComponentRow` / `decrementFinishedUnitComponentQty` | Update the per-unit component row |
| `recalcFinishedUnitComponentRow` / `getComponentAssignedQty` | Recalculate status from actual assignments |

**Remove component (`removeComponentSerial`)** — the Remove dialog → **Faulty** or **Roll Back** (component-wise):
- **Faulty:** mark all assigned serials of the component Faulty (`status = 4`), move Outbound → Quarantine, write a Faulty history entry. Component status stays Assigned; assignments stay; no product stock change.
- **Roll Back:** use the latest replacement history to remove the current serial(s) and restore the previous component; recalculate the component row; write Inbound/Outbound movements + a rollback history entry.

---
### 8.5 Frontend flow

| File | Role |
|---|---|
| `bom-product.vue` | List of BOM products |
| `create-bom-product.vue` | Create/edit a BOM product + composition |
| `detail-bom-product.vue` | BOM product detail with tabs |
| `detail-finished-unit.vue` | Finished unit detail (tabs: Serials, Replacements, Movements, History) |
| `detail/Finished-Units.vue` | List of finished units; "Mark Faulty" entry |
| `detail/Manufacturing-Batches.vue` | Manufacturing batch list |
| `detail/Bom-Composition.vue` | Composition (recipe) table |
| `detail/Serials.vue` | **Composition table per finished unit** — Replace/Assign/Remove actions |
| `detail/Serials-Composition.vue` | Faulty dialog component; collects per-component actions |
| `detail/Replacements.vue` / `detail/Movements.vue` | History tabs |
| `detail/Stock-Movement.vue` | Stock movements view |
| `components/ManufactureDialog.vue` | Trigger manufacturing batch |
| `components/MarkFaultyDialog.vue` | "Mark Finished Unit as Faulty" dialog |
| `components/AssignComponentSerialDialog.vue` | Assign serial dialog |
| `components/ManageBomCompositionDialog.vue` | Manage BOM composition |
| `components/OtherComponentDialog.vue` | Add "Other" (non-product) component |

**Modelling the Faulty flow in the UI:**
- `detail/Finished-Units.vue` → "Mark Faulty" button sets the selected unit and opens `MarkFaultyDialog`.
- `MarkFaultyDialog.vue` renders `Serials-Composition` (single unit), builds the `components[]` array via `collectActions()`, emits `confirm` with `{ unit, units, reason, remarks, returnComponents, components }`.
- `detail-finished-unit.vue` `confirmFaulty(data)` builds the final payload:
  ```js
  {
    unit_ids: data.units.length ? data.units.map(u => u.id) : [data.unit.id],
    status: 4,
    reason: data.reason,
    remarks: data.remarks,
    return_components: data.returnComponents,
    components: data.components || [],
  }
  ```
  then POSTs to `bom-product/finished-unit/status` and refreshes detail + movements.
- `Serials-Composition.vue`: `fetchComponents()` calls `bom-product/finished-unit/{unit}/composition`; each serial row carries `bom_component_id`, `component_product_id`, `assigned_serial_id`, `serial_number`, `assigned_qty`; `collectActions()` emits only rows that have an identifier and a chosen action.

**Non-consumable / Replace-only UI:**
- In `Serials.vue`, for non-consumable BOM products the component action menu shows **only Replace** (Assign hidden).
- In the Mark Faulty dialog (`Serials-Composition.vue`), only components that **actually have replacement history** are shown for rollback; serialized components without replacement history are hidden as rollback candidates.
- When the finished unit status is **Faulty (4)**, Replace/Assign/Remove are disabled via the `!isUnitFaulty` guard.

### 8.6 Matching strategy & NULL handling (important)

The `finished_unit_components` row is keyed by `parent_serial_id` + `bom_component_id` (and optionally `component_product_id`). In production, "Other" components can have a **NULL `bom_component_id`**.

- `updateFinishedUnitComponentRow()` / `decrementFinishedUnitComponentQty()` match by `bom_component_id` **and fall back to `component_product_id`** when available.
- `recordComponentReplacement()` resolves `bom_component_id` from the assignment → the payload → `$data`, and **skips the history insert with a `Log::warning`** if it cannot resolve a value (avoids a NOT NULL constraint error).
- The frontend `Serials-Composition.vue` always sends `bom_component_id`/`component_product_id` so the backend has an identifier.
- Assignment lookup priority in `findFinishedUnitAssignment`: serial id → serial number → product id → bom id.

### 8.7 Stock movements & adjustments

- `serial_number_movements` records every Inbound/Outbound movement for audit (used by the Movements tab and Stock-Movement view).
- Post-production corrections use `createAdjustment()` (header) + `createAdjustmentLineItems()` (per-item qty). `getStockMovements()`, `getReportAdjustment()`, `updateStatusAdjustments()` support read/update.
- `product_adjustments` holds the header; `product_adjustment_line_items` the per-item qty changes.

---
## 9. Worked Scenarios

### Scenario A — Mark faulty, serialized component (no rollback)
**Payload:** unit 201 faulty; component = serialized product, serial 160.
- Unit 201 → `status = 4`.
- Serial 160 → `status = 4` (Faulty).
- `finished_unit_components.status` → **stays Assigned** (new requirement).
- Movement: Outbound → Quarantine.

### Scenario B — Mark faulty, non-serialized component (qty 2)
**Payload:** unit 201 faulty; component = non-serialized product, `assigned_qty = 2`.
- Unit 201 → `status = 4`.
- History entry: **"2 qty marked faulty"** (reason = Faulty).
- `finished_unit_components.status` → **stays Assigned**.
- Movement: Outbound → Quarantine, qty 2.

### Scenario C — Rollback with replacement history (serialized)
A unit component has serials **A** and **C**, where **C** replaced an older serial **B** (history: old B → new C).

- **A (no history)** → removed from unit → A becomes **In Stock (1)**, `is_outbond = 0`; component `assigned_qty` decremented.
- **C (history: old B, new C)** → `restorePreviousComponent(C)`:
  1. C removed from unit → C becomes **In Stock (1)**, available.
  2. **B restored** onto unit → B becomes **Out of Stock (3)**, `is_outbond = 1`, `outbond_id = 218` (on unit), and a new assignment row is created for B.
  3. Component row recalculated from actual assignments (only B remains → `assigned_qty = 1`).

**Final state:**

| Serial | Inventory | On unit? |
|---|---|---|
| A | In Stock (1), available | no |
| C | In Stock (1), available | no |
| B | **Out of Stock (3), on unit** | **yes** |

The component is not fully assigned (1 of 2), so its status is **`Pending`**.

> **Rule:** `assigned_qty` is always **recalculated from the actual assignments** (`getComponentAssignedQty`) via `recalcFinishedUnitComponentRow` after every rollback. `required_qty` stays the static recipe value. `status` = **Assigned** when `assigned_qty >= required_qty`, else **Pending**.

### Scenario D — Rollback with no replacement history
- Serialized component → serial removed to In Stock; component → Pending, qty 0.
- Non-serialized component → qty reset to 0; component → Pending; product stock restored.

### Scenario E — Remove → Faulty (component-wise)
Component A has serials 1, 2. User clicks Remove → Faulty.
- Serials 1, 2 → `status = 4` (Faulty).
- Component A status **stays Assigned** (not removed).
- Assignments remain; Outbound → Quarantine; Faulty history written; no stock change.

### Scenario F — Remove → Roll Back (component-wise)
Same as Scenario C but driven from the Remove dialog. Only available when the component has replacement history. Restores the previous serial/qty and recalculates the row.

### Scenario G — Non-consumable BOM
- Manufacturing creates finished units with components pre-assigned (`Assigned`, `assigned_qty = required_qty`); batch completes immediately.
- Component action menu shows **only Replace** (no Assign).
- Mark Faulty dialog shows only components that have replacement history.
- Rolling back a **non-serialized** component does **NOT** reduce the component product's stock (parts are part of the fixed kit).

---

## 10. Confirmed Decisions / Q&A Log

These are the agreed answers to questions raised during design. They are the source of truth for behaviour.

- **Q-A (Faulty — both serials):** Faulty marks **all** assigned serials of the component as Faulty, but does **NOT** remove them from the composition.
- **Q-B (Faulty — component status):** Faulty does **NOT** remove the component. Only its assigned serials go Faulty; `finished_unit_components.status` **stays Assigned** (unchanged).
- **Q-C (Roll Back scope):** Roll Back applies to the **whole component** based on its replacement history (not per-serial).
- **Q-D (Remove on Faulty unit):** The Remove action is **hidden/disabled** when the finished unit status is **Faulty**.
- **Q-E (Non-serialized stock on Faulty):** Unchanged — Faulty does not change the non-serialized component product's stock.
- **Q-A (non-consumable rollback):** Do **NOT** reset the component to Pending / assigned_qty 0 on rollback; the component stays as-is until it is **replaced** with another serial.
- **Q-B (non-consumable dialog):** Hide serialized components **without** replacement history as rollback candidates in the Mark Faulty dialog.
- Non-serialized components ignore replacement history on rollback — they always reset to their initial phase (Pending, qty 0) and restore product stock.

---
## 11. Troubleshooting / Common Pitfalls

| Symptom | Likely cause | Fix / check |
|---|---|---|
| `finished_unit_components` status not updating | Row keyed by NULL `bom_component_id` | Use `component_product_id` fallback (handled) |
| `finished_unit_component_replacements` NOT NULL violation on `bom_component_id` | No assignment + no payload `bom_component_id` | Payload must send `bom_component_id`; helper skips with `Log::warning` |
| Serial not restored to stock on rollback | Wrong/no assignment match | `findFinishedUnitAssignment` priority: serial id → serial number → product id → bom id |
| Faulty unit still allows edits | Frontend not passing unit status | `Serials.vue` uses `finished-unit-status` prop + `isUnitFaulty` guard |
| Phantom movements (qty 1) for empty components | Frontend sent all-null component rows | `collectActions()` skips rows with no identifier |
| Wrong status written to `finished_unit_components` | Using `FinishedUnitComponent::STATUS_*` (reversed) | Use `BomProductComponent::STATUS_*` (ASSIGNED=1, PENDING=2, FAULTY=4, REMOVED=5) |

---

## 12. Quick-Reference Cheat Sheet

**The 4 component types + rollback result:**

| Component type | Has replacement history? | Rollback result |
|---|---|---|
| Serialized product | Yes | New serial → In Stock; previous serial → Out of Stock (on unit); component recalc (Assigned if full, else Pending) |
| Serialized product | No | Serial → In Stock; component → Pending, qty 0 |
| Serialized "Other" | Yes | New serial removed; previous serial restored; component recalc |
| Serialized "Other" | No | Serial removed; component → Pending, qty 0 |
| Non-serialized product | Yes* | qty → 0; component → **Pending**; product stock restored; history maintained |
| Non-serialized product | No | qty → 0; component → **Pending**; product stock restored |
| Non-serialized "Other" | Yes* | qty → 0; component → **Pending** |
| Non-serialized "Other" | No | qty → 0; component → **Pending** |

> **\*** Non-serialized components ignore replacement history — rollback always resets them to their initial phase.

**mark_faulty vs rollback (component status):**

| Action | `finished_unit_components.status` | Assignments | Serial state | Stock |
|---|---|---|---|---|
| `mark_faulty` | **unchanged** (stays Assigned) | kept | serial → Faulty (4) | no change |
| `rollback` (no history) | Pending | reset | serial → In Stock | restored |
| `rollback` (with history) | recalc (Assigned/Pending) | restored previous | new → In Stock, old → on unit | adjusted |

**Non-consumable behaviour grid:**

| Component type | Assign | Replace | Mark Faulty dialog shows | Rollback stock effect |
|---|---|---|---|---|
| Serialized product | ❌ | ✅ | ✅ (if has replacement history) | serial → In Stock / on unit |
| Non-serialized product | ❌ | ✅ | ✅ (if has replacement history) | **no product stock change** |
| Serialized "Other" | ❌ | ✅ | ✅ (if has replacement history) | serial removed / restored |
| Non-serialized "Other" | ❌ | ✅ | ✅ (if has replacement history) | **no stock change** |

---

## 13. Known Drawbacks / Weaknesses of the Current Flow

This section is written for both audiences. Business users can skip the code-columns; the "Impact" column explains the real-world risk in plain words.

### 13.1 Product-design / behaviour weaknesses

| # | Weakness | Impact (plain) | Technical detail |
|---|---|---|---|
| D1 | **Two separate status systems** (serial vs component) can drift apart. | A component can say "Assigned" while its serial is "Faulty" — confusing to users reading reports. | `product_serial_numbers.status` and `finished_unit_components.status` are maintained separately; `mark_faulty` intentionally leaves the component Assigned. |
| D2 | **Non-serialized rollback ignores history.** | You cannot recover a previous quantity/component for a quantity-based part — it always snaps back to 0 / Pending. | Rollback always resets non-serialized components to initial phase; the history-aware restore applies only to serialized components. |
| D3 | **Non-consumable rollback never touches component stock.** | Inventory says the part is "back on the unit" but product stock is unchanged — stock can look inconsistent with reality. | Rollback of non-serialized components in non-consumable context performs no stock change (documented open question Q-A). |
| D4 | **Faulty-lockdown is a UI-only guard.** | A savvy user / direct API call can still edit a faulty unit because the backend may not enforce it. | Replace/Assign/Remove are disabled via the `!isUnitFaulty` frontend guard; no explicit backend state machine validates transitions. |
| D5 | **Only the latest replacement is restorable.** | Multiple swaps over time cannot be walked back step-by-step. | Rollback reads the latest history row per component; older/longer replacement chains aren't traversable. |
| D6 | **Assign vs required (0 of N) ambiguity for non-serialized parts.** | Quantity-based parts can show "Assigned" while their product stock was never deducted, making totals hard to trust. | Non-serialized `assigned_qty` is a stored count, not derived from a single authoritative source across all flows. |
| D7 | **Faulty component stays "Assigned".** | A row that is both Assigned and composed of faulty serials reads as contradictory. | Per Q-B, `mark_faulty` keeps component status Assigned while serials go Faulty. |
| D8 | **No batch/unit-level undo of manufacturing.** | A wrong manufacturing run cannot be reverted cleanly — must be handled part-by-part. | Manufacturing rollback is listed as a "pending improvement", not yet built. |

### 13.2 Data-integrity / technical weaknesses

| # | Weakness | Impact (plain) | Technical detail |
|---|---|---|---|
| T1 | **NULL `bom_component_id` on "Other" rows.** | Rows can be hard to identify reliably; matching falls back to `component_product_id`, which is unreliable when the same product is used as several components. | Matching helper falls back to `component_product_id`; replacement history insert is skipped with a `Log::warning` when the id can't be resolved. |
| T2 | **Reversed status constants risk.** | A developer using the wrong constant silently writes the wrong status (no error, just wrong data). | `FinishedUnitComponent::STATUS_*` has reversed values vs `BomProductComponent::STATUS_*` used by the column. |
| T3 | **Fragile assignment matching by fallback.** | Wrong serial could be restored/removed if identifiers look similar. | Lookup priority: serial id → serial number → product id → bom id; no guaranteed uniqueness on manual serial numbers. |
| T4 | **No explicit concurrency control.** | Two users editing the same unit at once can overwrite each other (race conditions / lost updates). | Updates rely on last-write-wins; no optimistic locking / `updated_at` guard documented. |
| T5 | **Manual serials lack uniqueness validation.** | Duplicate manual serials can be created. | Manual serials are just free-text rows in `product_serial_numbers`; no uniqueness rule mentioned. |
| T6 | **Potential phantom movements.** | Spurious qty-1 movement records can appear for empty component rows. | Mitigated only by the frontend `collectActions()` skipping rows with no identifier. |
| T7 | **Stock could drift from serial truth.** | Serial state (In Stock) and product stock (`available_stock`) may disagree after many rollbacks. | No reconciliation job / report documented to re-sync serial states with product stock counts. |
| T8 | **History is keyed per-serial only.** | Grouped/whole-component actions are treated independently when reading history. | History lookup is per-serial (`new_serial_id`), so a component-whole rollback is reconstructed from separate per-serial records. |
| T9 | **No end-to-end audit beyond movements/replacements.** | Hard to answer "who did what and why" at a glance. | Audit logs are in the pending-improvements list of `summary.md`, not yet implemented. |
| T10 | **No automated test coverage matrix stated.** | Regressions in the 4-types × actions matrix are easy to miss. | The four-document set does not reference an automated test matrix for these flows. |

---
## 14. Areas for Improvement / Future Roadmap

Organised by priority. Each item states why it matters and roughly what to do. Items marked ✔ are already listed as "pending improvements" in `summary.md`.

### 14.1 High priority (correctness & trust)

| # | Improvement | Why it matters | Suggested approach |
|---|---|---|---|
| I1 | **Backend-enforced faulty lockdown** (addresses D4). | UI guards aren't enough; direct API calls could bypass them. | Add a status-state-machine in `BomProductController` that rejects Assign/Replace/Remove when the unit status is Faulty. |
| I2 | **Reconcile serial states with product stock** (addresses T7). | Trustworthy inventory totals after many rollbacks. | A scheduled job/report comparing serial "In Stock" count vs `products.available_stock`, with a fix action. |
| I3 | **Full replacement-chain support** (addresses D5). | Be able to step back through multiple swaps, not just the last one. | Store a snapshot of the component's full state per replacement; allow rollback to any historical point. |
| I4 | **History-aware non-serialized rollback** (addresses D2). | Recover a previous quantity instead of always resetting to 0. | Record previous quantity in replacement history and restore it on rollback. |
| I5 | **Make non-consumable rollback stock behaviour explicit** (addresses D3). | Remove the ambiguity in Q-A. | Decide and enforce whether product stock changes; update docs + tests accordingly. |
| I6 | **Uniqueness validation for manual serials** (addresses T5). | Prevent duplicate manual barcodes. | Unique-index on serial text (or app-level check before insert). |

### 14.2 Medium priority (robustness)

| # | Improvement | Why it matters | Suggested approach |
|---|---|---|---|
| I7 | **Concurrency / optimistic locking** (addresses T4). | Avoid lost updates on busy finished units. | Check `updated_at` or add a version column before each write. |
| I8 | **Backfill NULL `bom_component_id`** (addresses T1). | Make matching reliable and remove the `Log::warning` skip path. | Data migration to populate `bom_component_id` for "Other" rows; then tighten matching. |
| I9 | **DB constraints & indexes** | Prevent invalid rows and speed up the composition/replacements/movements reads. | Foreign keys + composite indexes on `parent_serial_id`, `bom_component_id`, `component_product_id`. |
| I10 | **Idempotency keys on POST actions** | Double-submits could double-deduct stock. | Accept a client idempotency key on assign/replace/status endpoints. |
| I11 | **Automated test matrix** (addresses T10). | Lock in the 4-types × actions behaviour. | Add feature tests covering the tables in Part 12 (mark_faulty / rollback / remove / non-consumable). |

### 14.3 Nice-to-have / longer term

| # | Improvement | Why it matters | Suggested approach |
|---|---|---|---|
| I12 | **Manufacturing rollback** (✔, addresses D8). | Undo a whole bad batch cleanly. | Reverse `createManufactureBatch` for a batch: remove units, restore stock, archive batch. |
| I13 | **End-to-end audit log / timeline** (✔, addresses T9). | Answer "who did what, when, why". | Add an audit table or enrich `serial_number_movements` with user + action + before/after. |
| I14 | **Warranty tracking** (✔). | Track warranty per component & per consumer. | Extend warranty fields on assignments/replacements and surface them in the UI. |
| I15 | **BOM versioning & impact analysis** | Changing a recipe today shouldn't silently alter existing in-flight units. | Keep versions of `bom_product_components`; show impact of a recipe change on open units. |
| I16 | **Observed rationale of D1/D7 (single status source of truth)** | Simplify the mental model. | Derive component status from its assignments + serials automatically instead of storing it separately. |
| I17 | **Better UI clarity** | Reduce confusion around Assigned-but-Faulty and 0 of N. | Progressive disclosure, warranty badges, inline movement timeline on the composition screen. |

> **Note:** All bullet points here are **suggested improvements**, not implemented features. They complement the "Pending Improvements" list already noted in `summary.md` (Replace API, Remove API, rollback stock on replacement, warranty tracking, component history timeline, audit logs, manufacturing rollback), and the open questions Q-A / Q-B from the requirement documents.

---

*End of guide. For the raw source details, refer to the four documents listed at the top of Part 0.*