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
    public class CourseUnitsController : Controller
    {
        private IEventsService _eventsService;

        public CourseUnitsController(IEventsService eventsService)
        {
            _eventsService = eventsService;
        }

        [HttpGet]
        public IEnumerable<CourseUnit> Get()
        {
            return _eventsService.GetCourseUnits().OrderBy(cu => cu.Course.CourseName);
        }

        [HttpGet("{id}")]
        public CourseUnit Get(int id)
        {
            return _eventsService.GetCourseUnit(id);
        }
    }
}
