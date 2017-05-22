using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;

namespace AttendanceManager.Core.Interfaces.UnitsOfWork
{
    public interface IAttendanceUnitOfWork
    {
        IRepository<Attendee> AttendeesRepository { get; set; }
        IRepository<EventAttendee> EventAttendeesRepository { get; set; }
        IRepository<Event> EventsRepository { get; set; }
        IRepository<EventAuthorizedAttendee> EventAuthorizedAttendeesRepository { get; set; }
        void SaveChanges();
    }
}
