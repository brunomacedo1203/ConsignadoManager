using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using WebAPI_EmprestimoConsignado.DataContext;
using WebAPI_EmprestimoConsignado.Service.AuthService;
using WebAPI_EmprestimoConsignado.Service.ClienteService;
using WebAPI_EmprestimoConsignado.Service.SenhaService;
using WebAPI_EmprestimoConsignado.Enums;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthInterface, AuthService>();
builder.Services.AddScoped<ISenhaInterface, SenhaService>();
builder.Services.AddScoped<IClienteInterface, ClienteService>();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
        ValidateAudience = false,
        ValidateIssuer = false
    };
});

// Adicionando a configura��o do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Configura��o do banco de dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection_EmprestimoConsignado");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string is not set.");
}
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseOracle(connectionString);
});

// Adicionando Health Checks
builder.Services.AddHealthChecks().AddDbContextCheck<ApplicationDbContext>("oracle-db");

// Configura��o de autoriza��o gen�rica baseada em CargoEnum
builder.Services.AddAuthorization(options =>
{
    foreach (var cargo in Enum.GetValues<CargoEnum>())
    {
        options.AddPolicy(cargo.ToString(), policy => policy.RequireClaim("Cargo", cargo.ToString()));
    }
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("PermitirTudo");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Endpoint público de health check
app.MapHealthChecks("/health");

app.Run();
