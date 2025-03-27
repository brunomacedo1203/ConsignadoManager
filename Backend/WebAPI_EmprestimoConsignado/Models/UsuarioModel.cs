using System.ComponentModel.DataAnnotations.Schema;
using System;
using WebAPI_EmprestimoConsignado.Enums;

namespace WebAPI_EmprestimoConsignado.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Email { get; set; }       
        public CargoEnum Cargo { get; set; }        
        public byte[] SenhaHash { get; set; }     
        public byte[] SenhaSalt { get; set; }     
        public DateTime TokenDataCriacao { get; set; } = DateTime.Now.ToLocalTime();
    }
}
