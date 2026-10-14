# Settings (Admin)

> **Purpose** — the screen an admin uses to edit the checklist without a deploy, and the API
> behind it.

**Page:** `frontend/src/view/pages/profile/Setting/AssetChecklist.vue`
**Route:** the Settings → Asset Checklist screen (uses the standard settings layout).

| Guard | Effect |
|-------|--------|
| `setting:view` | the whole page is hidden without it |
| `setting:update` | Save button, add/remove buttons and drag handles are hidden; the table gets `pointer-events-none` |

---

## 1. What you can edit

```
┌─ Item Inspection Checklist ────────────────────────[ Save ]──┐
│  Title      [ Item Inspection Checklist            ]          │
│  Subtitle   [ Record mechanical fluid levels, ...  ]          │
│                                                               │
│  Inspection Items                                             │
│  ┌────────────────────┬───────────────┬──────────────────┐    │
│  │ Item Name          │ Unit          │ Observation      │    │
│  ├────────────────────┼───────────────┼──────────────────┤    │
│  │ ⠿ Battery Water    │ Liters        │ Check electr...  │  ✕ │
│  │ ⠿ Hydraulic Oil    │ Liters        │ Inspect reser... │  ✕ │
│  └────────────────────┴───────────────┴──────────────────┘    │
│  [ Add Item ]                                                 │
│                                                               │
│  Quick Suggestions                                            │
│  ┌────────────────────┬───────────────────────────────┐       │
│  │ Chip Label         │ Remarks Text                  │       │
│  ├────────────────────┼───────────────────────────────┼───────┤
│  │ ⠿ All levels normal│ All fluid levels verified...  │   ✕   │
│  └────────────────────┴───────────────────────────────┴───────┘
│  [ Add Suggestion ]                                           │
└───────────────────────────────────────────────────────────────┘
```

| Control | Writes |
|---------|--------|
| Title / Subtitle | `attributes.title`, `attributes.subtitle` |
| Items table | `attributes.items[]` (`name`, `unit`, `guidance`) |
| Suggestion table | `attributes.suggestions[]` (`label`, `text`) |
| **Save** | PATCHes the definition |
| Drag a row | **auto-saves** on drop (`v-on:end="saveSetting()"`) |

Items and suggestions are both **drag-to-reorder**; the row order becomes the `order` the
portal renders in.

---

## 2. API

| Method | URL | Handler |
|--------|-----|---------|
| `GET` | `api/setting/asset-checklist` | `AssetChecklistController::getAssetChecklists` |
| `POST` | `api/setting/asset-checklist` | `AssetChecklistController::storeAssetChecklist` |
| `PATCH` | `api/setting/asset-checklist/{id}` | `AssetChecklistController::updateAssetChecklist` |

These are **authenticated** (admin) routes, unlike everything under `public/portal/*`.

### PATCH validation

```php
'attributes'        => 'required|array',
'attributes.items'  => 'nullable|array|max:100',
'label'             => 'nullable|string|between:1,255',
'status'            => 'nullable|boolean',
```

- `attributes` is **required** — a PATCH must send the whole payload.
- At most **100 items** per definition.
- `label` and `status` are optional; omitted means "leave as is".

### POST behaviour

`storeAssetChecklist` only acts when the table is **empty**: it inserts the built-in default
(`emptyChecklist()`). If a definition already exists it is a no-op that just returns the list.
It is a convenience for a fresh install, not a "create new definition" endpoint.

---

## 3. How saving interacts with the portal

```
Admin edits  ->  PATCH attributes  ->  item_inspection_checklists.attributes (JSON)
                                              |
                                              v
                            PublicPortalController::buildChecklistDefinition()
                                              |
                                              v
                                    GET api/public/portal/checklist
```

The portal reads the definition on **every page load**, so a saved change is live for the
next scan — no cache to clear, no rebuild.

---

## 4. Gotchas

| Gotcha | Detail |
|--------|--------|
| **Only one definition matters** | the portal takes the lowest-id row with `status = 1`. If you edit a row that is not that one, nothing changes in the portal. |
| **The seeder wipes your edits** | `ItemInspectionChecklistsSeeder` runs `truncate()` first — re-running it discards anything edited here. See [Checklist Definitions & JSON Seeder](checklist-definitions). |
| **Blank names are dropped** | an item with an empty name never reaches the portal, even if it is saved. |
| **Half-filled chips are dropped** | a suggestion needs both `label` and `text`. |
| **Reordering saves immediately** | dragging a row fires a save — no confirmation, no undo. |
| **`status` is the kill switch** | setting a definition to `status = 0` makes the portal show "Checklist Unavailable" (the enquiry tab still works). |
