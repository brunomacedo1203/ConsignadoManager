using Microsoft.EntityFrameworkCore;
using WebAPI_EmprestimoConsignado;
using WebAPI_EmprestimoConsignado.DataContext;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDependencies(builder.Configuration); 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//  Adicionando a configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
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

app.UseAuthorization();
app.MapControllers();

app.Run();
