using Microsoft.EntityFrameworkCore;
using WebAPI_EmprestimoConsignado.DataContext;
using WebAPI_EmprestimoConsignado.Models;

namespace WebAPI_EmprestimoConsignado.Service.ClienteService
{     
        public class ClienteService : IClienteInterface
        {
        private readonly ApplicationDbContext _context;

        public ClienteService(ApplicationDbContext context)
        {
                _context = context;
        }
        public async Task<ServiceResponse<List<ClienteModel>>> CreateCliente(ClienteModel novoCliente)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = new ServiceResponse<List<ClienteModel>>(); 
            try
            {
                if (novoCliente == null)
                {
                    serviceResponse.Dados =null;                   
                    serviceResponse.Mensagem = "Informar dados!";
                    serviceResponse.Sucesso = false;

                    return serviceResponse;
                }

                _context.Clientes.Add(novoCliente);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Clientes.ToList();
            }

            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.InnerException?.Message ?? ex.Message; // Mostra erro interno
                serviceResponse.Sucesso = false;
            }

            /* catch (Exception ex)
             {
                 serviceResponse.Mensagem = ex.Message;
                 serviceResponse.Sucesso = false;
             }*/

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<ClienteModel>>> DeleteCliente(int id)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = new ServiceResponse<List<ClienteModel>>();
            try
            {
                ClienteModel cliente = _context.Clientes.FirstOrDefault(x => x.Id == id);
                if (cliente == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Cliente não localizado!";
                    serviceResponse.Sucesso = false;
                    return serviceResponse;
                }

                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();

                serviceResponse.Dados= _context.Clientes.ToList();
            }
            catch
           (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;        
        }

        public async Task<ServiceResponse<ClienteModel>> GetClienteById(int id)
        {
            ServiceResponse<ClienteModel> serviceResponse = new ServiceResponse<ClienteModel>();

            try
            {
                ClienteModel cliente = _context.Clientes.FirstOrDefault(x => x.Id == id);
                if (cliente == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Cliente não localizado!";
                    serviceResponse.Sucesso = false;
                }
                serviceResponse.Dados = cliente;
            }
            catch (Exception ex)
            {

            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<ClienteModel>>> GetClientes()
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = new ServiceResponse<List<ClienteModel>>();
            try
            {
                serviceResponse.Dados = _context.Clientes.ToList();
                if(serviceResponse.Dados.Count ==0)
                {
                    serviceResponse.Mensagem = "Nenhum dado encontrado";
                }
            }
            catch
            (Exception ex)
            {
                serviceResponse.Mensagem=ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<ClienteModel>>> InativaCliente(int id)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = new ServiceResponse<List<ClienteModel>>();
            try
            {
                ClienteModel cliente = _context.Clientes.FirstOrDefault(x => x.Id == id);
                if(cliente == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Cliente não encontrado!";
                    serviceResponse.Sucesso = false;
                }
                cliente.Ativo = false;
                cliente.DataDeAlteracao = DateTime.Now.ToLocalTime();

                _context.Clientes.Update(cliente);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Clientes.ToList();
            }
            catch
           (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<ClienteModel>>> UpdateCliente(ClienteModel editadoCliente)
        {
            ServiceResponse<List<ClienteModel>> serviceResponse = new ServiceResponse<List<ClienteModel>>();
            try
            {
                ClienteModel cliente= _context.Clientes.AsNoTracking().FirstOrDefault(x=>x.Id == editadoCliente.Id);
                if (cliente == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Cliente não encontrado!";
                    serviceResponse.Sucesso = false;
                }
                cliente.DataDeCriacao = DateTime.Now.ToLocalTime();

                _context.Clientes.Update(editadoCliente);
                await _context.SaveChangesAsync();

                serviceResponse.Dados= _context.Clientes.ToList();
            }
            catch 
            (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
            }
        }
}
