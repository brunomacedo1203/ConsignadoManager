using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaAtivoComoTrue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "DECIMAL(18, 2)",
                nullable: false,
                defaultValue: true, 
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "DECIMAL(18, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");
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
        }
    }
}
