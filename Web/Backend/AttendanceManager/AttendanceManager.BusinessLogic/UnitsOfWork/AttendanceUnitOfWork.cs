using System.Collections.Generic;
using AttendanceManager.Core.Infrastructure;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;
using AttendanceManager.Core.Interfaces.UnitsOfWork;
using Remotion.Linq.Parsing.Structure.IntermediateModel;

namespace AttendanceManager.BusinessLogic.UnitsOfWork
{
    public class AttendanceUnitOfWork :IAttendanceUnitOfWork
    {
        private ContextScope _contextScope;
        public IRepository<Attendee> AttendeesRepository { get; set; }
        public IRepository<EventAttendee> EventAttendeesRepository { get; set; }
        public IRepository<Event> EventsRepository { get; set; }

        public AttendanceUnitOfWork(IRepository<Attendee> attendeesRepository, 
               IRepository<EventAttendee> eventAtendeesRepository,
               IRepository<Event> eventsRepository,
               IAttendanceManagerContext dbContext)
        {
            AttendeesRepository = attendeesRepository;
            EventsRepository = eventsRepository;
            EventAttendeesRepository = eventAtendeesRepository;
            _contextScope = new ContextScope(dbContext);
        }
    
        public void SaveChanges()
        {
            _contextScope.Commit();
        }
    }
}
