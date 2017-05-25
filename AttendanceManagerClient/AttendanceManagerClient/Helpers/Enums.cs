using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceManagerClient.Helpers
{
    public static class Enums
    {
        public enum Sex
        {
            Male,
            Female
        }

        public enum ClassType
        {
            Lecture,
            Laboratory,
            Exercises,
            Project,
            Seminars
        }

        public enum EventStatus
        {
            Incoming,
            Active,
            Expired
        }
    }
}
