using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AttendanceManager.DataAccessLayer.Migrations
{
    public partial class ExtendEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseUnits_Lecturers_LecturerId",
                table: "CourseUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_CourseUnits_CourseUnitId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_CourseUnits_LecturerId",
                table: "CourseUnits");

            migrationBuilder.DropColumn(
                name: "Day",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "LecturerId",
                table: "CourseUnits");

            migrationBuilder.RenameColumn(
                name: "NextDate",
                table: "Events",
                newName: "Date");

            migrationBuilder.AddColumn<string>(
                name: "DayOfWeek",
                table: "TimeSlots",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CourseUnitId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "CycleIntervalWeekNumber",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsRestricted",
                table: "Events",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "LecturerId",
                table: "Events",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Attendees",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CourseAuthorizedAttendees",
                columns: table => new
                {
                    CourseAuthorizedAttendeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AttendeeId = table.Column<int>(nullable: false),
                    CourseUnitId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseAuthorizedAttendees", x => x.CourseAuthorizedAttendeeId);
                    table.ForeignKey(
                        name: "FK_CourseAuthorizedAttendees_Attendees_AttendeeId",
                        column: x => x.AttendeeId,
                        principalTable: "Attendees",
                        principalColumn: "AttendeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseAuthorizedAttendees_CourseUnits_CourseUnitId",
                        column: x => x.CourseUnitId,
                        principalTable: "CourseUnits",
                        principalColumn: "CourseUnitId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventAuthorizedAttendees",
                columns: table => new
                {
                    EventAuthorizedAttendeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AttendeeId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventAuthorizedAttendees", x => x.EventAuthorizedAttendeeId);
                    table.ForeignKey(
                        name: "FK_EventAuthorizedAttendees_Attendees_AttendeeId",
                        column: x => x.AttendeeId,
                        principalTable: "Attendees",
                        principalColumn: "AttendeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventAuthorizedAttendees_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_LecturerId",
                table: "Events",
                column: "LecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseAuthorizedAttendees_AttendeeId",
                table: "CourseAuthorizedAttendees",
                column: "AttendeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseAuthorizedAttendees_CourseUnitId",
                table: "CourseAuthorizedAttendees",
                column: "CourseUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_EventAuthorizedAttendees_AttendeeId",
                table: "EventAuthorizedAttendees",
                column: "AttendeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EventAuthorizedAttendees_EventId",
                table: "EventAuthorizedAttendees",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_CourseUnits_CourseUnitId",
                table: "Events",
                column: "CourseUnitId",
                principalTable: "CourseUnits",
                principalColumn: "CourseUnitId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Lecturers_LecturerId",
                table: "Events",
                column: "LecturerId",
                principalTable: "Lecturers",
                principalColumn: "LecturerId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_CourseUnits_CourseUnitId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Lecturers_LecturerId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "CourseAuthorizedAttendees");

            migrationBuilder.DropTable(
                name: "EventAuthorizedAttendees");

            migrationBuilder.DropIndex(
                name: "IX_Events_LecturerId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "TimeSlots");

            migrationBuilder.DropColumn(
                name: "CycleIntervalWeekNumber",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "IsRestricted",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "LecturerId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Attendees");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Events",
                newName: "NextDate");

            migrationBuilder.AlterColumn<int>(
                name: "CourseUnitId",
                table: "Events",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Day",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LecturerId",
                table: "CourseUnits",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CourseUnits_LecturerId",
                table: "CourseUnits",
                column: "LecturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseUnits_Lecturers_LecturerId",
                table: "CourseUnits",
                column: "LecturerId",
                principalTable: "Lecturers",
                principalColumn: "LecturerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_CourseUnits_CourseUnitId",
                table: "Events",
                column: "CourseUnitId",
                principalTable: "CourseUnits",
                principalColumn: "CourseUnitId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
