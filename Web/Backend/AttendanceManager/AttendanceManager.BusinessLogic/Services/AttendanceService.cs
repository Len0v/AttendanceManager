using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.Services;
using AttendanceManager.Core.Interfaces.UnitsOfWork;
using Microsoft.EntityFrameworkCore;

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
            return GetEventsWithAllDependendEntities(_attendanceUnitOfWork.EventsRepository.GetAll());
        }
        
        //public IEnumerable<Event> GetEventsForTimeRange(DateTime begin, DateTime end)
        //{
        //    //StrictMode - only events in which entire time slot is in given period
        //    return GetEventsWithAllDependendEntities(
        //        _attendanceUnitOfWork.EventsRepository.Query(
        //            e => e.TimeSlot.BeginTime >= begin && e.TimeSlot.EndTime <= end));
        //}

        public IEnumerable<Event> GetEventsForQuery(Expression<Func<Event, bool>> predicate)
        {
            return GetEventsWithAllDependendEntities(_attendanceUnitOfWork.EventsRepository.Query(predicate));
        }

        public Event GetEvent(int eventId)
        {
            return GetEventsWithAllDependendEntities(_attendanceUnitOfWork.EventsRepository.Query(e => e.Id == eventId)).FirstOrDefault();
        }

        public int AddEvent(Event newEvent)
        {
            var result = _attendanceUnitOfWork.EventsRepository.Add(newEvent);
            _attendanceUnitOfWork.SaveChanges();
            return result.Id;
        }

        public bool ModifyEvent(Event modifiedEvent)
        {
            _attendanceUnitOfWork.EventsRepository.Update(modifiedEvent);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        public bool DeleteEvent(int id)
        {
            var eventToDelete = _attendanceUnitOfWork.EventsRepository.GetById(id);
            _attendanceUnitOfWork.EventsRepository.Delete(eventToDelete);
            _attendanceUnitOfWork.SaveChanges();
            return true;
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

        public bool RegisterAttendance(EventAttendee eventAttendee)
        {
            _attendanceUnitOfWork.EventAttendeesRepository.Add(eventAttendee);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        public bool DeleteAttendance(EventAttendee eventAttendee)
        {
            var retrievedEntity = _attendanceUnitOfWork.EventAttendeesRepository
                .Query(ea => ea.AttendeeId == eventAttendee.AttendeeId && ea.EventId == eventAttendee.EventId)
                .FirstOrDefault();
            _attendanceUnitOfWork.EventAttendeesRepository.Delete(retrievedEntity);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        private IEnumerable<Event> GetEventsWithAllDependendEntities(IQueryable<Event> events)
        {
            return events.
                Include(e => e.Room).
                Include(e => e.TimeSlot).
                Include(e => e.Lecturer).
                Include(e => e.CourseUnit).
                Include(e => e.CourseUnit).
                ThenInclude(e => e.CourseType).
                Include(e => e.CourseUnit).
                ThenInclude(e => e.Course).
                ToList();
        }

        public IEnumerable<Attendee> GetAuthorizedAttendeesForEvent(int eventId)
        {
            return _attendanceUnitOfWork.EventAuthorizedAttendeesRepository.Query(a => a.EventId == eventId)
                .Select(e => e.Attendee);
        }

        public bool AddEventAuthorizedAttendee(EventAuthorizedAttendee attendee)
        {
            _attendanceUnitOfWork.EventAuthorizedAttendeesRepository.Add(attendee);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        public bool DeleteEventAuthorizedAttendee(EventAuthorizedAttendee attendee)
        {
            var attendeeToDelete = _attendanceUnitOfWork.EventAuthorizedAttendeesRepository
                .Query(a => a.AttendeeId == attendee.AttendeeId && a.EventId == attendee.EventId).FirstOrDefault();
            _attendanceUnitOfWork.EventAuthorizedAttendeesRepository.Delete(attendeeToDelete);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        public IEnumerable<Attendee> GetAuthorizedAttendeesForCourse(int courseId)
        {
            return _attendanceUnitOfWork.CourseAuthorizedAttendeesRepository.Query(a => a.CourseUnitId == courseId)
                .Select(e => e.Attendee);
        }

        public bool AddCourseAuthorizedAttendee(CourseAuthorizedAttendee attendee)
        {
            _attendanceUnitOfWork.CourseAuthorizedAttendeesRepository.Add(attendee);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        public bool DeleteCourseAuthorizedAttendee(CourseAuthorizedAttendee attendee)
        {
            var attendeeToDelete = _attendanceUnitOfWork.CourseAuthorizedAttendeesRepository
                .Query(a => a.AttendeeId == attendee.AttendeeId && a.CourseUnitId == attendee.CourseUnitId).FirstOrDefault();
            _attendanceUnitOfWork.CourseAuthorizedAttendeesRepository.Delete(attendeeToDelete);
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }

        public bool RegisterAttendance(Attendee attendee, int roomId)
        {
            //For develop only
            var currentDate = DateTime.Now;
            var activeEvent = _attendanceUnitOfWork.EventsRepository.Query(e => e.RoomId == roomId)
                .Where(e => e.Date.Date == currentDate.Date)
                .Where(e => e.TimeSlot.BeginTime <= currentDate.TimeOfDay &&
                            e.TimeSlot.EndTime >= currentDate.TimeOfDay).FirstOrDefault();
          
            var user = _attendanceUnitOfWork.AttendeesRepository.Query(u => u. CardNumber == attendee.CardNumber).ToList().FirstOrDefault();

            if (user == null)
            {
                _attendanceUnitOfWork.AttendeesRepository.Add(attendee);
                _attendanceUnitOfWork.SaveChanges();
                user = _attendanceUnitOfWork.AttendeesRepository.Query(u => u.CardNumber == attendee.CardNumber).ToList().FirstOrDefault();
            }

            var isUserAllowed = false;
            if (!activeEvent.IsRestricted) isUserAllowed = true;
            else
            {
                if (activeEvent.CourseUnitId != null && activeEvent.CourseUnitId != 0)
                {
                    var courseAuthorizedAttendees = _attendanceUnitOfWork.CourseAuthorizedAttendeesRepository.Query(
                        e => e.CourseUnitId == activeEvent.CourseUnitId).ToList();
                    if (courseAuthorizedAttendees.Any(a => a.AttendeeId == user.Id)) isUserAllowed = true;
                }
                else
                {
                    var eventAuthorizedAttendees = _attendanceUnitOfWork.EventAuthorizedAttendeesRepository.Query(
                        e => e.EventId == activeEvent.Id).ToList();
                    if (eventAuthorizedAttendees.Any(a => a.AttendeeId == user.Id)) isUserAllowed = true;
                }
            }

            if (activeEvent != null && isUserAllowed)
            {
                var eventAttendee = new EventAttendee { AttendeeId = user.Id, EventId = activeEvent.Id };
                _attendanceUnitOfWork.EventAttendeesRepository.Add(eventAttendee);
                _attendanceUnitOfWork.SaveChanges();
                return true;
            }
            return false;
        }

        public bool AddEventAuthorizedAttendees(IEnumerable<int> attendeesIds, int eventId)
        {
            foreach (var attendeeId in attendeesIds)
            {
                var temp = new EventAuthorizedAttendee {AttendeeId = attendeeId, EventId = eventId};
                _attendanceUnitOfWork.EventAuthorizedAttendeesRepository.Add(temp);
            }
           
            _attendanceUnitOfWork.SaveChanges();
            return true;
        }
    }
}
