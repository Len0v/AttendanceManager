using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Enums;
using AttendanceManager.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AttendanceManager.Controllers
{
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        private IAttendaceService _attendanceService;

        public EventsController(IAttendaceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            return _attendanceService.GetAllEvents();
        }

        [Route("TimeRange")]
        public IEnumerable<Event> TimeRange(DateTime begin, DateTime end)
        {
            return _attendanceService.GetEventsForTimeRange(begin, end);
        }

        [Route("Incoming")]
        public IEnumerable<Event> Incoming()
        {
            return _attendanceService.GetEventsForQuery(e => e.EventStatus == Enums.EventStatus.Incoming);
        }

        [Route("Active")]
        public IEnumerable<Event> Active()
        {
            return _attendanceService.GetEventsForQuery(e => e.EventStatus == Enums.EventStatus.Active);
        }

        [Route("Expired")]
        public IEnumerable<Event> Expired()
        {
            return _attendanceService.GetEventsForQuery(e => e.EventStatus == Enums.EventStatus.Expired);
        }

        [Route("Filter")]
        public IEnumerable<Event> Filter(string filter)
        {
            return _attendanceService.GetEventsForQuery(e => e.Name.Contains(filter));
        }

        [HttpGet("{id:int}")]
        public Event Get(int id)
        {
            return _attendanceService.GetEvent(id);
        }

        [HttpPost]
        public void Add([FromBody]Event newEvent)
        {
            _attendanceService.AddEvent(newEvent);
        }

        [HttpPut("{id}")]
        public void Edit(int id, [FromBody]Event editedEvent)
        {
            _attendanceService.ModifyEvent(editedEvent);
        }

        [HttpDelete("{id:int}")]
        public void Delete(int id)
        {
            var eventToDelete = _attendanceService.GetEvent(id);
            _attendanceService.DeleteEvent(eventToDelete);
        }
    }
}
