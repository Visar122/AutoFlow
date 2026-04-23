using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autoflow.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCardDetailsFromOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardHolder",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ExpiryDate",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Last4Digits",
                table: "Order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardHolder",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExpiryDate",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Last4Digits",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
