using System;

namespace AttendanceManagerClient.Models
{
    public class FacebookEvent
    {
        public string id { get; set; }
        public string location { get; set; }
        public string name { get; set; }
        public DateTime start_time { get; set; }
        public string timezone { get; set; }
        public DateTime end_time { get; set; }
    }
}
