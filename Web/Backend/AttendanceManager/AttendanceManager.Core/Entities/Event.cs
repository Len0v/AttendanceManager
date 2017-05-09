using System;
using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.Core.Entities
{
    public class Event : IEntity
    {
        [Column("EventId")]
        public int Id { get; set; }
        public Enums.Enums.EventStatus EventStatus { get; set; }
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
}
