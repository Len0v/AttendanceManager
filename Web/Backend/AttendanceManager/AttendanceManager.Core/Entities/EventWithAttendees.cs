using System;
using System.Collections.Generic;
using System.Text;

namespace AttendanceManager.Core.Entities
{
    public class EventWithAttendees
    {
        public Event Event { get; set; }
        public IEnumerable<Attendee> AuthorizedAttendees { get; set; }
    }
}
