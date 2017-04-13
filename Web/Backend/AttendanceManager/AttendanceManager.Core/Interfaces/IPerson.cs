using System;
using System.Collections.Generic;
using System.Text;

namespace AttendanceManager.Core.Interfaces
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
