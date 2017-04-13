using System;

namespace AttendanceManager.Core.Interfaces.Entities
{
    interface IPerson
    {
        string Name { get; set; }
        string Surname { get; set; }
        Enums.Enums.Sex Sex { get; set; }
        DateTime BirthDate { get; set; }
        string Pesel { get; set; }
    }
}
