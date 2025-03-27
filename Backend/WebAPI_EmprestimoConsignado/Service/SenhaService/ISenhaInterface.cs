namespace WebAPI_EmprestimoConsignado.Service.SenhaService;
 using WebAPI_EmprestimoConsignado.Models;  

    public interface ISenhaInterface
    {
        void CriarSenhaHash(string senha, out byte[] senhaHash, out byte[] senhaSalt);
        bool VerificaSenhaHash(string senha, byte[] senhaHash, byte[] senhaSalt);
        string CriarToken(UsuarioModel usuario);
    }

