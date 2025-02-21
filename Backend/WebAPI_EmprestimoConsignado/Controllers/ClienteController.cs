using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_EmprestimoConsignado.Models;
using WebAPI_EmprestimoConsignado.Service.ClienteService;

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
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> GetClientes()
        {
            return Ok(await _clienteInterface.GetClientes());
        }
        [HttpGet("(id)")]
        public async Task<ActionResult<ServiceResponse<ClienteModel>>> GetClienteById(int id)
        {
            ServiceResponse<ClienteModel> serviceResponse = await _clienteInterface.GetClienteById(id);
            return Ok(serviceResponse);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> CreateCliente(ClienteModel novoCliente)
        {
            return Ok(await _clienteInterface.CreateCliente(novoCliente));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> UpdateCliente(ClienteModel editadoCliente)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = await _clienteInterface.UpdateCliente(editadoCliente);

            return Ok(serviceResponse);
        }


        [HttpPut("inativaCliente")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> InativaCliente(int id)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = await _clienteInterface.InativaCliente(id);
            return Ok(serviceResponse);
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> DeleteCliente(int id)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = await _clienteInterface.DeleteCliente(id);
            return Ok(serviceResponse);

        }
    }
}