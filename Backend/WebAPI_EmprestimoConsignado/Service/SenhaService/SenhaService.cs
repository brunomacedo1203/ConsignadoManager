using System.Security.Cryptography;

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


    }
}


    
