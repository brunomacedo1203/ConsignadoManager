using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    /// <inheritdoc />
    public partial class UsuarioModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Adiciona colunas novas
            migrationBuilder.AddColumn<string>(
                name: "Usuario",
                table: "Usuarios",
                type: "NVARCHAR2(2000)",
                nullable: false,
                defaultValue: ""
            );
            migrationBuilder.AddColumn<int>(
                name: "Cargo",
                table: "Usuarios",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0
            );
            migrationBuilder.AddColumn<byte[]>(
                name: "SenhaHash",
                table: "Usuarios",
                type: "RAW(2000)",
                nullable: false,
                defaultValue: new byte[0]
            );
            migrationBuilder.AddColumn<byte[]>(
                name: "SenhaSalt",
                table: "Usuarios",
                type: "RAW(2000)",
                nullable: false,
                defaultValue: new byte[0]
            );
            migrationBuilder.AddColumn<DateTime>(
                name: "TokenDataCriacao",
                table: "Usuarios",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP"
            );

            // Remove colunas que não existem mais
            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Usuarios"
            );
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Usuarios"
            );
            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Usuarios"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
