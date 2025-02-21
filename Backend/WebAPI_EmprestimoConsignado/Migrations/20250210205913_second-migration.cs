using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    public partial class secondmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "NUMBER(18,2)", // CORREÇÃO PARA ORACLE
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "NUMBER(18,2)", // CORREÇÃO PARA ORACLE
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "Clientes",
                type: "NUMBER(1)", // BOOLEAN NO ORACLE
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "Clientes");

            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "NUMBER(18,2)", // MANTENDO FORMATO ORACLE
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "NUMBER(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "NUMBER(18,2)", // MANTENDO FORMATO ORACLE
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "NUMBER(18,2)");
        }
    }
}
