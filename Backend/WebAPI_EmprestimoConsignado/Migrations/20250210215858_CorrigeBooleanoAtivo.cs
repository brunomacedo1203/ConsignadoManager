using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    /// <inheritdoc />
    public partial class CorrigeBooleanoAtivo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "DECIMAL(18, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "DECIMAL(18, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AlterColumn<bool>(
                name: "Ativo",
                table: "Clientes",
                type: "NUMBER(1)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "DECIMAL(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18, 2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "DECIMAL(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18, 2)");

            migrationBuilder.AlterColumn<bool>(
                name: "Ativo",
                table: "Clientes",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "NUMBER(1)");
        }
    }
}
