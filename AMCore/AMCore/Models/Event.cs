using AMCore.Helpers;
using System;

namespace AMCore.Models
{
    public class Event
    {
        public int Id { get; set; }
        public EventStatus EventStatus { get; set; }
        public bool IsCyclical { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
        public int TimeSlotId { get; set; }
        public TimeSlot TimeSlot { get; set; }
        public int? CourseUnitId { get; set; }
        public CourseUnit CourseUnit { get; set; }
        public int LecturerId { get; set; }
        public Lecturer Lecturer { get; set; }
        public bool IsRestricted { get; set; }
        public int? CycleIntervalWeekNumber { get; set; }
    }

    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Building { get; set; }
    }

    public class TimeSlot
    {
        public int Id { get; set; }
        public DateTime BeginTime { get; set; }
        public DateTime EndTime { get; set; }
        public string DayOfWeek { get; set; }
    }

    public class CourseUnit
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int CourseTypeId { get; set; }
        public CourseType CourseType { get; set; }
    }

    public class Lecturer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Enums.Sex Sex { get; set; }
        public DateTime BirthDate { get; set; }
        public string Pesel { get; set; }
        public string EmployeeNumber { get; set; }
    }

    public class Course
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public int ECTS { get; set; }
    }

    public class CourseType
    {
        public int Id { get; set; }
        public Enums.ClassType Type { get; set; }
        public int HoursNumber { get; set; }
    }

    public enum EventStatus
    {
        Incoming,
        Active,
        Expired
    }
}
