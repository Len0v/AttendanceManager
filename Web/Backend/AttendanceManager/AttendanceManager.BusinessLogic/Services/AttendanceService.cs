using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.Services;
using AttendanceManager.Core.Interfaces.UnitsOfWork;

namespace AttendanceManager.BusinessLogic.Services
{
    public class AttendanceService : IAttendaceService
    {
        private IAttendanceUnitOfWork _attendanceUnitOfWork;

        public AttendanceService(IAttendanceUnitOfWork attendanceUnitOfWork)
        {
            _attendanceUnitOfWork = attendanceUnitOfWork;
        }

        public IEnumerable<Event> GetAllEvents()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Event> GetEventsForTimeRange(DateTime begin, DateTime end)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Event> GetEventsForQuery(Expression<Func<Event, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Event GetEvent(int eventId)
        {
            throw new NotImplementedException();
        }

        public bool AddEvent(Event newEvent)
        {
            throw new NotImplementedException();
        }

        public bool ModifyEvent(Event modifiedEvent)
        {
            throw new NotImplementedException();
        }

        public bool DeleteEvent(Event deletedEvent)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Attendee> GetAllAttendees()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Attendee> GetAttendeesForEvent(int eventId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Attendee> GetAttendeesForQuery(Expression<Func<Attendee, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Attendee GetAddAttendee(int attendeeId)
        {
            throw new NotImplementedException();
        }

        public bool AddAttendee(Attendee attendee)
        {
            throw new NotImplementedException();
        }

        public bool ModifyAttendee(Attendee attendee)
        {
            throw new NotImplementedException();
        }

        public bool DeleteAttendee(int attendeeId)
        {
            throw new NotImplementedException();
        }

        public bool NotifyAttendance(int eventId, int attendeeId)
        {
            throw new NotImplementedException();
        }
    }
}
