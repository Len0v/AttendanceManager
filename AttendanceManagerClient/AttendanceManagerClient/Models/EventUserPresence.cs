using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceManagerClient.Models
{
    public class EventUserPresence
    {
        public FbElsConnector User { get; set; }
        public FbEvent FbEvent { get; set; }
    }

    public class FbEvent
    {
        public string Id { get; set; }
        public string FacebookId { get; set; }
        public string location { get; set; }
        public string name { get; set; }
        public DateTime start_time { get; set; }
        public string timezone { get; set; }
        public DateTime end_time { get; set; }
    }

    public class FbElsConnector
    {
        public string id { get; set; }
        public ElectronicStudentCardData ElectronicStudentCard { get; set; }
        public FbUser FbUser { get; set; }
        public ListUser ListUser { get; set; }

        public bool HasName(string name)
        {
            if (ElectronicStudentCard != null)
            {
                var fullname = ElectronicStudentCard.FirstName + " " + ElectronicStudentCard.LastName;
                if (fullname.ToLower().Contains(name.ToLower()))
                    return true;
            }
            if (FbUser != null)
            {
                if (FbUser.name.ToLower().Contains(name.ToLower()))
                    return true;
            }
            if (ListUser != null)
            {
                var fullname = ListUser.FirstName + " " + ListUser.LastName;
                if (fullname.ToLower().Contains(name.ToLower()))
                    return true;
            }
            return false;
        }

        public string Name
        {
            get
            {
                if (ElectronicStudentCard != null)
                {
                    return ElectronicStudentCard.FirstName + " " + ElectronicStudentCard.LastName;
                }
                if (FbUser != null)
                {
                    return FbUser.name;
                }
                if (ListUser != null)
                {
                    return ListUser.FirstName + " " + ListUser.LastName;
                }
                return "No name";
            }
        }
    }

    public class ListUser
    {
        public string id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
