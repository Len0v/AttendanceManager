using System;
using System.Collections.Generic;
using System.Text;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Infrastructure;
using AttendanceManager.Core.Interfaces.DAL;
using AttendanceManager.Core.Interfaces.UnitsOfWork;

namespace AttendanceManager.BusinessLogic.UnitsOfWork
{
    public class EventUnitOfWork :IEventUnitOfWork
    {
        private ContextScope _contextScope;
        public IRepository<Event> EventsRepository { get; set; }
        public IRepository<TimeSlot> TimeSlotsRepository { get; set; }
        public IRepository<Room> RoomsRepository { get; set; }
        public IRepository<Lecturer> LecturersRepository { get; set; }
        public IRepository<CourseUnit> CourseUnitsRepository { get; set; }

        public EventUnitOfWork(IRepository<Event> eventsRepository, IRepository<TimeSlot> timeSlotsRepository,
            IRepository<Room> roomsRepository, IRepository<Lecturer> lecturersRepository, IRepository<CourseUnit> courseUnitsRepository)
        {
            EventsRepository = eventsRepository;
            TimeSlotsRepository = timeSlotsRepository;
            RoomsRepository = roomsRepository;
            LecturersRepository = lecturersRepository;
            CourseUnitsRepository = courseUnitsRepository;
        }

        public void SaveChanges()
        {
            _contextScope.Commit();
        }
    }
}
