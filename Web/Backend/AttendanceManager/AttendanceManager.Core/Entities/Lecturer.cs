using System;
using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.Core.Entities
{
    public class Lecturer : IEntity, IPerson
    {
        [Column("LecturerId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Enums.Enums.Sex Sex { get; set; }
        public DateTime BirthDate { get; set; }
        public string Pesel { get; set; }
        public string EmployeeNumber { get; set; }
    }
}
