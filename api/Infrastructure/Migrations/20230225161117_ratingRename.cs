using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ratingRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Experts",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Client",
                newName: "Rating");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Experts",
                newName: "Score");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Client",
                newName: "Score");
        }
    }
}
