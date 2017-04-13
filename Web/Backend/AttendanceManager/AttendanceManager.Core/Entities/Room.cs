using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AttendanceManager.Core.Interfaces;

namespace AttendanceManager.Core.Entities
{
    public class Room : IEntity
    {
        [Column("RoomId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Building { get; set; }
    }
}
