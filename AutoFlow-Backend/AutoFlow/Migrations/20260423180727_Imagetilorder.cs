using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autoflow.Migrations
{
    /// <inheritdoc />
    public partial class Imagetilorder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Order");
        }
    }
}
