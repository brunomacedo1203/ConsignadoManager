using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_EmprestimoConsignado.Models;
using WebAPI_EmprestimoConsignado.Service.ClienteService;
using WebAPI_EmprestimoConsignado.Enums;

namespace WebAPI_EmprestimoConsignado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteInterface _clienteInterface;

        public ClienteController(IClienteInterface clienteInterface)
        {
            _clienteInterface = clienteInterface;
        }
                
        [HttpGet]
        [Authorize] 
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> GetClientes()
        {
            return Ok(await _clienteInterface.GetClientes());
        }
               
        [HttpGet("{id}")]
        [Authorize] 
        public async Task<ActionResult<ServiceResponse<ClienteModel>>> GetClienteById(int id)
        {
            ServiceResponse<ClienteModel> serviceResponse = await _clienteInterface.GetClienteById(id);
            return Ok(serviceResponse);
        }        
       
        [HttpPost]
        [Authorize(Policy = "Administrador")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> CreateCliente(ClienteModel novoCliente)
        {
            return Ok(await _clienteInterface.CreateCliente(novoCliente));
        }
      
        [HttpPut]
        [Authorize(Policy = "Administrador")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> UpdateCliente(ClienteModel editadoCliente)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = await _clienteInterface.UpdateCliente(editadoCliente);
            return Ok(serviceResponse);
        }
        
        [HttpPut("inativaCliente")]
        [Authorize(Policy = "Administrador")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> InativaCliente(int id)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = await _clienteInterface.InativaCliente(id);
            return Ok(serviceResponse);
        }
        
        [HttpDelete]
        [Authorize(Policy = "Administrador")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> DeleteCliente(int id)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = await _clienteInterface.DeleteCliente(id);
            return Ok(serviceResponse);
        }
    }
}
