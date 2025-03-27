using System.Security.Claims;
using System.Security.Cryptography;
using WebAPI_EmprestimoConsignado.Migrations;

namespace WebAPI_EmprestimoConsignado.Service.SenhaService
{
    public class SenhaService : ISenhaInterface
    {
        //método para criar a senha Hash
        public void CriarSenhaHash(string senha, out byte[] senhaHash, out byte[] senhaSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                senhaSalt = hmac.Key;
                senhaHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(senha));
            }

        }

        public bool VerificaSenhaHash(string senha, byte[] senhaHash, byte[] senhaSalt)
        {
            using (var hmac = new HMACSHA512(senhaSalt))

            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(senha));
                return computedHash.SequenceEqual(senhaHash);
            }         

        }
        public string CriarToken(UsuarioModel usuario)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("Cargo", usuario.Cargo .ToString()),

             
            };

            return "";
        }
    }
}


    
