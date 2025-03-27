using System.ComponentModel.DataAnnotations;

namespace WebAPI_EmprestimoConsignado.DTO
{
    public class UsuarioLoginDto
    {
        [Required(ErrorMessage = "O campo Email é obrigatório"), EmailAddress(ErrorMessage = "Email inválido!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O senha é obrigatório")]
        public string Senha { get; set; }
    }
}
