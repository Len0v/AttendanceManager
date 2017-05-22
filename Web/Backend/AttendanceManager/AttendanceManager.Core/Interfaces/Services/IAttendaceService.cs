using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using AttendanceManager.Core.Entities;

namespace AttendanceManager.Core.Interfaces.Services
{
    public interface IAttendaceService
    {
        IEnumerable<Event> GetAllEvents();
        IEnumerable<Event> GetEventsForTimeRange(DateTime begin, DateTime end);
        IEnumerable<Event> GetEventsForQuery(Expression<Func<Event, bool>> predicate);
        Event GetEvent(int eventId);
        bool AddEvent(Event newEvent);
        bool ModifyEvent(Event modifiedEvent);
        bool DeleteEvent(Event deletedEvent);

        IEnumerable<Attendee> GetAllAttendees();
        IEnumerable<Attendee> GetAttendeesForEvent(int eventId);
        IEnumerable<Attendee> GetAttendeesForQuery(Expression<Func<Attendee, bool>> predicate);
        Attendee GetAttendee(int attendeeId);
        bool AddAttendee(Attendee attendee);
        bool ModifyAttendee(Attendee attendee);
        bool DeleteAttendee(int attendeeId);

        bool RegisterAttendance(EventAttendee eventAttendee);
        bool DeleteAttendance(EventAttendee eventAttendee);
    }
}
