﻿
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_EmprestimoConsignado.Models;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public ActionResult<Response<string>> GetUsuario()
        {
            Response<string> response = new Response<string>();
            response.Mensagem = "Acessei!";

            return Ok(response);
        }

    }
}