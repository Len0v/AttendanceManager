using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AttendanceManager.Core.Interfaces;

namespace AttendanceManager.Core.Entities
{
    public class CourseType : IEntity
    {
        [Column("CourseTypeId")]
        public int Id { get; set; }
        public Enums.Enums.ClassType Type { get; set; }
        public int HoursNumber { get; set; }
    }
}
