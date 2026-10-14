# QR Codes & URLs

> **Purpose** — exactly what is printed on the sticker, what URL it resolves to, and how
> to change either without breaking stickers that are already stuck to machines.

---

## 1. Which records get a QR

Only **own assets / sub assets**:

```php
// app/Traits/ProductTrait.php  (inside genrateBarcode)
if (
    $type === 'equipment' &&
    in_array($moduleData->equipment_type, ['asset', 'sub_asset'], true)
) {
    $baseUrl = rtrim(config('app.url'), '/');
    $text = $baseUrl . '/qr-scan/' . $moduleData->barcode;
}
```

So a `tool` (or a customer asset) gets a plain barcode image, **not** a portal URL.
The QR is (re)generated whenever the equipment is created or updated —
`EquipmentController` calls `$this->genrateBarcode($dbEquipment->id, 'equipment')`.

---

## 2. What the QR encodes

```
{APP_URL}/qr-scan/{barcode}
```

Note it is the **backend** URL (`config('app.url')`), not the frontend one. Example:

```
https://api.example.com/qr-scan/AEQP-019
```

| Part | Source | Notes |
|------|--------|-------|
| Host | `config('app.url')` | trailing slash stripped |
| Path | `/qr-scan/` | fixed |
| Barcode | `equipment.barcode` | the only variable |

> **Do not add parameters.** The design goal is *one stable URL*: a sticker printed today
> must still work after a rebrand or a domain move.

---

## 3. How the PNG is produced and stored

`ProductTrait::generateAndUploadQrCode()`:

```php
$path = config('app.customer_code') . "/files/{$folder}/{$filename}.png";

$result = Builder::create()          // Endroid\QrCode\Builder\Builder
    ->writer(new PngWriter())
    ->data($content)
    ->size($size)                    // default 300
    ->margin($margin)                // default 10
    ->build();

Storage::disk('s3')->put($path, $result->getString());
Storage::disk('s3')->setVisibility($path, 'public');

return Storage::disk('s3')->url($path);
```

| Property | Value |
|----------|-------|
| Folder | `{app.customer_code}/files/barcodes/` |
| Filename | `{barcode}.png` |
| Size / margin | 300 px / 10 |
| Disk | **S3**, set **public** |
| Saved to | `equipment.barcode_image` (full public URL) |
| Library | `endroid/qr-code` |

> **`serial_image` is a different thing.** The serial-number QR encodes the raw
> `serial_no` string, **not** a URL, and is stored on `equipment.serial_image`.
> Don't confuse the two when debugging a scan.

---

## 4. The redirect (backend → frontend)

The QR points at the backend, which bounces the phone to the SPA:

```php
// app/Http/Controllers/PublicPortalController.php
public function redirectQrScan(Request $request)
{
    $barcode = (string) $request->route('barcode');

    $baseUrl = config('app.frontend_url');   // APP_FRONTEND_URL
    if (!$baseUrl) {
        $baseUrl = config('app.url');        // fallback
    }

    return redirect()->away(rtrim($baseUrl, '/') . '/qr-scan/' . $barcode);
}
```

**Config:** `config/app.php` → `'frontend_url' => env('APP_FRONTEND_URL')`.

| Env var | Used for | If unset |
|---------|----------|----------|
| `APP_URL` | the URL **encoded into** the QR | QR is unusable |
| `APP_FRONTEND_URL` | where the scan **redirects to** | falls back to `APP_URL` |

> If `APP_FRONTEND_URL` is missing and the backend and frontend are different hosts, the
> redirect lands on the API host and the portal will not load. Always set it in production.

---

## 5. Every URL in the chain

| Method | URL | Defined in | Purpose |
|--------|-----|-----------|---------|
| `GET` | `{APP_URL}/qr-scan/{barcode}` | `routes/web.php` | what the QR points at → 302 |
| `GET` | `{APP_FRONTEND_URL}/qr-scan/{barcode}` | `frontend/src/router.js` | the SPA route (`public.portal`) |
| `GET` | `{APP_FRONTEND_URL}/public-enquiry` | `frontend/src/router.js` | legacy alias, **redirects** to `/qr-scan` |

Route definition (backend):

```php
Route::get('qr-scan/{barcode}', [PublicPortalController::class, 'redirectQrScan'])
    ->where(['barcode' => '[A-Za-z0-9\-_]+'])
    ->middleware('throttle:public-portal');
```

Router definition (frontend):

```js
{
  // ONE stable URL - the entity (equipment today, products later) is resolved on the backend
  path: "/qr-scan/:barcode?",
  name: "public.portal",
  component: () => import("@/view/pages/public/PublicPortal.vue"),
  meta: { requiresAuth: false, title: "Public Service Portal" },
}
```

> The barcode is optional in the SPA route (`:barcode?`) so the page still renders if
> someone opens `/qr-scan` directly — it then shows the "enter a barcode" state instead
> of a 404.

---

## 6. Cheat sheet

```bash
# what the QR contains (per asset)
{APP_URL}/qr-scan/AEQP-019

# what the phone ends up on
{APP_FRONTEND_URL}/qr-scan/AEQP-019

# what the page then calls
GET {APP_URL}/api/public/portal/asset/AEQP-019
GET {APP_URL}/api/public/portal/checklist
```
