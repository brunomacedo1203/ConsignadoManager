using Microsoft.EntityFrameworkCore;
using WebAPI_EmprestimoConsignado.DataContext;
using WebAPI_EmprestimoConsignado.Service.ClienteService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IClienteInterface, ClienteService>();

//  Adicionando a configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy => policy
            .AllowAnyOrigin()   // Permite qualquer origem
            .AllowAnyMethod()   // Permite qualquer método HTTP (GET, POST, etc.)
            .AllowAnyHeader()); // Permite qualquer cabeçalho
});

// Configuração do banco de dados
var connectionString = Environment.GetEnvironmentVariable("DefaultConnection_EmprestimoConsignado");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string is not set.");
}
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseOracle(connectionString);
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Aplicando CORS antes do Authorization
app.UseCors("PermitirTudo");

app.UseAuthorization();
app.MapControllers();

app.Run();
