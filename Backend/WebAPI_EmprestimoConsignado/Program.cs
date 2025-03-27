using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using WebAPI_EmprestimoConsignado;
using WebAPI_EmprestimoConsignado.DataContext;
<<<<<<< HEAD
using WebAPI_EmprestimoConsignado.Service.AuthService;
using WebAPI_EmprestimoConsignado.Service.ClienteService;
using WebAPI_EmprestimoConsignado.Service.SenhaService;
=======
>>>>>>> f2e9fe2ce13a9db0a3d5af0f439310afb5f6fb91

var builder = WebApplication.CreateBuilder(args);

// Configuração das dependências
builder.Services.AddDependencies(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
<<<<<<< HEAD
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthInterface, AuthService>();
builder.Services.AddScoped<ISenhaInterface, SenhaService>();
builder.Services.AddScoped<IClienteInterface, ClienteService>();
=======
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "bearer",
        Description = "Enter 'Bearer' followed by your token"
    });
>>>>>>> f2e9fe2ce13a9db0a3d5af0f439310afb5f6fb91

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Adicionando a configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy => policy
<<<<<<< HEAD
            .AllowAnyOrigin()   
            .AllowAnyMethod()   
            .AllowAnyHeader()); 
=======
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
>>>>>>> f2e9fe2ce13a9db0a3d5af0f439310afb5f6fb91
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplicando CORS antes do Authorization
app.UseCors("PermitirTudo");

// Aplicando autenticação JWT
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
