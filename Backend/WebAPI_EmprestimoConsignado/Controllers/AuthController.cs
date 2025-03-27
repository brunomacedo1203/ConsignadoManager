using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_EmprestimoConsignado.DTO;
using WebAPI_EmprestimoConsignado.Service.AuthService;

namespace WebAPI_EmprestimoConsignado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       private readonly IAuthInterface _authInterface;
        public AuthController(IAuthInterface authInterface)
        {
            _authInterface = authInterface;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(UsuarioLoginDto usuarioLogin)
        {
            return Ok();
        }

        [HttpPost("Register")]
        public async Task<ActionResult>Register(UsuarioCriacaoDto usuarioRegister)
        {
           var resposta = await  _authInterface.Registrar(usuarioRegister);
            return Ok(resposta);
        }
    }
}
