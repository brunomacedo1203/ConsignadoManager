using System.ComponentModel.DataAnnotations;
using WebAPI_EmprestimoConsignado.Enums;

namespace WebAPI_EmprestimoConsignado.DTO
{
    public class UsuarioCriacaoDto
    {
        [Required(ErrorMessage ="O campo Usuário é obrigatório")]
        public string Usuario { get; set; }
        [Required(ErrorMessage = "O campo Email é obrigatório"),EmailAddress(ErrorMessage="Email inválido!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório")]
        public string Senha { get; set; }
        [Compare("Senha", ErrorMessage ="Senhas não concidem!")]
        public string ConfirmacaoSenha { get; set; }

        [Required(ErrorMessage = "O campo Cargo é obrigatório")]
        public CargoEnum Cargo { get; set; }

    }
}
