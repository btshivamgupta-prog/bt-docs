# Recurring Job

Recurring Job (`admin.recurring-job`) defines a schedule pattern that produces service occurrences. Relevant UI includes `Recurring-Schedule.vue` and `Recurring-Pattern-Template.vue`; exports are handled by `RecurringVisitExport.php`.

The recurrence definition is not the same as an individual occurrence. Edit the pattern carefully, define the effective date, and decide explicitly whether already-generated visits retain their history. Validate timezone, end conditions, exceptions, holidays, capacity, and duplicate prevention. Each generated visit must still follow normal assignment, permission, and completion rules.
