using System;

namespace SmartCardPCL
{
    public class ElectronicStudentCardData
    {
        public string EditionNo { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MatriculaNo { get; set; }
        public string PersonalNo { get; set; }
        public string SerialNumber { get; set; }
        public string UniversityName { get; set; }
        public DateTime ValidUntil { get; set; }
        public int Version { get; set; }
        public string Nationality { get; set; }

        public override string ToString()
        {
            return string.Format(@"Numer seryjny układu {0}
Uczelnia             {1}
Nazwisko studenta    {2}
Imię studenta        {3}
Drugie imię          {4}
Numer indeksu        {5}
Numer edycji         {6}
PESEL                {7}
Data ważności ELS    {8}
Obywatelstwo         {9}",
                SerialNumber, UniversityName, LastName, FirstName, MiddleName, MatriculaNo, EditionNo, PersonalNo,
                ValidUntil, Nationality);
        }
    }
}