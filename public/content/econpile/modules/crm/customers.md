# Customers

Customers are the client organizations or people receiving service, rental, or delivery work. The listing route is `admin.customer`; its backend owner is `app/Http/Controllers/CustomerController.php`.

## Record scope

A customer record can include contacts, billing and service addresses/sites, notification preferences, documents, and commercial context. Validate human names and addresses as text—not as numeric identifiers—and preserve relationship history when records change.

## Downstream impact

Customer selection drives available sites, contacts, assets, job context, quotations, invoices, and documents. Any API or form change must be verified against create, edit, import/export, search, and detail displays.
