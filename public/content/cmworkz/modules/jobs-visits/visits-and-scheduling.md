# Visit Scheduling, Recurrence, and Reminders

Visit creation uses TicketController updateOrCreateVisit and CreateOrUpdateVisit. Assignment, daily/weekly/monthly recurrence, rescheduling, reminders, available engineers, check-in/out, timestamps, and timers are handled by TicketController and VisitController.

Relevant models include TicketVisit, recurrence models, TicketVisitTeam, TicketVisitReminder, VisitStamp, VisitTrip, and TicketTimeSheet. Jobs include VisitReminderJob, ReminderVisitJob, CreateCalendarEvent, CreateVisitICS, SendVisitMails, and SendVisitReminderMails.

Failure points: unavailable engineer, schedule conflict, invalid recurrence date, stale location, and queued reminder/calendar failure.
