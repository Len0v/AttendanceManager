using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using AttendanceManager.Core.Interfaces.Entities;

namespace AttendanceManager.DataAccessLayer.DbContext
{
    public class AttendanceManagerContext : Microsoft.EntityFrameworkCore.DbContext, IAttendanceManagerContext
    {
        public DbSet<Attendee> Attendees { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseType> CourseTypes { get; set; }
        public DbSet<CourseUnit> CourseUnits { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventAttendee> EventAttendees { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }

        public AttendanceManagerContext(DbContextOptions<AttendanceManagerContext> options) : base(options)
        {
        }

        public EntityEntry<IEntity> Entry(IEntity entity)
        {
            return base.Entry(entity);
        }

        public void SaveChanges()
        {
            base.SaveChanges();
        }
    }
}
