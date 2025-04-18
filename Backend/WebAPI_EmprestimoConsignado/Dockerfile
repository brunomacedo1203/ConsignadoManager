# Dockerfile para Backend ASP.NET Core (.NET 9)

# Etapa 1: build (imagem maior, com SDK)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copia arquivos de projeto e restaura dependências
COPY *.csproj ./
RUN dotnet restore

# Copia todo o restante do código e compila
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 2: runtime (imagem menor, só para rodar)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Porta padrão do ASP.NET
EXPOSE 8080

# Variável de ambiente para ASPNETCORE_URLS
ENV ASPNETCORE_URLS=http://+:8080

# Comando para rodar a API
ENTRYPOINT ["dotnet", "WebAPI_EmprestimoConsignado.dll"]
