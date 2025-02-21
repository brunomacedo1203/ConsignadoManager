﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Oracle.EntityFrameworkCore.Metadata;
using WebAPI_EmprestimoConsignado.DataContext;

#nullable disable

namespace WebAPI_EmprestimoConsignado.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250210213623_AdicionaAtivoComoTrue")]
    partial class AdicionaAtivoComoTrue
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            OracleModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebAPI_EmprestimoConsignado.Models.ClienteModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("BOOLEAN");

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<DateTime>("DataDeAlteracao")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<DateTime>("DataDeCriacao")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.HasKey("Id");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("WebAPI_EmprestimoConsignado.Models.EmprestimoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClienteId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<DateTime>("DataDeAlteracao")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<DateTime>("DataDeCriacao")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<decimal>("Juros")
                        .HasColumnType("DECIMAL(18, 2)");

                    b.Property<int>("Status")
                        .HasColumnType("NUMBER(10)");

                    b.Property<int>("TipoEmprestimo")
                        .HasColumnType("NUMBER(10)");

                    b.Property<decimal>("Valor")
                        .HasColumnType("DECIMAL(18, 2)");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("Emprestimos");
                });

            modelBuilder.Entity("WebAPI_EmprestimoConsignado.Models.EmprestimoModel", b =>
                {
                    b.HasOne("WebAPI_EmprestimoConsignado.Models.ClienteModel", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cliente");
                });
#pragma warning restore 612, 618
        }
    }
}
