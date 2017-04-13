using System.ComponentModel.DataAnnotations.Schema;
using AttendanceManager.Core.Interfaces.Entities;

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
