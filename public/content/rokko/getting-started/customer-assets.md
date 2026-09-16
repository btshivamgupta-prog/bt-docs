# Customer Assets (Client Equipment) — Module

> **Module:** Customer Assets / Client Equipment
> **Screen name in Rokko UI:** *Customer Asset* menu (`client-equipment`)
> **Rokko codebase:** Laravel 8 backend + Vue 2 frontend (`D:\shivam-rokko`)

---

## What is this module?

A **Customer Asset** (also called **Client Equipment**) is a piece of equipment that belongs to
a **customer** and is installed / used at the customer's site. Examples: an elevator, an X-ray
machine, a dicing saw, an HVAC unit, a CCTV kit.

Rokko tracks more than just a serial number for these assets. For every customer asset it keeps a
**parts list (composition)** — e.g. "Controller PCB ×1, Motor ×1, Vision Camera ×2" — and lets
service teams:

- ✅ Define the composition (the machine's "parts list / recipe")
- ✅ **Assign** specific serial numbers or quantities to each part slot
- ✅ **Replace** a part (warranty swap, upgrade, faulty part)
- ✅ **Remove** a part (returned good → back to stock, or faulty → quarantine)
- ✅ Track every **movement** (which warehouse stock left / came back)
- ✅ Track **warranty** per component (continue / reset / none)

## The most important fact: it reuses the identical BOM flow

This module does **not** write its own component engine. It reuses the exact same tables,
controllers, services and Vue components built for the **BOM (Bill of Materials) / Finished Unit**
module, switching context from `bom` to `customer_asset`. Everything documented on the
[BOM Flow](/rokko/getting-started/bom-product/overview/bom-flow) page applies here too —
with a few customer-asset-specific differences. See
[Identical BOM Flow](/rokko/getting-started/customer-assets/identical-bom-flow).

## Everything you need is in these pages

| Page | What it explains | Best for |
|---|---|---|
| [Overview](/rokko/getting-started/customer-assets/overview) | The module in plain English + key terminology | Business users, new starters |
| [End-to-End Flow](/rokko/getting-started/customer-assets/flow) | Step-by-step lifecycle from creating the asset to removing parts | Everyone |
| [Identical BOM Flow](/rokko/getting-started/customer-assets/identical-bom-flow) | How this module reuses the BOM engine and where it differs | Developers, architects |
| [Backend Architecture](/rokko/getting-started/customer-assets/backend-architecture) | Controllers, services, traits, request → DB flow | Developers |
| [Database Tables](/rokko/getting-started/customer-assets/database-tables) | Every table & key column with an entity diagram | Developers, DBAs |
| [Frontend & Components](/rokko/getting-started/customer-assets/frontend-components) | Vue pages, tabs, shared dialogs & the `context` switch | Frontend developers |

---

## Quick orientation (plain English)

1. An admin **registers** a customer asset and optionally gives it a **parts list**.
2. If the asset is flagged **Consumable**, parts are given to the machine over time
   (assign as used). If it is **Non-consumable**, every part slot is "pre-assigned" at
   creation (the machine comes with its parts; you can only replace/remove them).
3. Service technicians can **replace** a faulty part (old part leaves, new part enters,
   stock is updated, a history row is written) or **remove** a part (back to warehouse if
   good, to quarantine if faulty).
4. The asset's own status (Pending / Active) is **derived automatically** from whether all
   *mandatory* parts are present — an asset with missing mandatory parts can't be marked Active.

> For the full technical walkthrough use the pages above. If you are a non-technical reader,
> start with **Overview**, then **End-to-End Flow**.
