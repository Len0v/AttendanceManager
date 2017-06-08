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
    public class EventAuthorizedController : Controller
    {
        private IAttendaceService _attendaceService;
        public EventAuthorizedController(IAttendaceService attendaceService)
        {
            _attendaceService = attendaceService;
        }

        [HttpGet("{id:int}")]
        public IEnumerable<Attendee> Get(int id)
        {
            return _attendaceService.GetAuthorizedAttendeesForEvent(id).OrderBy(a => a.Surname);
        }

        [HttpPost]
        public void Post([FromBody]EventAuthorizedAttendee attendee)
        {
            _attendaceService.AddEventAuthorizedAttendee(attendee);
        }

        [HttpDelete]
        public void Delete([FromBody]EventAuthorizedAttendee attendee)
        {
            _attendaceService.DeleteEventAuthorizedAttendee(attendee);
        }
    }
}
