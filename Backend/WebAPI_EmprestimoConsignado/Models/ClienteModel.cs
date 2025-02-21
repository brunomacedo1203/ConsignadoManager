using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI_EmprestimoConsignado.Enums;

namespace WebAPI_EmprestimoConsignado.Models
{
    public class ClienteModel
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }       
        public string CPF { get; set; }
        public string Email { get; set; }

        [Column(TypeName = "NUMBER(1)")]
        public bool Ativo { get; set; } = true;
        public DateTime DataDeCriacao { get; set; } = DateTime.Now.ToLocalTime();
        public DateTime DataDeAlteracao { get; set; } = DateTime.Now.ToLocalTime();

   
        public TipoEmprestimoEnum TipoEmprestimo { get; set; }
        public StatusEmprestimoEnum StatusEmprestimo { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal ValorEmprestimo { get; set; }

        public int QtdParcelas { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal ValorParcela { get; set; }

        public DateTime DataContratacao { get; set; }
    }
}
