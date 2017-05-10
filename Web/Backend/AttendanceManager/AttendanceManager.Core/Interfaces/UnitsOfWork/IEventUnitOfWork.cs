using System;
using System.Collections.Generic;
using System.Text;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;

namespace AttendanceManager.Core.Interfaces.UnitsOfWork
{
    public interface IEventUnitOfWork
    {
        IRepository<Event> EventsRepository { get; set; }
        IRepository<TimeSlot> TimeSlotsRepository { get; set; }
        IRepository<Room> RoomsRepository { get; set; }
        IRepository<Lecturer> LecturersRepository { get; set; }
        IRepository<CourseUnit> CourseUnitsRepository { get; set; }
        void SaveChanges();
    }
}
