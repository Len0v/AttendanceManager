using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

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
