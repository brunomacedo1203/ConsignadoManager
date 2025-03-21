using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    /// <inheritdoc />
    public partial class usuarioTabela : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nome = table.Column<string>(type: "NVARCHAR2(250)", nullable: false),  // Tamanho reduzido
                    Email = table.Column<string>(type: "NVARCHAR2(250)", nullable: false), // Tamanho reduzido
                    PasswordHash = table.Column<byte[]>(type: "RAW(512)", nullable: false), // Tamanho ajustado
                    PasswordSalt = table.Column<byte[]>(type: "RAW(512)", nullable: false) // Tamanho ajustado
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
