using AMDotNet.Helpers;
using System;

namespace AMDotNet.Models
{
    public class User
    { 
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Enums.Sex Sex { get; set; }
        public DateTime BirthDate { get; set; }
        public string Pesel { get; set; }
        public bool IsStudent { get; set; }
        public string StudentNumber { get; set; }
        public string CardNumber { get; set; }

        public User(ElectronicStudentCardData data)
        {
            Id = data.Id;
            Name = data.FirstName;
            Pesel = data.PersonalNo;
            StudentNumber = data.MatriculaNo;
            CardNumber = data.SerialNumber;
            IsStudent = (DateTime.Now < data.ValidUntil) ? true : false;
            BirthDate = getBirthDate(data.PersonalNo);
            Sex = getSex(data.PersonalNo);
        }

        private DateTime getBirthDate(string personalNo)
        {            
            int year = Int16.Parse(personalNo.Substring(0, 2));
            int month = (year < 90) ? Int16.Parse(personalNo.Substring(2, 2)) - 20 : int.Parse(personalNo.Substring(2, 2));
            int day = Int16.Parse(personalNo.Substring(4, 2));
            return new DateTime(year, month, day);            
        }        

        private Enums.Sex getSex(string personalNo)
        {
            return (Int16.Parse(personalNo.Substring(personalNo.Length - 1, 1)) % 2 == 0) ? Enums.Sex.Female : Enums.Sex.Male;
        }
    }
}
