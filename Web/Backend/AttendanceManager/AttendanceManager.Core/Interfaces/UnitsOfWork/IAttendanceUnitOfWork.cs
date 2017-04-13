using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;

namespace AttendanceManager.Core.Interfaces.UnitsOfWork
{
    public interface IAttendanceUnitOfWork
    {
        IRepository<Attendee> AttendeesRepository { get; set; }
        void SaveChanges();
    }
}
