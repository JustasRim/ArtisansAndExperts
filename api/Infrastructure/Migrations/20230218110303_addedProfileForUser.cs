using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedProfileForUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileSrc",
                table: "Expert");

            migrationBuilder.AddColumn<string>(
                name: "ProfileSrc",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileSrc",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "ProfileSrc",
                table: "Expert",
                type: "text",
                nullable: true);
        }
    }
}
