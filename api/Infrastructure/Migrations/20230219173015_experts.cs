using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class experts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityExpert_Expert_ExpertsId",
                table: "ActivityExpert");

            migrationBuilder.DropForeignKey(
                name: "FK_Expert_Users_UserId",
                table: "Expert");

            migrationBuilder.DropForeignKey(
                name: "FK_Offer_Expert_ExpertId",
                table: "Offer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Expert",
                table: "Expert");

            migrationBuilder.RenameTable(
                name: "Expert",
                newName: "Experts");

            migrationBuilder.RenameIndex(
                name: "IX_Expert_UserId",
                table: "Experts",
                newName: "IX_Experts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Experts",
                table: "Experts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityExpert_Experts_ExpertsId",
                table: "ActivityExpert",
                column: "ExpertsId",
                principalTable: "Experts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Experts_Users_UserId",
                table: "Experts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offer_Experts_ExpertId",
                table: "Offer",
                column: "ExpertId",
                principalTable: "Experts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityExpert_Experts_ExpertsId",
                table: "ActivityExpert");

            migrationBuilder.DropForeignKey(
                name: "FK_Experts_Users_UserId",
                table: "Experts");

            migrationBuilder.DropForeignKey(
                name: "FK_Offer_Experts_ExpertId",
                table: "Offer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Experts",
                table: "Experts");

            migrationBuilder.RenameTable(
                name: "Experts",
                newName: "Expert");

            migrationBuilder.RenameIndex(
                name: "IX_Experts_UserId",
                table: "Expert",
                newName: "IX_Expert_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Expert",
                table: "Expert",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityExpert_Expert_ExpertsId",
                table: "ActivityExpert",
                column: "ExpertsId",
                principalTable: "Expert",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expert_Users_UserId",
                table: "Expert",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offer_Expert_ExpertId",
                table: "Offer",
                column: "ExpertId",
                principalTable: "Expert",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
