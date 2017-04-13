using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace AttendanceManager.Core.Interfaces.DAL
{
    public interface IAttendanceManagerContext
    {
        DbSet<Attendee> Attendees { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<CourseType> CourseTypes { get; set; }
        DbSet<CourseUnit> CourseUnits { get; set; }
        DbSet<Event> Events { get; set; }
        DbSet<EventAttendee> EventAttendees { get; set; }
        DbSet<Lecturer> Lecturers { get; set; }
        DbSet<Room> Rooms { get; set; }
        DbSet<TimeSlot> TimeSlots { get; set; }

        DbSet<IEntity> Set<IEntity>() where IEntity : class;
        EntityEntry<IEntity> Entry(IEntity entity);
        void SaveChanges();
    }
}
