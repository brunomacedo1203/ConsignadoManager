using WebAPI_EmprestimoConsignado.DTO;
using WebAPI_EmprestimoConsignado.Models;

namespace WebAPI_EmprestimoConsignado.Service.AuthService
{
    public interface IAuthInterface
    {
        Task<Response<UsuarioCriacaoDto>> Registrar(UsuarioCriacaoDto usuarioRegistro);
        Task<Response<string>> Login(UsuarioLoginDto usuarioLogin);
    }
}
