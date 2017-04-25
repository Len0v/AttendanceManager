using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceManager.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using AttendanceManager.Core.Interfaces.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AttendanceManager.Controllers
{
    [Route("api/[controller]")]
    public class AttendeesController : Controller
    {
        private IAttendaceService _attendanceService;

        public AttendeesController(IAttendaceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Attendee> Get()
        {
            return _attendanceService.GetAllAttendees();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Attendee Get(int id)
        {
            return _attendanceService.GetAttendee(id);
        }
    }
}
