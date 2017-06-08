using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AttendanceManager.Controllers
{
    [Route("api/[controller]")]
    public class EventAttendeesController : Controller
    {
        private IAttendaceService _attendaceService;

        public EventAttendeesController(IAttendaceService attendaceService)
        {
            _attendaceService = attendaceService;
        }

        [HttpGet("{id:int}")]
        public IEnumerable<Attendee> Get(int id)
        {
            return _attendaceService.GetAttendeesForEvent(id).OrderBy(a => a.Surname);
        }

        [HttpPost]
        public void AddToList([FromBody]EventAttendee eventAttendee)
        {
            _attendaceService.RegisterAttendance(eventAttendee);
        }

        [HttpDelete]
        public void Delete([FromBody]EventAttendee eventAttendee)
        {
            _attendaceService.DeleteAttendance(eventAttendee);
        }

        [HttpPost]
        [Route("Register")]
        public void Register([FromBody]Attendee attendee, int roomId)
        {
            _attendaceService.RegisterAttendance(attendee,roomId);
        }

    }
}
