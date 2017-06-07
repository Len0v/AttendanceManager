using System;
using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.Core.Entities
{
    public class TimeSlot : IEntity
    {
        [Column("TimeSlotId")]
        public int Id { get; set; }
        public TimeSpan BeginTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string DayOfWeek { get; set; }
    }
}
