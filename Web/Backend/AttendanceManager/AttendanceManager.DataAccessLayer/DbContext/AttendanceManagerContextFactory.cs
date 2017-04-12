using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace AttendanceManager.DataAccessLayer.DbContext
{
    public class AttendanceManagerContextFactory : IDbContextFactory<AttendanceManagerContext>
    {
        public AttendanceManagerContext Create(DbContextFactoryOptions options)
        {
            var builder = new DbContextOptionsBuilder<AttendanceManagerContext>();
            builder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=AttendanceManagerLocalDb;Trusted_Connection=True;MultipleActiveResultSets=true");
            return new AttendanceManagerContext(builder.Options);
        }
    }
}
