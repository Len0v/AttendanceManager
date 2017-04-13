using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.Core.Entities
{
    public class EventAttendee : IEntity
    {
        [Column("EventAttendeeId")]
        public int Id { get; set; }
        public int AttendeeId { get; set; }
        public Attendee Attendee { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
