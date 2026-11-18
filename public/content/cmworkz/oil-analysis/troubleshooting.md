# Troubleshooting & Safe Changes

## PDF is not available after save

1. Confirm `php artisan queue:work` is running.
2. Check `storage/logs/laravel.log`.
3. Search `debug_table` for `Oil Report PDF` and `Oil Report Chart` records.
4. Confirm chart directories can be created under `storage/app/charts/`.
5. Confirm the configured S3 disk can upload and that `sample_pdf_url` is eventually updated.

## No trend chart

This is expected when fewer than two dated numeric values exist for the same transformer and sample point. Check the sample point first; two values from different points do not form one trend.

## Report looks complete but a sample is not complete

Current completion behavior requires all three document references: DGA, acid, and furan. Check whether the write path saved all document IDs, not merely whether files were selected in the browser.

## Safe change protocol

- Read the model, controller, Vue form, API route, queue job, and Blade PDF before changing an oil field.
- Make migrations additive and audit later migrations for the same table.
- Preserve customer/site/transformer scope in every lookup.
- Test queued output with both no-history and multi-history transformer scenarios.
- Never run menu seeders or destructive database commands against shared data without explicit authorization.
