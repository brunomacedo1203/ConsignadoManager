using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    /// <inheritdoc />
    public partial class _4th : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sobrenome",
                table: "Clientes",
                newName: "Email");

            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "DECIMAL(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "TipoEmprestimo",
                table: "Emprestimos",
                type: "NUMBER(10)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "NUMBER(10)");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Emprestimos",
                type: "NUMBER(10)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "NUMBER(10)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "DECIMAL(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataContratacao",
                table: "Clientes",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "QtdParcelas",
                table: "Clientes",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StatusEmprestimo",
                table: "Clientes",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TipoEmprestimo",
                table: "Clientes",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "ValorEmprestimo",
                table: "Clientes",
                type: "DECIMAL(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ValorParcela",
                table: "Clientes",
                type: "DECIMAL(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataContratacao",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "QtdParcelas",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "StatusEmprestimo",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "TipoEmprestimo",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "ValorEmprestimo",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "ValorParcela",
                table: "Clientes");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Clientes",
                newName: "Sobrenome");

            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Emprestimos",
                type: "DECIMAL(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoEmprestimo",
                table: "Emprestimos",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "NUMBER(10)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Emprestimos",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "NUMBER(10)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Juros",
                table: "Emprestimos",
                type: "DECIMAL(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)",
                oldNullable: true);
        }
    }
}
