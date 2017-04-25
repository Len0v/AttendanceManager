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
            return _attendanceUnitOfWork.EventsRepository.GetAll().ToList();
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
            return _attendanceUnitOfWork.EventsRepository.GetById(eventId);
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
            return _attendanceUnitOfWork.AttendeesRepository.GetAll().ToList();
        }

        public IEnumerable<Attendee> GetAttendeesForEvent(int eventId)
        {
            var entities = _attendanceUnitOfWork.EventAttendeesRepository.Query((e) => e.EventId == eventId).ToList();
            var attendees = new List<Attendee>();

            foreach (var entity in entities)
            {
                var attendee = _attendanceUnitOfWork.AttendeesRepository.GetById(entity.AttendeeId);
                attendees.Add(attendee);
            }
            return attendees;
        }

        public IEnumerable<Attendee> GetAttendeesForQuery(Expression<Func<Attendee, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Attendee GetAttendee(int attendeeId)
        {
            return _attendanceUnitOfWork.AttendeesRepository.GetById(attendeeId);
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

        public bool RegisterAttendance(int eventId, int attendeeId)
        {
            var eventAttendee = new EventAttendee {EventId = eventId, AttendeeId = attendeeId};
            _attendanceUnitOfWork.EventAttendeesRepository.Add(eventAttendee);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }
    }
}
