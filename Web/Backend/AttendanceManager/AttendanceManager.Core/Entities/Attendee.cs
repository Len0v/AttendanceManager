using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AttendanceManager.Core.Interfaces;

namespace AttendanceManager.Core.Entities
{
    public class Attendee : IEntity, IPerson
    {
        [Column("AttendeeId")]
        public int Id { get; set; }
        public string Name{ get; set; }
        public string Surname { get; set; }
        public Enums.Enums.Sex Sex { get; set; }
        public DateTime BirthDate { get; set; }
        public string Pesel{ get; set; }
        public bool IsStudent { get; set; }
        public string StudentNumber { get; set; }
    }
}
