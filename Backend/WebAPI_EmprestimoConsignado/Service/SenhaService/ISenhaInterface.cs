﻿namespace WebAPI_EmprestimoConsignado.Service.SenhaService
{
    public interface ISenhaInterface
    {
        void CriarSenhaHash(string senha, out byte[] senhaHash, out byte[] senhaSalt);
        bool VerificaSenhaHash(string senha, byte[] senhaHash, byte[] senhaSalt);
    }
}
