using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI_EmprestimoConsignado.Enums;

namespace WebAPI_EmprestimoConsignado.Models
{
    public class EmprestimoModel
    {
        [Key]
        public int Id { get; set; }

        public int ClienteId { get; set; }

        [ForeignKey("ClienteId")]
        public ClienteModel Cliente { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal? Valor { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal? Juros { get; set; }

        public TipoEmprestimoEnum? TipoEmprestimo { get; set; }

        public StatusEmprestimoEnum? Status { get; set; }

        public DateTime DataDeCriacao { get; set; } = DateTime.Now.ToLocalTime();
        public DateTime DataDeAlteracao { get; set; } = DateTime.Now.ToLocalTime();
    }
}
