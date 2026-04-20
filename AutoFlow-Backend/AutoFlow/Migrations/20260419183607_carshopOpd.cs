using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autoflow.Migrations
{
    /// <inheritdoc />
    public partial class carshopOpd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Afgift",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fuel",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Geartype",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Horsepower",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Km",
                table: "Carshop",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TopSpeed",
                table: "Carshop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Afgift",
                table: "Carshop");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Carshop");

            migrationBuilder.DropColumn(
                name: "Fuel",
                table: "Carshop");

            migrationBuilder.DropColumn(
                name: "Geartype",
                table: "Carshop");

            migrationBuilder.DropColumn(
                name: "Horsepower",
                table: "Carshop");

            migrationBuilder.DropColumn(
                name: "Km",
                table: "Carshop");

            migrationBuilder.DropColumn(
                name: "TopSpeed",
                table: "Carshop");
        }
    }
}
