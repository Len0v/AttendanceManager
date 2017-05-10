using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.Services;
using AttendanceManager.Core.Interfaces.UnitsOfWork;
using Microsoft.EntityFrameworkCore;

namespace AttendanceManager.BusinessLogic.Services
{
    public class EventService :IEventsService
    {
        private IEventUnitOfWork _eventUnitOfWork;

        public EventService(IEventUnitOfWork eventUnitOfWork)
        {
            _eventUnitOfWork = eventUnitOfWork;
        }

        public IEnumerable<Room> GetRooms()
        {
            return _eventUnitOfWork.RoomsRepository.GetAll().ToList();
        }

        public Room GetRoom(int id)
        {
            return _eventUnitOfWork.RoomsRepository.GetById(id);
        }

        public IEnumerable<Lecturer> GetLecturers()
        {
            return _eventUnitOfWork.LecturersRepository.GetAll().ToList();
        }

        public Lecturer GetLecturer(int id)
        {
            return _eventUnitOfWork.LecturersRepository.GetById(id);
        }

        public IEnumerable<TimeSlot> GetTimeSlots()
        {
            return _eventUnitOfWork.TimeSlotsRepository.GetAll();
        }

        public TimeSlot GetTimeSlot(int id)
        {
            return _eventUnitOfWork.TimeSlotsRepository.GetById(id);
        }

        public IEnumerable<CourseUnit> GetCourseUnits()
        {
            return GetCourseUnitsWithAllDependendEntities(_eventUnitOfWork.CourseUnitsRepository.GetAll());
        }

        public CourseUnit GetCourseUnit(int id)
        {
            return GetCourseUnitsWithAllDependendEntities(_eventUnitOfWork.CourseUnitsRepository.Query(e => e.Id == id)).FirstOrDefault();
        }

        private IEnumerable<CourseUnit> GetCourseUnitsWithAllDependendEntities(IQueryable<CourseUnit> courseUnits)
        {
            return courseUnits.
                Include(e => e.Course).
                Include(e => e.CourseType).
                ToList();
        }
    }
}
