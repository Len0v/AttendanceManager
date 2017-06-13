using System;
using Newtonsoft.Json;

namespace AMDotNet.Models
{
    public class ElectronicStudentCardData
    {
        public string Id { get; set; }
        public string EditionNo { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MatriculaNo { get; set; }
        public string PersonalNo { get; set; }
        public string SerialNumber { get; set; }
        public string UniversityName { get; set; }
        public DateTime ValidUntil { get; set; }
        [JsonProperty(PropertyName = "CardVersion")]
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
                SerialNumber, UniversityName, LastName, FirstName, MiddleName.Remove('\0'), MatriculaNo, EditionNo, PersonalNo,
                ValidUntil, Nationality);
        }

        public static implicit operator ElectronicStudentCardData(SmartCardPCL.ElectronicStudentCardData data)
        {
            return new ElectronicStudentCardData()
            {
                EditionNo = data.EditionNo,
                LastName = data.LastName,
                FirstName = data.FirstName,
                MiddleName = data.MiddleName,
                MatriculaNo = data.MatriculaNo,
                PersonalNo = data.PersonalNo,
                Nationality = data.Nationality,
                SerialNumber = data.SerialNumber,
                UniversityName = data.UniversityName,
                ValidUntil = data.ValidUntil,
                Version = data.Version,
                Id = Guid.NewGuid().ToString()
            };
        }
    }
}