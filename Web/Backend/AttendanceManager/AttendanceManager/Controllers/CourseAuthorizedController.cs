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
    public class CourseAuthorizedController : Controller
    {
        private IAttendaceService _attendaceService;
        public CourseAuthorizedController(IAttendaceService attendaceService)
        {
            _attendaceService = attendaceService;
        }

        [HttpGet("{id:int}")]
        public IEnumerable<Attendee> Get(int id)
        {
            return _attendaceService.GetAuthorizedAttendeesForCourse(id).OrderBy(a => a.Surname);
        }

        [HttpPost]
        public void Post([FromBody]CourseAuthorizedAttendee attendee)
        {
            _attendaceService.AddCourseAuthorizedAttendee(attendee);
        }

        [HttpDelete]
        public void Delete([FromBody]CourseAuthorizedAttendee attendee)
        {
            _attendaceService.DeleteCourseAuthorizedAttendee(attendee);
        }
    }
}
