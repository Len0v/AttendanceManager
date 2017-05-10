using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceManager.BusinessLogic.Services;
using AttendanceManager.Core.Entities;
using AttendanceManager.Core.Interfaces.DAL;
using AttendanceManager.Core.Interfaces.UnitsOfWork;
using AttendanceManager.DataAccessLayer.DbContext;
using AttendanceManager.DataAccessLayer.Repository;
using Microsoft.Extensions.DependencyInjection;
using AttendanceManager.BusinessLogic.UnitsOfWork;
using AttendanceManager.Core.Interfaces.Services;

namespace AttendanceManager.DI
{
    public static class CompositionRoot
    {
        public static void ConfigureDependencyInversion(IServiceCollection services)
        {
            services.AddScoped<IAttendanceManagerContext, AttendanceManagerContext>();

            services.AddTransient<IRepository<Attendee>, Repository<Attendee>>();
            services.AddTransient<IRepository<Event>, Repository<Event>>();
            services.AddTransient<IRepository<EventAttendee>, Repository<EventAttendee>>();
            services.AddTransient<IRepository<TimeSlot>, Repository<TimeSlot>>();
            services.AddTransient<IRepository<Room>, Repository<Room>>();
            services.AddTransient<IRepository<Lecturer>, Repository<Lecturer>>();
            services.AddTransient<IRepository<CourseUnit>, Repository<CourseUnit>>();
        
            services.AddTransient<IAttendanceUnitOfWork, AttendanceUnitOfWork>();
            services.AddTransient<IEventUnitOfWork, EventUnitOfWork>();

            services.AddTransient<IEventsService, EventService>();
            services.AddTransient<IAttendaceService, AttendanceService>();
        }
    }
}
