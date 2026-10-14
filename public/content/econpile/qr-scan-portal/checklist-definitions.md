# Checklist Definitions & JSON Seeder

> **Purpose** — the content that drives the checklist form: the JSON file, its exact shape,
> the seeder that loads it, and the rules the backend applies when it reads it back.

The definition is **not** a set of tables. It is one JSON blob in one column, which is why
the admin screen and the seeder can both write it with no schema changes.

---

## 1. Where it lives

| Thing | Path |
|-------|------|
| JSON data | `database/seeder-data/item-inspection-checklists.json` |
| Seeder | `database/seeders/ItemInspectionChecklistsSeeder.php` |
| Wired into | `database/seeders/DatabaseSeeder.php` (`$this->call(ItemInspectionChecklistsSeeder::class);`) |
| Table | `item_inspection_checklists` |
| Read by | `PublicPortalController::buildChecklistDefinition()` |
| Edited by | `AssetChecklistController` (the admin Settings screen) |

> **Renamed:** this file used to be called `checklist-definitions.json`. If you find a
> reference to the old name, it is stale.

---

## 2. Table shape

```php
Schema::create('item_inspection_checklists', function (Blueprint $table) {
    $table->id();
    $table->string('label');
    $table->string('value')->unique();
    $table->json('attributes');
    $table->tinyInteger('status')->default(1)->unsigned()
          ->comment('1 => Active, 0 => Not-Active');
    $table->dateTimeTz('added_at')->useCurrent();
});
```

| Column | Meaning |
|--------|---------|
| `label` | human name of the definition ("Item Inspection Checklist") |
| `value` | machine key — **unique**, e.g. `item_inspection_checklist` |
| `attributes` | the JSON payload (items, suggestions, title, subtitle) |
| `status` | `1` = active, `0` = not active |
| `added_at` | when it was created |

---

## 3. The JSON shape

```json
[
  {
    "label": "Item Inspection Checklist",
    "value": "item_inspection_checklist",
    "attributes": {
      "title": "Item Inspection Checklist",
      "subtitle": "Record mechanical fluid levels, operating status, and inspector authorization.",
      "items": [
        {
          "name": "Battery Water",
          "type": "quantity",
          "unit": "Liters",
          "guidance": "Check electrolyte level & terminal corrosion",
          "order": 0
        }
      ],
      "suggestions": [
        {
          "label": "All levels normal",
          "text": "All fluid levels verified within normal operating range."
        }
      ]
    },
    "status": 1
  }
]
```

The file is an **array** — you can ship several definitions, but see
[Which definition is used](#5-which-definition-is-used).

### `attributes.items[]`

| Key | Type | Required | Notes |
|-----|------|----------|-------|
| `name` | string | **yes** | rows with a blank name are dropped before the portal ever sees them |
| `type` | string | no | defaults to `"quantity"` |
| `unit` | string | no | shown next to the quantity, e.g. `Liters`, `Cans / Units` |
| `guidance` | string | no | hint text under the item ("Inspect reservoir level & line pressure") |
| `order` | int | no | sort order; falls back to the array position |

### `attributes.suggestions[]`

| Key | Type | Required | Notes |
|-----|------|----------|-------|
| `label` | string | **yes** | the chip button text |
| `text` | string | **yes** | what gets appended to the remarks box |

> A suggestion needs **both** halves. If either is blank the backend silently drops it,
> so a chip can "disappear" even though it is in the JSON.

### `attributes.title` / `attributes.subtitle`

Rendered as the checklist form's heading and sub-heading. `title` also feeds the portal's
checklist card.

---

## 4. The seeder

```php
class ItemInspectionChecklistsSeeder extends Seeder
{
    public function run()
    {
        DB::table('item_inspection_checklists')->truncate();

        $jsonString = file_get_contents(
            base_path('database/seeder-data/item-inspection-checklists.json')
        );

        $checklists = collect(json_decode($jsonString, true))->map(function ($row) {
            $row['attributes'] = json_encode($row['attributes']);
            $row['status'] = isset($row['status']) ? (int) $row['status'] : 1;
            $row['added_at'] = now();
            return $row;
        })->toArray();

        DB::table('item_inspection_checklists')->insert($checklists);
    }
}
```

**It `truncate()`s the table first.** Running it is destructive: any definition edited
through the admin UI is wiped and replaced by the JSON. That is intentional (idempotent
reseeding), but it means:

> ⚠️ **Do not run this seeder on production unless you intend to reset the checklist.**

Run it with:

```bash
# just this definition
php artisan db:seed --class=ItemInspectionChecklistsSeeder

# everything (also truncates this table)
php artisan migrate:fresh --seed
```


---

## 5. Which definition is used

`buildChecklistDefinition()` picks **one** row:

```php
$row = DB::table('item_inspection_checklists')
    ->where('status', 1)
    ->orderBy('id', 'asc')
    ->select('id', 'label', 'value', 'attributes')
    ->first();
```

So the rule is: **the lowest-id row with `status = 1`**. Everything else in the table is
ignored by the portal — adding a second definition does not create a second form.

If nothing is active, `getChecklist` returns `404 Asset checklist is not configured.` and the
portal shows its "Checklist Unavailable" panel.

---

## 6. Normalisation applied when reading it back

The portal never trusts the JSON as-is:

| Rule | Behaviour |
|------|-----------|
| Sorting | items are sorted by `order`; equal `order` values keep their original array position (stable sort) |
| Blank items | an item with a blank `name` is skipped entirely |
| Item defaults | `type` → `"quantity"`, `unit` / `guidance` → `""` |
| Blank chips | a suggestion missing `label` **or** `text` is skipped |
| Branding | `company_name` / `company_logo` from `Company::where('id', 1)` are added to the response |

Response shape:

```json
{
  "id": 1,
  "label": "Item Inspection Checklist",
  "value": "item_inspection_checklist",
  "title": "Item Inspection Checklist",
  "subtitle": "Record mechanical fluid levels, ...",
  "items": [ { "name": "...", "type": "quantity", "unit": "...", "guidance": "..." } ],
  "suggestions": [ { "label": "...", "text": "..." } ],
  "company_name": "...",
  "company_logo": "..."
}
```

---

## 7. What ships by default

The seeded definition contains **6 items** and **4 quick suggestions**:

| # | Item | Unit |
|---|------|------|
| 0 | Battery Water | Liters |
| 1 | Hydraulic Oil | Liters |
| 2 | Engine Oil | Liters |
| 3 | Gear Oil | Liters |
| 4 | Auto Oil | Liters |
| 5 | Grease (Parts) | Cans / Units |

| Suggestion | Remarks text |
|------------|--------------|
| All levels normal | All fluid levels verified within normal operating range. |
| Routine top-up done | Cleaned filters and topped up fluids as per routine spec. |
| Cleared for duty | Machinery inspected and fully cleared for site duty. |
| Follow-up required | Minor seepage noted on fittings; scheduled for follow-up. |

---

## 8. Changing it

| Want to… | Do this |
|----------|---------|
| Change it for a running instance | use [Settings (Admin)](settings) — no deploy needed |
| Change the shipped default | edit the JSON, then run the seeder |
| Add a new item | add to `items[]` with a unique `order`, or add it in Settings and drag to reorder |
| Temporarily disable the checklist | set `status = 0` — the portal then shows "Checklist Unavailable" |
