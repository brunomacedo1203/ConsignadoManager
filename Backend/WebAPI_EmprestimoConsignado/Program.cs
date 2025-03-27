using Microsoft.EntityFrameworkCore;
using WebAPI_EmprestimoConsignado.DataContext;
using WebAPI_EmprestimoConsignado.Service.AuthService;
using WebAPI_EmprestimoConsignado.Service.ClienteService;
using WebAPI_EmprestimoConsignado.Service.SenhaService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthInterface, AuthService>();
builder.Services.AddScoped<ISenhaInterface, SenhaService>();
builder.Services.AddScoped<IClienteInterface, ClienteService>();

//  Adicionando a configura??o do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy => policy
            .AllowAnyOrigin()   
            .AllowAnyMethod()   
            .AllowAnyHeader()); 
});

// Configura??o do banco de dados
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