using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AttendanceManager.Core.Interfaces;

namespace AttendanceManager.Core.Entities
{
    public class CourseUnit :IEntity
    {
        [Column("CourseUnitId")]
        public int Id { get; set; }
        public int LecturerId { get; set; }
        public Lecturer Lecturer { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int CourseTypeId { get; set; }
        public CourseType CourseType { get; set; }
    }
}
