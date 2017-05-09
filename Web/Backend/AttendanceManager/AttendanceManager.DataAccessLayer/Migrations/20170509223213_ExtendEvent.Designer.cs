using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AttendanceManager.DataAccessLayer.DbContext;
using AttendanceManager.Core.Enums;

namespace AttendanceManager.DataAccessLayer.Migrations
{
    [DbContext(typeof(AttendanceManagerContext))]
    [Migration("20170509223213_ExtendEvent")]
    partial class ExtendEvent
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AttendanceManager.Core.Entities.Attendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("AttendeeId");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("CardNumber");

                    b.Property<bool>("IsStudent");

                    b.Property<string>("Name");

                    b.Property<string>("Pesel");

                    b.Property<int>("Sex");

                    b.Property<string>("StudentNumber");

                    b.Property<string>("Surname");

                    b.HasKey("Id");

                    b.ToTable("Attendees");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("CourseId");

                    b.Property<string>("CourseName");

                    b.Property<int>("ECTS");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.CourseAuthorizedAttendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("CourseAuthorizedAttendeeId");

                    b.Property<int>("AttendeeId");

                    b.Property<int>("CourseUnitId");

                    b.HasKey("Id");

                    b.HasIndex("AttendeeId");

                    b.HasIndex("CourseUnitId");

                    b.ToTable("CourseAuthorizedAttendees");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.CourseType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("CourseTypeId");

                    b.Property<int>("HoursNumber");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("CourseTypes");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.CourseUnit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("CourseUnitId");

                    b.Property<int>("CourseId");

                    b.Property<int>("CourseTypeId");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("CourseTypeId");

                    b.ToTable("CourseUnits");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("EventId");

                    b.Property<int?>("CourseUnitId");

                    b.Property<int?>("CycleIntervalWeekNumber");

                    b.Property<DateTime>("Date");

                    b.Property<int>("EventStatus");

                    b.Property<bool>("IsCyclical");

                    b.Property<bool>("IsRestricted");

                    b.Property<int>("LecturerId");

                    b.Property<string>("Name");

                    b.Property<int>("RoomId");

                    b.Property<int>("TimeSlotId");

                    b.HasKey("Id");

                    b.HasIndex("CourseUnitId");

                    b.HasIndex("LecturerId");

                    b.HasIndex("RoomId");

                    b.HasIndex("TimeSlotId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.EventAttendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("EventAttendeeId");

                    b.Property<int>("AttendeeId");

                    b.Property<int>("EventId");

                    b.HasKey("Id");

                    b.HasIndex("AttendeeId");

                    b.HasIndex("EventId");

                    b.ToTable("EventAttendees");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.EventAuthorizedAttendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("EventAuthorizedAttendeeId");

                    b.Property<int>("AttendeeId");

                    b.Property<int>("EventId");

                    b.HasKey("Id");

                    b.HasIndex("AttendeeId");

                    b.HasIndex("EventId");

                    b.ToTable("EventAuthorizedAttendees");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.Lecturer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("LecturerId");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("EmployeeNumber");

                    b.Property<string>("Name");

                    b.Property<string>("Pesel");

                    b.Property<int>("Sex");

                    b.Property<string>("Surname");

                    b.HasKey("Id");

                    b.ToTable("Lecturers");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("RoomId");

                    b.Property<string>("Building");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.TimeSlot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("TimeSlotId");

                    b.Property<DateTime>("BeginTime");

                    b.Property<string>("DayOfWeek");

                    b.Property<DateTime>("EndTime");

                    b.HasKey("Id");

                    b.ToTable("TimeSlots");
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.CourseAuthorizedAttendee", b =>
                {
                    b.HasOne("AttendanceManager.Core.Entities.Attendee", "Attendee")
                        .WithMany()
                        .HasForeignKey("AttendeeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AttendanceManager.Core.Entities.CourseUnit", "CourseUnit")
                        .WithMany()
                        .HasForeignKey("CourseUnitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.CourseUnit", b =>
                {
                    b.HasOne("AttendanceManager.Core.Entities.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AttendanceManager.Core.Entities.CourseType", "CourseType")
                        .WithMany()
                        .HasForeignKey("CourseTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.Event", b =>
                {
                    b.HasOne("AttendanceManager.Core.Entities.CourseUnit", "CourseUnit")
                        .WithMany()
                        .HasForeignKey("CourseUnitId");

                    b.HasOne("AttendanceManager.Core.Entities.Lecturer", "Lecturer")
                        .WithMany()
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AttendanceManager.Core.Entities.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AttendanceManager.Core.Entities.TimeSlot", "TimeSlot")
                        .WithMany()
                        .HasForeignKey("TimeSlotId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.EventAttendee", b =>
                {
                    b.HasOne("AttendanceManager.Core.Entities.Attendee", "Attendee")
                        .WithMany()
                        .HasForeignKey("AttendeeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AttendanceManager.Core.Entities.Event", "Event")
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AttendanceManager.Core.Entities.EventAuthorizedAttendee", b =>
                {
                    b.HasOne("AttendanceManager.Core.Entities.Attendee", "Attendee")
                        .WithMany()
                        .HasForeignKey("AttendeeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AttendanceManager.Core.Entities.Event", "Event")
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
