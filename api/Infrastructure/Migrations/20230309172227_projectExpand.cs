using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class projectExpand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActivityId",
                table: "Projects",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Projects",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TimeLine",
                table: "Projects",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ActivityId",
                table: "Projects",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Activities_ActivityId",
                table: "Projects",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Activities_ActivityId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ActivityId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TimeLine",
                table: "Projects");
        }
    }
}
