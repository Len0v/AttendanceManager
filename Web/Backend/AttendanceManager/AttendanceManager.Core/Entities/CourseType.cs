using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

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
