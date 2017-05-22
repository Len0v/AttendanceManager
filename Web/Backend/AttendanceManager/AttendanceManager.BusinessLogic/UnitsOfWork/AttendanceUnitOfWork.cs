using System.Collections.Generic;
using AttendanceManager.Core.Infrastructure;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;
using AttendanceManager.Core.Interfaces.UnitsOfWork;
using Remotion.Linq.Parsing.Structure.IntermediateModel;
using System;

namespace AttendanceManager.BusinessLogic.UnitsOfWork
{
    public class AttendanceUnitOfWork :IAttendanceUnitOfWork
    {
        private ContextScope _contextScope;
        public IRepository<Attendee> AttendeesRepository { get; set; }
        public IRepository<EventAttendee> EventAttendeesRepository { get; set; }
        public IRepository<Event> EventsRepository { get; set; }
        public IRepository<EventAuthorizedAttendee> EventAuthorizedAttendeesRepository { get; set; }

        public AttendanceUnitOfWork(IRepository<Attendee> attendeesRepository, 
               IRepository<EventAttendee> eventAtendeesRepository,
               IRepository<Event> eventsRepository,
               IRepository<EventAuthorizedAttendee> eventAuthorizedAttendees, IAttendanceManagerContext dbContext)
        {
            AttendeesRepository = attendeesRepository;
            EventsRepository = eventsRepository;
            EventAttendeesRepository = eventAtendeesRepository;
            EventAuthorizedAttendeesRepository = eventAuthorizedAttendees; 
            _contextScope = new ContextScope(dbContext);
        }
    
        public void SaveChanges()
        {
            _contextScope.Commit();
        }
    }
}
