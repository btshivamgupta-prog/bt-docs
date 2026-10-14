# Security & Rate Limits

> **Purpose** — the portal has **no login**, so these are the only things standing between
> the internet and your database. Read this before deploying or adding an endpoint.

---

## 1. The trust model

Anyone who can reach the URL can submit. There is no token, no session, no captcha.

What that means in practice:

| Risk | Mitigation in place |
|------|---------------------|
| Spam / abuse | rate limiters (below) |
| Someone submitting for the wrong asset | the entity is **resolved server-side** from the barcode; the client cannot assert `type` / `type_id` |
| Forged checklist answers | the submission is validated and normalised server-side (blank rows dropped, values clamped) |
| Someone using a non-active checklist | the `checklist` id is accepted only if that row exists **and** `status = 1` |
| Repudiation | audit columns: `ip_address`, `device`, `platform`, `browser`, `languages`, `user_agent` |
| Data leakage in a response | responses expose only asset/definition fields the form needs; the `customer_id` / `property_id` handed back are resolved server-side, not chosen by the visitor |

> Treat the portal as a **public form**. If you ever need to prove who submitted something,
> the audit columns are the only trail there is — so do not drop them.

---

## 2. Rate limiters

Defined in `app/Providers/RouteServiceProvider::configureRateLimiting()`:

```php
RateLimiter::for('public-portal', function (Request $request) {
    return Limit::perMinute(60)->by($request->ip())->response(function ($request, $headers) {
        return response()->json([
            'status'  => false,
            'message' => 'Too many requests. Please slow down and try again shortly.',
        ], 429, $headers);
    });
});

RateLimiter::for('public-portal-write', function (Request $request) {
    return Limit::perMinute(10)->by($request->ip())->response(function ($request, $headers) {
        return response()->json([
            'status'  => false,
            'message' => 'Too many submissions. Please try again later.',
        ], 429, $headers);
    });
});
```

| Limiter | Limit | Applied to |
|---------|-------|-----------|
| `public-portal` | **60 / minute / IP** | the QR redirect, asset lookup, checklist fetch |
| `public-portal-write` | **10 / minute / IP** | both `POST`s (enquiry, checklist) |

Reads are generous because one page load makes several calls; writes are deliberately tight
because a real person submits one form.

Both return **JSON**, even on the HTML `web.php` route, so a phone shows a readable message
instead of a Laravel error page.

---

## 3. ⚠️ The trap that 429s everything

Referencing a limiter name that does not exist makes Laravel treat **max attempts as 0**, so
**every request is rejected** with `429`. It looks like a total outage, not a config typo.

The limiter is shared by two route files:

| File | Routes |
|------|--------|
| `routes/web.php` | `qr-scan/{barcode}` (the QR target) |
| `routes/api.php` | `public/portal/*` |

> **Keep the definition and both route sets in sync.** If you rename or remove a limiter,
> update every `->middleware('throttle:…')` that references it in the same commit.

Symptom → cause:

```
every scan returns 429, including a first-time visitor
  -> check the limiter name in BOTH route files
  -> check configureRateLimiting() still defines it
  -> check config/cache was cleared (php artisan config:clear)
```

---

## 4. Configuration that matters

| Env var | Used for | If wrong |
|---------|----------|----------|
| `APP_URL` | the URL **encoded into the QR** | every sticker points somewhere wrong — requires reprinting |
| `APP_FRONTEND_URL` | where a scan **redirects to** | falls back to `APP_URL`; the portal will not load if the SPA is on another host |

> `APP_FRONTEND_URL` is read via `config('app.frontend_url')` (`config/app.php`). Set it in
> every environment, including staging.

Also relevant: the QR PNG is uploaded to **S3** and marked `public`, and signature images go to
S3 as well. Bucket permissions are part of the security surface — a public-read bucket means
anyone with a URL can fetch a signature image.

---

## 5. Things the server deliberately decides (never trust the client)

| Input | Server behaviour |
|-------|------------------|
| `barcode` / `type_id` | resolved through `resolveRelated()`; stored values come from the resolved record |
| `checklist` | must exist and be active, else the active definition is used |
| `items[].name` | blank rows are discarded |
| `signature` | decoded and re-uploaded to S3 — the raw base64 is never persisted |
| `total_items` / `checked_items` | recomputed from the stored rows |
| IP / device / browser | read from request headers, not from the payload |

---

## 6. Hardening checklist

- [ ] `APP_FRONTEND_URL` set in every environment
- [ ] `APP_URL` matches the host that will serve `/qr-scan/*`
- [ ] Both rate limiters defined **and** referenced (grep for `throttle:public-portal`)
- [ ] S3 bucket policy reviewed for `files/barcodes/*` and `files/signatures/*`
- [ ] HTTPS enforced — a scanned QR on plain HTTP exposes the barcode and any submitted data
- [ ] `ip_address` column kept (45 chars, IPv6-capable) so the audit trail survives
- [ ] Log/alert on bursts of `429` from the write limiter — it is the only abuse signal you have
