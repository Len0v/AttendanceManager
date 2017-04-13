using AttendanceManager.Core.Infrastructure;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;
using AttendanceManager.Core.Interfaces.UnitsOfWork;

namespace AttendanceManager.BusinessLogic.UnitsOfWork
{
    public class AttendanceUnitOfWork :IAttendanceUnitOfWork
    {
        private ContextScope _contextScope;
        public IRepository<Attendee> AttendeesRepository { get; set; }

        //TODO Add rest of the repositories

        public AttendanceUnitOfWork(IRepository<Attendee> attendeesRepository,  IAttendanceManagerContext dbContext)
        {
            AttendeesRepository = attendeesRepository;
            _contextScope = new ContextScope(dbContext);
        }
    
        public void SaveChanges()
        {
            _contextScope.Commit();
        }
    }
}
