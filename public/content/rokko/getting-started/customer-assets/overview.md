# Customer Assets — Overview (Plain English)

> **Backend:** `EquipmentController`, `EquipmentComponentController`, `FinishedUnitComponentService`
> **Frontend:** `frontend/src/view/pages/equipment-client/` + `frontend/src/view/pages/new-equipment-client/`
> **Shared BOM UI:** `frontend/src/view/pages/bom-product/`

---

## 1. What is a Customer Asset?

Think of a **Customer Asset** as a *machine that lives at a customer's building* and that your
company manages, maintains or services. In the Rokko screens it is called a "Customer Asset",
and in the codebase / menu it is also referred to as **Client Equipment**.

**Examples**

- An elevator in an office tower
- A dicing saw inside a semiconductor factory
- An X-ray / MRI machine in a hospital
- A CCTV monitoring kit at a warehouse

Each asset has a **barcode** (e.g. `CA-100001`) — its "number plate" inside Rokko — plus details
such as the customer, the site/property where it sits, brand, model, serial number and warranty.

## 2. The one key idea: a parts list ("composition")

A customer asset is a **machine built from parts**. Rokko stores that parts list for the asset,
and each row of the list is called a **composition line** (also called a *component*).

| Plain English | Rokko term | What it means |
|---|---|---|
| Parts list / recipe of the machine | **Composition** | The list of components attached to the asset |
| One row of the parts list | **Composition line** | e.g. "Motor ×1" or "Vision Camera ×2" |
| The part itself | **Component product** | The master product record (from `products`) |
| A "write-in" part | **Other component** | A part not in the product master — typed by name |
| Does the machine consume parts? | **Consumable / Non-consumable** | See §5 below |
| A part with a real serial number | **Serialized component** | e.g. a specific controller PCB `CTRL-0012` |
| A part counted by quantity only | **Non-serialized component** | e.g. 2 litres of oil |

## 3. What can users do with this module?

**Listing screen** (`Equipment.vue`)

- See all customer assets in a table with status filter (Pending / Active / Inactive / …).
- Bulk actions: mark active/pending/faulty/damaged/retired, export, import via Excel.
- Click the barcode / row to open the **Detail** page.

**Create / Edit screen** (`Create-Client-Equipment.vue`)

- Register the asset: customer, site, name, model, serial no., brand, warranty, delivery info.
- Fill machine-specific **specification** fields (electric requirements, options, axes, driver
  boards…) stored in `customer_equipment_config`.
- Build the **composition** (parts list) in the same visual editor used by BOM products.
- Set `is_consumable` — this single flag changes the whole component workflow (§5).

**Detail screen** (`Detail-Equipment.vue`) — tabs:

| Tab | Shows |
|---|---|
| Asset Composition | The parts list with live status of each part (Assigned / Pending / Removed…), warranty dates and **Assign / Replace / Remove** buttons |
| Replacements | History of every part swap on this asset |
| Movements | Stock ledger: which component serials left the warehouse into the asset, and what came back |
| Machine Specifications | The `customer_equipment_config` fields |
| Preventive Maintenance, Visits, Warranties, Jobs, Quotations, Invoices, History, Documents | Standard Rokko tabs for the asset |

## 4. Lifecycle in one sentence

> **Register the asset → give it a parts list → assign parts (only for consumable assets) →
> replace faulty parts when servicing → remove parts when they leave → watch the Movements
> ledger and the asset's auto-derived status.**

## 5. Consumable vs Non-consumable — the rule that drives everything

This flag on the equipment row (`is_consumable`) decides how composition lines behave:

| | Non-consumable asset (`is_consumable = 0`) | Consumable asset (`is_consumable = 1`) |
|---|---|---|
| At creation | Every composition line is **pre-assigned** (status = Assigned, assigned_qty = required_qty) | Lines stay **Pending**, nothing is assigned yet |
| Assign button | Hidden — the machine "came with" its parts | Shown, so parts can be added over time (e.g. toner, oil, consumables) |
| Main actions | Replace / Remove | Assign / Replace / Remove |
| Asset status | Active once it has a parts list | Active only after all **mandatory** parts have been assigned (or no mandatory lines exist) |

## 6. Part statuses you will see

| Status | Meaning |
|---|---|
| **Assigned** | The part slot is filled (a serial or quantity is attached) |
| **Pending** | The part slot is empty / waiting for assignment |
| **Installed** | (Reserved for visit installation tracking) |
| **Faulty** | The part has been marked faulty (goes to Quarantine when removed) |
| **Removed** | The part has been taken off the asset |

## 7. Who uses it

- **Admin / Service desk** — registers assets and keeps part lists and warranties up to date.
- **Service technicians** — on a site visit, replace faulty parts and record what was fitted.
- **Warehouse / inventory team** — sees component stock leave and return on the Movements tab.
- **Management / billing** — uses asset records for warranty claims and preventive maintenance.

---

> **Next:** [End-to-End Flow](/rokko/getting-started/customer-assets/flow) — the walkthrough
> of every step with the technical details under each one.
