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
    public class TimeSlotsController : Controller
    {
        private IEventsService _eventsService;

        public TimeSlotsController(IEventsService eventsService)
        {
            _eventsService = eventsService;
        }

        [HttpGet]
        public IEnumerable<TimeSlot> Get()
        {
            return _eventsService.GetTimeSlots().OrderBy(ts => ts.BeginTime);
        }

        [HttpGet("{id}")]
        public TimeSlot Get(int id)
        {
            return _eventsService.GetTimeSlot(id);
        }
    }
}
