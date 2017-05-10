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
    public class LecturersController : Controller
    {
        private IEventsService _eventsService;

        public LecturersController(IEventsService eventsService)
        {
            _eventsService = eventsService;
        }

        [HttpGet]
        public IEnumerable<Lecturer> Get()
        {
            return _eventsService.GetLecturers();
        }

        [HttpGet("{id}")]
        public Lecturer Get(int id)
        {
            return _eventsService.GetLecturer(id);
        }
    }
}
