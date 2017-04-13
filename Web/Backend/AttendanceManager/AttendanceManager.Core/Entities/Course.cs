using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

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
