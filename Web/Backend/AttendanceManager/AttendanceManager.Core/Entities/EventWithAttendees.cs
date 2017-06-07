using System;
using System.Collections.Generic;
using System.Text;

namespace AttendanceManager.Core.Entities
{
    public class EventWithAttendees
    {
        public Event Event { get; set; }
        public int [] AuthorizedAttendeesIds { get; set; }
        public DateTime EventCycleEnd { get; set; }
    }
}
