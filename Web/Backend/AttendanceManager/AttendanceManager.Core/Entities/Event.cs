using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.Core.Entities
{
    public class Event : IEntity
    {
        [Column("EventId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
        public int TimeSlotId { get; set; }
        public TimeSlot TimeSlot { get; set; }
        public int CourseUnitId { get; set; }
        public CourseUnit CourseUnit { get; set; }

    }
}
