# Troubleshooting

> **Purpose** — symptom → cause → fix, for the problems this feature actually produces.

---

## Scanning & redirects

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| QR scans to a "not found" page | the asset is not an own asset / sub asset, so no portal QR was ever generated (`tool`, customer assets, products) | check `equipment.equipment_type` is `asset` or `sub_asset` and `main_type = main_company` |
| QR scans to the wrong host | `APP_URL` changed after the sticker was printed | the QR stores an absolute URL — the sticker must be reprinted, or `APP_URL` restored |
| Redirect lands on the API host and the page does not load | `APP_FRONTEND_URL` is unset, so it fell back to `APP_URL` | set `APP_FRONTEND_URL` and `php artisan config:clear` |
| **Every** scan returns `429`, even the first one | a `throttle:public-portal*` limiter name is not defined — Laravel then treats max attempts as `0` | check `RouteServiceProvider::configureRateLimiting()` **and** both `routes/web.php` + `routes/api.php`; clear the config cache |
| Old behaviour after a config change | cached config/routes | `php artisan config:clear && php artisan route:clear` |

---

## The portal page

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Asset not found." | the barcode in the URL does not resolve | confirm the barcode exists, and that it is `[A-Za-z0-9\-_]+` |
| "Checklist Unavailable" | no row in `item_inspection_checklists` with `status = 1` | reseed (`php artisan db:seed --class=ItemInspectionChecklistsSeeder`) or activate a definition in Settings |
| Item rows missing | the definition's `items[]` is empty, or every item has a blank `name` (the backend drops nameless rows) | fix the definition |
| Quick-suggestion chips missing | an entry needs **both** `label` and `text`; half-filled ones are dropped | fill both halves |
| Items in the wrong order | `order` values are duplicated or absent | set distinct `order` values, or drag rows in Settings |
| Signature canvas is blank / drawing is offset | the canvas was initialised while hidden | switching tabs must go through `initSignaturePad()`; resizing re-inits it |
| No company logo in the header | branding comes from `Company::where('id', 1)` | set `company_name` / `company_logo` on company 1 |
| Submitting does nothing | a `422` from validation, e.g. `items` empty | watch the network tab; the error bag lists the exact field |

---

## The admin side

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| An edit in Settings changed nothing in the portal | you edited a definition that is **not** the active one — the portal uses the lowest-id row with `status = 1` | edit/activate that row |
| Settings edits vanished | the seeder was re-run — it `truncate()`s the table first | re-apply the change, or stop re-running the seeder on that database |
| Report shows "Not Signed" for a submission that was signed | the signature pad was empty at submit, or the data URL was invalid | check `signatures` on the row; re-submit from the portal |
| Report's Own Asset / Sub Asset / Category dropdowns are empty | the `filter-options` call failed | `GET api/asset-checklist-report/filter-options` and check the response |
| Sub Asset dropdown shows "No sub assets found" after picking an Own Asset | the cascade was removed on purpose — `equipment_sub_assets` holds very few links, so narrowing emptied the list | nothing to fix; pick a sub asset directly |
| Picking a Sub Asset **and** "Asset Type = Own Asset" returns 0 rows | they AND, and a sub asset is not an own asset | use the specific pickers, leave Asset Type empty |
| Asset names show as ciphertext | a name was read straight from SQL — `equipment.name` is encrypted | read it through the model (which decrypts) or via a relation |
| Rows missing from the report | the submission is soft-deleted | query with `withTrashed()` / check `deleted_at` |

---

## Quick diagnostics

```bash
# 1. is the QR route registered, and with which limiter?
php artisan route:list --path=qr-scan

# 2. do the public routes exist?
php artisan route:list --path=public/portal

# 3. is a checklist active?
php artisan tinker --execute="dump(DB::table('item_inspection_checklists')->where('status',1)->orderBy('id')->first());"

# 4. does the barcode resolve?
curl -s "$APP_URL/api/public/portal/asset/AEQP-019" -H 'Accept: application/json' | jq

# 5. what does the QR redirect to?
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' "$APP_URL/qr-scan/AEQP-019"

# 6. are submissions landing?
php artisan tinker --execute="dump(DB::table('item_inspection_submissions')->latest('id')->first());"
```

---

## Before you report a bug

1. Does `GET api/public/portal/asset/{barcode}` return `200` with a sensible asset?
2. Does `GET api/public/portal/checklist` return `200` with `items[]` populated?
3. What status did the `POST` return — `422` (payload), `404` (asset/definition) or `429` (throttle)?
4. If it is `429`, is it the **first** request too? Then it is the undefined-limiter trap,
   not real traffic.
