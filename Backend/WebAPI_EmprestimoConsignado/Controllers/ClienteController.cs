using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_EmprestimoConsignado.Models;
using WebAPI_EmprestimoConsignado.Service.ClienteService;
using WebAPI_EmprestimoConsignado.Enums;
using ClosedXML.Excel;
using System.IO;

namespace WebAPI_EmprestimoConsignado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteInterface _clienteInterface;
        private readonly ILogger<ClienteController> _logger;

        public ClienteController(IClienteInterface clienteInterface, ILogger<ClienteController> logger)
        {
            _clienteInterface = clienteInterface;
            _logger = logger;
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
            var serviceResponse = await _clienteInterface.GetClienteById(id);
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
            var serviceResponse = await _clienteInterface.UpdateCliente(editadoCliente);
            return Ok(serviceResponse);
        }

        [HttpPut("inativaCliente")]
        [Authorize(Policy = "Administrador")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> InativaCliente(int id)
        {
            var serviceResponse = await _clienteInterface.InativaCliente(id);
            return Ok(serviceResponse);
        }

        [HttpDelete]
        [Authorize(Policy = "Administrador")]
        public async Task<ActionResult<ServiceResponse<List<ClienteModel>>>> DeleteCliente(int id)
        {
            var serviceResponse = await _clienteInterface.DeleteCliente(id);
            return Ok(serviceResponse);
        }

        [HttpGet("exportar-excel")]
        [Produces("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")]
        public async Task<IActionResult> ExportarParaExcel()
        {
            var response = await _clienteInterface.GetClientes();
            var clientes = response.Dados;

            if (clientes == null || !clientes.Any())
                return NotFound("Nenhum cliente encontrado.");

            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Clientes");

            // Cabeçalhos
            worksheet.Cell(1, 1).Value = "ID";
            worksheet.Cell(1, 2).Value = "Nome";
            worksheet.Cell(1, 3).Value = "CPF";
            worksheet.Cell(1, 4).Value = "Email";
            worksheet.Cell(1, 5).Value = "Status";
            worksheet.Cell(1, 6).Value = "Tipo de Empréstimo";
            worksheet.Cell(1, 7).Value = "Status do Empréstimo";
            worksheet.Cell(1, 8).Value = "Valor do Empréstimo";
            worksheet.Cell(1, 9).Value = "Quantidade de Parcelas";
            worksheet.Cell(1, 10).Value = "Valor da Parcela";
            worksheet.Cell(1, 11).Value = "Data de Contratação";

            // Dados
            for (int i = 0; i < clientes.Count; i++)
            {
                var cliente = clientes[i];
                worksheet.Cell(i + 2, 1).Value = cliente.Id;
                worksheet.Cell(i + 2, 2).Value = cliente.Nome;
                worksheet.Cell(i + 2, 3).Value = cliente.CPF;
                worksheet.Cell(i + 2, 4).Value = cliente.Email;
                worksheet.Cell(i + 2, 5).Value = cliente.Ativo ? "Ativo" : "Inativo";
                worksheet.Cell(i + 2, 6).Value = cliente.TipoEmprestimo.ToString();
                worksheet.Cell(i + 2, 7).Value = cliente.StatusEmprestimo.ToString();
                worksheet.Cell(i + 2, 8).Value = cliente.ValorEmprestimo;
                worksheet.Cell(i + 2, 9).Value = cliente.QtdParcelas;
                worksheet.Cell(i + 2, 10).Value = cliente.ValorParcela;
                worksheet.Cell(i + 2, 11).Value = cliente.DataContratacao.ToString("dd/MM/yyyy");
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Position = 0;

            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "clientes.xlsx"
            );
        }

        [HttpGet("exportar-excel-teste")]
        [Produces("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")]
        public IActionResult ExportarParaExcelTeste()
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Teste");
            worksheet.Cell(1, 1).Value = "Funciona!";
            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Position = 0;
            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "teste.xlsx"
            );
        }
    }
}
