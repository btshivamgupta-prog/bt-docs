# Finished Unit Component Management Flow

## Database Changes

Created a new table:

`finished_unit_components`

### Columns

```text
id
parent_serial_id
bom_product_id
bom_component_id
is_other
component_product_id
component_name
component_code
required_qty
assigned_qty
status
remarks
added_by
updated_by
created_at
updated_at
```

### Purpose

- Store component status per finished unit.
- Different finished units can have different component states.
- Avoid updating the global `bom_product_components.status`.

### Example

```text
Finished Unit: 421

Camera (255) -> Assigned
DVR (256) -> Pending
Other (257) -> Pending

Finished Unit: 422

Camera (255) -> Pending
DVR (256) -> Pending
Other (257) -> Pending
```

---

# Manufacturing Flow 

(`createManufactureBatch`)

When a BOM product is manufactured:

1. Create manufacturing batch.
2. Create finished-unit serial numbers in `product_serial_numbers`.
3. Fetch all BOM components.
4. Create records in `finished_unit_components` for every finished unit.

Example:

```text
Finished Unit: 421

Camera -> required_qty = 2
DVR -> required_qty = 2
Other -> required_qty = 1
```

Initial values:

```text
assigned_qty = 0
status = pending
```

---

# Component Assignment Flow 
(`assignComponentSerial`)

## Validation

Validate:

- `parent_serial_id`
- `bom_component_id`
- `component_product_id`

Check:

- Prevent assigning more than required quantity.
- Prevent assigning if all components are already assigned.

Error:

```text
All required serials have already been assigned.
Please use Replace instead.
```

---

# Supported Assignment Cases

## Case 1: Fully Serialized

Payload:

```json
{
  "serial_ids": [367, 368],
  "manual_serials": []
}
```

Actions:

- Create records in `finished_unit_component_assignments`.
- Mark serials as assigned.
- Deduct stock by 2.

---

## Case 2: Mixed Assignment

Payload:

```json
{
  "serial_ids": [367],
  "manual_serials": ["MANUAL-001"]
}
```

Actions:

- Create assignment for serialized component.
- Create manual serial in `product_serial_numbers`.
- Save generated serial ID in `finished_unit_component_assignments`.
- Deduct stock by 2.

---

## Case 3: Fully Manual

Payload:

```json
{
  "serial_ids": [],
  "manual_serials": [
    "MANUAL-001",
    "MANUAL-002"
  ]
}
```

Actions:

- Create manual serials in `product_serial_numbers`.
- Save generated IDs in `finished_unit_component_assignments`.
- Deduct stock by 2.

---

# Stock Management

## handleSerializedComponentOutbond()

Responsibilities:

- Mark serials as assigned.

Updates:

```text
activated = 0
status = assigned
outbond_id
outbond_barcode
bond_type
is_outbond
```

Creates history records.

**Does not deduct stock.**

---

## handleComponentStock()

Responsibilities:

- Deduct stock.
- Update product quantities.
- Create history records.

Updates:

```text
initial_stock
stock_on_hand
available_stock
```

**Does not create serial numbers.**

---

## Stock Deduction Formula

```php
$totalQty =
    count($request->serial_ids ?? [])
    + count(
        array_filter(
            $request->manual_serials ?? [],
            fn ($value) => !empty(trim($value))
        )
    );
```

Stock deduction:

```php
self::handleComponentStock(
    (int) $request->component_product_id,
    $totalQty,
    'outbond',
    $finishedUnit,
    $request
);
```

---

# Manual Serial Flow

For manual serials:

Example:

```text
MANUAL-001
MANUAL-002
```

Steps:

1. Create serial in `product_serial_numbers`.
2. Get generated ID.
3. Save both ID and text in `finished_unit_component_assignments`.

Example:

```text
product_serial_numbers

id = 501
text = MANUAL-001
```

Saved in assignment table:

```text
assigned_serial_id = 501
serial_number = MANUAL-001
```

---

# Status Management

After assignment:

```php
$totalAssigned = FinishedUnitComponentAssignment::where(
    'parent_serial_id',
    $request->parent_serial_id
)
->where(
    'bom_component_id',
    $request->bom_component_id
)
->count();
```

Status:

```php
$status = $totalAssigned >= $requiredQty
    ? STATUS_ASSIGNED
    : STATUS_PENDING;
```

Update:

```php
DB::table('finished_unit_components')
    ->where(
        'parent_serial_id',
        $request->parent_serial_id
    )
    ->where(
        'bom_component_id',
        $request->bom_component_id
    )
    ->update([
        'assigned_qty' => $totalAssigned,
        'status' => $status,
        'remarks' => $request->remarks,
        'updated_at' => now(),
    ]);
```

Only `finished_unit_components` is updated.

`bom_product_components` remains unchanged.

---

# API Changes

## Route

```php
Route::get(
    'bom-product/finished-unit/{unit}/composition',
    [BomProductController::class, 'getFinishedUnitComposition']
);
```

---

## API Flow

1. Get finished unit.
2. Call:

```php
getBomComponentsData();
```

3. Override only these fields from `finished_unit_components`:

```text
status
assigned_qty
remarks
```

Response keys remain unchanged.

---

# Current Architecture

```text
BOM Product
    |
    +---- Manufacturing Batch
            |
            +---- Finished Unit (product_serial_numbers)
                    |
                    +---- finished_unit_components
                    |
                    +---- finished_unit_component_assignments
                                |
                                +---- assigned_serial_id
                                +---- serial_number
```

---

# Pending Improvements

- Replace component API.
- Remove assigned serial API.
- Rollback stock on replacement.
- Warranty tracking per component.
- Component history timeline.
- Audit logs.
- Manufacturing rollback support.