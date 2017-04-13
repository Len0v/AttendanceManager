using AttendanceManager.Core.Interfaces.DAL;

namespace AttendanceManager.Core.Infrastructure
{
    public class ContextScope
    {
        private readonly IAttendanceManagerContext _dbContext;
        public ContextScope(IAttendanceManagerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }
    }
}
