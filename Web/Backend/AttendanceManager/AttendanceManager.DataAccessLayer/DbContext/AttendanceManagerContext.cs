using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace AttendanceManager.DataAccessLayer.DbContext
{
    public class AttendanceManagerContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AttendanceManagerContext(DbContextOptions<AttendanceManagerContext> options) : base(options)
        {
        }
    }
}
