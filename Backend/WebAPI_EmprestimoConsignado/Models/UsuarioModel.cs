<<<<<<< HEAD
﻿using System.ComponentModel.DataAnnotations.Schema;
using System;
using WebAPI_EmprestimoConsignado.Enums;
=======
﻿using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;
>>>>>>> f2e9fe2ce13a9db0a3d5af0f439310afb5f6fb91

namespace WebAPI_EmprestimoConsignado.Models
{
    public class UsuarioModel
    {
<<<<<<< HEAD
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Email { get; set; }       
        public CargoEnum Cargo { get; set; }        
        public byte[] SenhaHash { get; set; }     
        public byte[] SenhaSalt { get; set; }     
        public DateTime TokenDataCriacao { get; set; } = DateTime.Now.ToLocalTime();
=======
        [Key]
        public int Id { get; private set; }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public byte[] PasswordHash { get; private set; }
        public byte[] PasswordSalt { get; private set; }

        // Construtor com validação de domínio
        public UsuarioModel(int id, string nome, string email)
        {
            if (id < 0) throw new ArgumentException("O id não pode ser negativo.");
            ValidateDomain(nome, email);
            Id = id;
        }

        // Método para alterar a senha
        public void AlterarSenha(byte[] passwordHash, byte[] passwordSalt)
        {
            PasswordHash = passwordHash ?? throw new ArgumentNullException(nameof(passwordHash), "PasswordHash não pode ser nulo");
            PasswordSalt = passwordSalt ?? throw new ArgumentNullException(nameof(passwordSalt), "PasswordSalt não pode ser nulo");
        }

        // Método de validação de domínio para nome e email
        private void ValidateDomain(string nome, string email)
        {
            if (string.IsNullOrEmpty(nome)) throw new ArgumentException("O nome é obrigatório.");
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("O email é obrigatório.");
            if (nome.Length > 250) throw new ArgumentException("O nome não pode passar de 250 caracteres.");
            if (email.Length > 200) throw new ArgumentException("O email não pode passar de 200 caracteres.");

            Nome = nome;
            Email = email;
        }

        // Método para hash de senha (caso você precise gerar e armazenar as senhas)
        public static (byte[] PasswordHash, byte[] PasswordSalt) CriarHashSenha(string senha)
        {
            using (var hmac = new HMACSHA512())
            {
                var passwordSalt = hmac.Key;
                var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(senha));
                return (passwordHash, passwordSalt);
            }
        }
>>>>>>> f2e9fe2ce13a9db0a3d5af0f439310afb5f6fb91
    }
}
