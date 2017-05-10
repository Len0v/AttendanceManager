using System;
using System.Collections.Generic;
using System.Text;
using AttendanceManager.Core.Entities;

namespace AttendanceManager.Core.Interfaces.Services
{
    public interface IEventsService
    {
        IEnumerable<Room> GetRooms();
        Room GetRoom(int id);

        IEnumerable<Lecturer> GetLecturers();
        Lecturer GetLecturer(int id);

        IEnumerable<TimeSlot> GetTimeSlots();
        TimeSlot GetTimeSlot(int id);

        IEnumerable<CourseUnit> GetCourseUnits();
        CourseUnit GetCourseUnit(int id);
    }
}
