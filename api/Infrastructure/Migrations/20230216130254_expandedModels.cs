using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class expandedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FkExpert",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CientId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExpertId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsBanned",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Activity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Client_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Expert",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProfileSrc = table.Column<string>(type: "text", nullable: true),
                    WorkDescription = table.Column<string>(type: "text", nullable: true),
                    MobilePhone = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Radius = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expert", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expert_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ClientId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Project_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityExpert",
                columns: table => new
                {
                    ActivitiesId = table.Column<int>(type: "integer", nullable: false),
                    ExpertsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityExpert", x => new { x.ActivitiesId, x.ExpertsId });
                    table.ForeignKey(
                        name: "FK_ActivityExpert_Activity_ActivitiesId",
                        column: x => x.ActivitiesId,
                        principalTable: "Activity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityExpert_Expert_ExpertsId",
                        column: x => x.ExpertsId,
                        principalTable: "Expert",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Source = table.Column<string>(type: "text", nullable: true),
                    ProjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Image_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Offer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    ProjectId = table.Column<int>(type: "integer", nullable: false),
                    ExpertId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offer_Expert_ExpertId",
                        column: x => x.ExpertId,
                        principalTable: "Expert",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Offer_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OfferStep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Details = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    OfferId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferStep_Offer_OfferId",
                        column: x => x.OfferId,
                        principalTable: "Offer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityExpert_ExpertsId",
                table: "ActivityExpert",
                column: "ExpertsId");

            migrationBuilder.CreateIndex(
                name: "IX_Client_UserId",
                table: "Client",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Expert_UserId",
                table: "Expert",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Image_ProjectId",
                table: "Image",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Offer_ExpertId",
                table: "Offer",
                column: "ExpertId");

            migrationBuilder.CreateIndex(
                name: "IX_Offer_ProjectId",
                table: "Offer",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferStep_OfferId",
                table: "OfferStep",
                column: "OfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_ClientId",
                table: "Project",
                column: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityExpert");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "OfferStep");

            migrationBuilder.DropTable(
                name: "Activity");

            migrationBuilder.DropTable(
                name: "Offer");

            migrationBuilder.DropTable(
                name: "Expert");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropColumn(
                name: "CientId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ExpertId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsBanned",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<int>(
                name: "FkExpert",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
