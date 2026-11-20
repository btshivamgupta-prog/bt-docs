# Rentals and Warranty

RentalController and WarrantyController connect equipment/assets with rental records, warranty periods, extensions, reminders, and service activity. Frontend pages are under rental and warranty.

WarrantyStatus and WarrantyReminderJob run from the Laravel scheduler. Exact rental billing, status codes, and renewal behavior are Not verified; trace RentalController, WarrantyController, Rental models, Warranty models, and the relevant migrations.
