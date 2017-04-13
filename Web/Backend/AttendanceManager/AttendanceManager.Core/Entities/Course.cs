using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AttendanceManager.Core.Interfaces;

namespace AttendanceManager.Core.Entities
{
    public class Course : IEntity
    {
        [Column("CourseId")]
        public int Id { get; set; }
        public string CourseName { get; set; }
        public int ECTS { get; set; }
    }
}
