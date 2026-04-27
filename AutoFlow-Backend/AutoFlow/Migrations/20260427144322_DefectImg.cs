using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autoflow.Migrations
{
    /// <inheritdoc />
    public partial class DefectImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefectImg",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefectImg",
                table: "Bookings");
        }
    }
}
