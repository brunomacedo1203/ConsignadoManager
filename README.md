# 🏦 Sistema de Gestão de Empréstimos Consignados
# Consigned Loan Management System

[🇧🇷 Português](#português) | [🇺🇸 English](#english)

*BACK-END*

A comprehensive Consigned Loan Management system built with .NET Core Web API, designed to handle client registration and loan tracking. The system features JWT authentication, CRUD operations for client management, and integration with Oracle Database.

### 🚀 Features

- ✅ User Authentication and Authorization with JWT
- 👤 User Registration and Login
- 💼 Complete Client Management (CRUD Operations)
- 🔐 Secure API Endpoints
- 📱 Responsive Design (Frontend - Coming Soon)
- 📊 Loan Tracking System

### 🛠️ Technologies

#### Backend
- .NET 9.0
- ASP.NET Core Web API
- Entity Framework Core 9.0.1
- Oracle Database
- Swagger/OpenAPI

#### Security
- JWT Authentication
- Role-based Authorization

### 📦 Dependencies

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.1" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.1" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.1" />
<PackageReference Include="Oracle.EntityFrameworkCore" Version="9.23.60" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.3" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
<PackageReference Include="Swashbuckle.AspNetCore.Filters" Version="8.0.2" />
```

### 🔧 Installation

```bash
# Clone the repository
git clone [your-repository-url]

# Navigate to project directory
cd [your-project-name]

# Restore dependencies
dotnet restore

# Update database
dotnet ef database update

# Run the application
dotnet run
```

### 🔜 Coming Soon

- 🎨 Frontend Implementation with AngularJS
- 📈 Advanced Reporting Features

---

## Português

### 📋 Visão Geral do Projeto

Sistema de Gestão de Empréstimos Consignados desenvolvido com .NET Core Web API, projetado para gerenciar cadastro de clientes e acompanhamento de empréstimos. O sistema conta com autenticação JWT, operações CRUD para gestão de clientes e integração com Banco de Dados Oracle.

### 🚀 Funcionalidades

- ✅ Autenticação e Autorização com JWT
- 👤 Cadastro e Login de Usuários
- 💼 Gestão Completa de Clientes (Operações CRUD)
- 🔐 Endpoints de API Seguros
- 📱 Design Responsivo (Frontend - Em Breve)
- 📊 Sistema de Acompanhamento de Empréstimos

### 🛠️ Tecnologias

#### Backend
- .NET 9.0
- ASP.NET Core Web API
- Entity Framework Core 9.0.1
- Banco de Dados Oracle
- Swagger/OpenAPI

#### Segurança
- Autenticação JWT
- Autorização Baseada em Papéis

### 📦 Dependências

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.1" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.1" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.1" />
<PackageReference Include="Oracle.EntityFrameworkCore" Version="9.23.60" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.3" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
<PackageReference Include="Swashbuckle.AspNetCore.Filters" Version="8.0.2" />
```

### 🔧 Instalação

```bash
# Clone o repositório
git clone [url-do-seu-repositório]

# Navegue até o diretório do projeto
cd [nome-do-seu-projeto]

# Restaure as dependências
dotnet restore

# Atualize o banco de dados
dotnet ef database update

# Execute a aplicação
dotnet run
```

### 🔜 Próximas Atualizações

- 🎨 Implementação do Frontend com AngularJS
- 📈 Recursos Avançados de Relatórios
