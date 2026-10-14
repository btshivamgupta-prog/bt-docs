# Submissions & Database

> **Purpose** — exactly what a submitted inspection stores, so you can query, export or
> debug it without guessing.

---

## 1. The two tables

| Table | Written by | Meaning |
|-------|-----------|---------|
| `item_inspection_submissions` | `POST api/public/portal/item-inspection-checklist` | one filled-in **asset checklist** |
| `item_inspection_checklists` | seeder / admin Settings | the **definition** the form rendered |

The enquiry path is different: `POST api/public/portal/enquiry` writes a normal
**`enquiries`** row (with its own `line_items`), not a submission. Submissions are only the
checklist path.

---

## 2. `item_inspection_submissions`

```php
$table->id();
$table->string('barcode', 100)->unique();
$table->string('reference', 100)->nullable();

$table->tinyInteger('type')->default(1)->unsigned()->comment('1 => Equipment, 2 => Product');
$table->bigInteger('type_id')->nullable()->unsigned();
$table->string('type_barcode', 100)->nullable()->comment('the barcode that was scanned');

/* which checklist definition was used */
$table->bigInteger('checklist')->nullable()->unsigned();

/* who / where the inspection happened */
$table->bigInteger('customer')->nullable()->unsigned();
$table->bigInteger('property')->nullable()->unsigned();
$table->bigInteger('rental')->nullable()->unsigned()->comment('the active rental at submit time, NULL => not on rent');

/* the inspection itself */
$table->json('items')->nullable()->comment('[{name, type, unit, guidance, checked, description, quantity}]');
$table->text('remarks')->nullable()->comment('Inspection Summary & Remarks');
$table->integer('total_items')->default(0);
$table->integer('checked_items')->default(0);
$table->json('signatures')->nullable()->comment('[{"mechanic": "<url>"}] - any number of roles');

/* audit :: the portal needs no login, so this is the only forensic trail */
$table->string('ip_address', 45)->nullable();
$table->string('device')->nullable();
$table->string('platform')->nullable();
$table->string('platform_version')->nullable();
$table->string('browser')->nullable();
$table->string('browser_version')->nullable();
$table->json('languages')->nullable();
$table->text('user_agent')->nullable();

$table->tinyInteger('status')->default(1)->unsigned()->comment('1 => Submitted, 2 => Reviewed, 0 => Void');
$table->bigInteger('added_by')->nullable()->unsigned()->comment('NULL => submitted from the public portal (no login)');
$table->dateTimeTz('added_at')->useCurrent();
$table->bigInteger('updated_by')->nullable()->unsigned();
$table->dateTimeTz('updated_at')->useCurrentOnUpdate()->nullable();
$table->softDeletesTz();
```

### Column reference

| Column | Notes |
|--------|-------|
| `barcode` | the submission's own barcode — **unique** |
| `type` / `type_id` | what was inspected. `1` = equipment (the row's id in `equipment`), `2` = product. Resolved on the **backend**, never taken from the payload. |
| `type_barcode` | the barcode as scanned, kept for forensics even if the record later changes |
| `checklist` | which definition was filled in — the snapshot stays readable if the definition is later edited |
| `customer` / `property` | the customer + site the inspection is attributed to |
| `rental` | the active rental at submit time; `NULL` means the unit was not on rent |
| `items` | the **answer snapshot** (see below) |
| `remarks` | the free-text summary |
| `total_items` / `checked_items` | counts; the report derives a percentage from these |
| `signatures` | signature image URLs, keyed by role |
| `ip_address` … `user_agent` | audit trail — the only one there is, since there is no login |
| `status` | `1` submitted, `2` reviewed, `0` void — **not used by the report** |
| `added_by` | `NULL` means "came from the public portal" |
| `deleted_at` | soft deletes |

### Indexes

`deleted_at`, `(type, type_id)`, `customer`, `added_at` — the report's filters line up with
these.

---

## 3. The `items` snapshot

An array of answered rows — **not** a foreign key to the definition:

```json
[
  {
    "name": "Battery Water",
    "type": "quantity",
    "unit": "Liters",
    "guidance": "Check electrolyte level & terminal corrosion",
    "checked": true,
    "description": "topped up",
    "quantity": 2
  }
]
```

This is why a submission stays readable after the definition is edited: the row carries the
label, unit and guidance it was rendered with.

**Normalisation on write:**

| Rule | Behaviour |
|------|-----------|
| Blank names | a row with an empty `name` is skipped and never stored |
| Defaults | `type` → `quantity`, `unit` / `guidance` → `""`, `checked` → `false`, `quantity` → `0` |
| Limits | at most **100** items, `description` ≤ 500, `remarks` ≤ 2000 |


---

## 4. The `signatures` snapshot

```json
[{ "mechanic": "https://…/files/signatures/AEQP-019-mechanic.png" }]
```

- The portal sends the canvas as a `data:image/png;base64,...` string (`signature`).
- `storeSignature()` decodes it, uploads to **S3**, and stores the public **URL** — never the
  raw base64.
- The key is the **role**, so more than one signature can be attached over time.
- Invalid or unreadable image data is rejected rather than stored.
- A submission with no signature is simply **not signed** — see [Reports](reports).

---

## 5. Reading it back

```php
ItemInspectionSubmission::query()
    ->leftJoin('item_inspection_checklists', 'item_inspection_checklists.id', '=',
               'item_inspection_submissions.checklist')
    ->with(['equipment_relation', 'product_relation', 'customer_relation', 'property_relation'])
```

| Relation | Resolves |
|----------|----------|
| `equipment_relation` | the `equipment` row when `type = 1` |
| `product_relation` | the `product` row when `type = 2` |
| `customer_relation` | the customer — **read through the relation**, because names are encrypted at rest |
| `property_relation` | the site |

> `equipment.name` is **encrypted** (`$encryptable = ['name','serial_no']`). You cannot
> `LIKE` against it in SQL — filter by `type_id` instead. This is why the report's asset
> dropdowns submit ids, not names.

---

## 6. Model constants

```php
// app/Models/ItemInspectionSubmission.php
public const TYPE_EQUIPMENT = 1;
public const TYPE_PRODUCT   = 2;
```

Use these instead of the literals `1` / `2`.

---

## 7. Useful queries

```sql
-- everything submitted for one asset
SELECT * FROM item_inspection_submissions
WHERE type = 1 AND type_id = 101 AND deleted_at IS NULL;

-- signed vs not signed
SELECT
  SUM(signatures IS NOT NULL) AS signed,
  SUM(signatures IS NULL)     AS not_signed
FROM item_inspection_submissions WHERE deleted_at IS NULL;

-- submissions that carry a checklist snapshot
SELECT barcode, checklist, total_items, checked_items, added_at
FROM item_inspection_submissions
WHERE checklist IS NOT NULL ORDER BY added_at DESC;
```
