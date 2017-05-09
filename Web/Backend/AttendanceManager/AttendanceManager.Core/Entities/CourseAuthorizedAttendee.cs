using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.Core.Entities
{
    public class CourseAuthorizedAttendee :IEntity
    {
        [Column("CourseAuthorizedAttendeeId")]
        public int Id { get; set; }
        public int AttendeeId { get; set; }
        public Attendee Attendee { get; set; }
        public int CourseUnitId { get; set; }
        public CourseUnit CourseUnit { get; set; }
    }
}
