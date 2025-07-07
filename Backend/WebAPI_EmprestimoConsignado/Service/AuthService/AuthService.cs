using Microsoft.EntityFrameworkCore;
using WebAPI_EmprestimoConsignado.DataContext;
using WebAPI_EmprestimoConsignado.DTO;
using WebAPI_EmprestimoConsignado.Models;
using WebAPI_EmprestimoConsignado.Service.SenhaService;

namespace WebAPI_EmprestimoConsignado.Service.AuthService
{
    public class AuthService : IAuthInterface
    {
        //Injeção de dependencia para acesso ao banco de dados.
        private readonly ApplicationDbContext _context;
        private readonly ISenhaInterface _senhaInterface;
        public AuthService(ApplicationDbContext context, ISenhaInterface senhaInterface )
        {
            _context = context;
            _senhaInterface = senhaInterface;
        }
        public async Task<Response<UsuarioCriacaoDto>> Registrar(UsuarioCriacaoDto usuarioRegistro)
        {
            Response<UsuarioCriacaoDto> respostaServico = new Response<UsuarioCriacaoDto>();
            try
            {
                if (!VerificaSeEmaileUusuarioExiste(usuarioRegistro))
                {
                    respostaServico.Dados = null;
                    respostaServico.Status = false;
                    respostaServico.Mensagem = "Email/Uusario já cadastrado!";
                    return respostaServico;
                }
                _senhaInterface.CriarSenhaHash(usuarioRegistro.Senha, out byte[] senhaHash, out byte[] senhaSalt);

                UsuarioModel usuario = new UsuarioModel()
                {
                    Usuario = usuarioRegistro.Usuario,
                    Email = usuarioRegistro.Email,
                    Cargo = usuarioRegistro.Cargo,
                    SenhaHash = senhaHash,
                    SenhaSalt = senhaSalt   
                };
                _context.Add(usuario);
                await _context.SaveChangesAsync();
                respostaServico.Mensagem = "Usuário criado com sucesso!";
            }
            catch (Exception ex)
            {
                respostaServico.Dados = null;
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = false;
            }

            return respostaServico;
        }

        public async Task<Response<string>> Login(UsuarioLoginDto usuarioLogin)
        {
            Response<string> respostaServico = new Response <string>();

            try
            {
                var usuario = await _context.Usuarios.FirstOrDefaultAsync (userBanco => userBanco.Email == usuarioLogin.Email);
                if (usuario == null) {
                    respostaServico.Mensagem = "Crendencias Inválidas!";
                    respostaServico.Status = false;
                    Console.WriteLine("Usuário não encontrado para o email: " + usuarioLogin.Email);
                    return respostaServico;
                }
                if(!_senhaInterface.VerificaSenhaHash(usuarioLogin.Senha, usuario.SenhaHash, usuario.SenhaSalt))
                {
                    respostaServico.Mensagem = "Credenciais inválidas!";
                    respostaServico.Status = false;
                    Console.WriteLine("Senha inválida para o email: " + usuarioLogin.Email);
                    return respostaServico;
                }
                var token = _senhaInterface.CriarToken(usuario);
                Console.WriteLine("Token gerado: " + token);
                respostaServico.Dados = token;
                respostaServico.Mensagem = "Usuário logado com sucesso!";
            }
            catch (Exception ex)
            {
                respostaServico.Dados = null;
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = false;
                Console.WriteLine("Exceção no Login: " + ex.Message);
            }
            return respostaServico;
        }
        public bool VerificaSeEmaileUusuarioExiste(UsuarioCriacaoDto usuarioRegistro)
        {
            var usuario = _context.Usuarios.FirstOrDefault(userBanco => userBanco.Email == usuarioRegistro.Email || userBanco.Usuario == usuarioRegistro.Usuario);
            if (usuario != null) return false;
            return true;
        }
    }
}
