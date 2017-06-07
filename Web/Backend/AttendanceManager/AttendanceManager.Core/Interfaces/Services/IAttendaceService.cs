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
        //IEnumerable<Event> GetEventsForTimeRange(DateTime begin, DateTime end);
        IEnumerable<Event> GetEventsForQuery(Expression<Func<Event, bool>> predicate);
        Event GetEvent(int eventId);
        int AddEvent(Event newEvent);
        bool ModifyEvent(Event modifiedEvent);
        bool DeleteEvent(int id);

        IEnumerable<Attendee> GetAllAttendees();
        IEnumerable<Attendee> GetAttendeesForEvent(int eventId);
        IEnumerable<Attendee> GetAttendeesForQuery(Expression<Func<Attendee, bool>> predicate);
        Attendee GetAttendee(int attendeeId);
        bool AddAttendee(Attendee attendee);
        bool ModifyAttendee(Attendee attendee);
        bool DeleteAttendee(int attendeeId);

        bool RegisterAttendance(EventAttendee eventAttendee);
        bool RegisterAttendance(Attendee attendee, int roomId);
        bool DeleteAttendance(EventAttendee eventAttendee);

        IEnumerable<Attendee> GetAuthorizedAttendeesForEvent(int eventId);
        bool AddEventAuthorizedAttendee(EventAuthorizedAttendee attendee);
        bool AddEventAuthorizedAttendees(IEnumerable<Attendee> attendees, int eventId);
        bool DeleteEventAuthorizedAttendee(EventAuthorizedAttendee attendee);

        IEnumerable<Attendee> GetAuthorizedAttendeesForCourse(int eventId);
        bool AddCourseAuthorizedAttendee(CourseAuthorizedAttendee attendee);
        bool DeleteCourseAuthorizedAttendee(CourseAuthorizedAttendee attendee);
    }
}
