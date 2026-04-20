using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autoflow.Migrations
{
    /// <inheritdoc />
    public partial class removeCarDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarDescription",
                table: "Carshop");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CarDescription",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
