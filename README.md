# 🏦 Sistema de Gestão de Empréstimos Consignados

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/seu-usuario/seu-repo/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Frontend-Angular-red)](https://angular.io/)
[![.NET](https://img.shields.io/badge/Backend-.NET%209.0-blue)](https://dotnet.microsoft.com/)

# Payroll Loan Management System

[🇧🇷 Português](#português) | [🇺🇸 English](#english)

---

## 📑 Sumário / Table of Contents
- [Visão Geral / Overview](#visão-geral--overview)
- [Badges](#badges)
- [Funcionalidades / Features](#funcionalidades--features)
- [Tecnologias / Technologies](#tecnologias--technologies)
- [Instalação / Installation](#instalação--installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [Exemplos de Uso / Usage Examples](#exemplos-de-uso--usage-examples)
- [Prints e GIFs / Screenshots & GIFs](#prints-e-gifs--screenshots--gifs)
- [Estrutura de Diretórios / Project Structure](#estrutura-de-diretórios--project-structure)
- [Testes / Tests](#testes--tests)
- [Observações / Notes](#observações--notes)

---

# 🏦 Sistema de Gestão de Empréstimos Consignados
# Payroll Loan Management System

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

### 🖥️ Frontend

O frontend da aplicação foi desenvolvido utilizando **Angular** e **Angular Material**, proporcionando uma interface moderna, responsiva e amigável para a gestão de clientes e empréstimos consignados.

#### Principais Funcionalidades
- Listagem, cadastro, edição, inativação e exclusão de clientes
- Autenticação e login de usuários
- Controle de permissões (ações administrativas visíveis apenas para administradores)
- Paginação, ordenação e pesquisa de clientes
- Diálogos de confirmação para ações críticas
- Integração total com o backend via API REST

#### Tecnologias Utilizadas
- Angular 17+
- Angular Material
- RxJS
- TypeScript
- HTML5 & SCSS/CSS3

#### Instalação do Frontend

```bash
# Acesse o diretório do frontend
cd Frontend

# Instale as dependências
npm install

# Execute a aplicação
ng serve --open
```

Acesse a interface web em: [http://localhost:4200](http://localhost:4200)

#### Estrutura de Diretórios (Frontend)
```
Frontend/
  └── src/
      └── app/
          ├── clientes/           # Componentes e serviços de clientes
          ├── auth/               # Autenticação e guarda de rotas
          └── ...                 # Outros módulos e componentes
```

#### Observações
- O frontend consome a API do backend para todas as operações.
- Permissões de usuário são controladas visualmente (botões administrativos desabilitados para não administradores, com mensagens de permissão).
- Para ambiente de produção, configure o endpoint da API no arquivo `environment.prod.ts`.

#### Exemplos de Uso (Frontend)

- **Login:**
  - Acesse a tela inicial, informe suas credenciais e faça login para acessar o sistema.
- **Gestão de Clientes:**
  - Após login, visualize a lista de clientes, utilize a busca, ordenação e paginação.
  - Apenas administradores podem cadastrar, editar, inativar ou excluir clientes. Usuários comuns visualizam os botões administrativos desabilitados, com mensagem de permissão ao passar o mouse.
- **Responsividade:**
  - A interface se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).

#### Prints de Telas (Frontend)

#### Login
![Login](docs/prints/login.png)

#### Lista de Clientes
![Lista de Clientes](docs/prints/clientes-list.png)

#### Cadastro de Cliente
![Cadastro de Cliente](docs/prints/cadastro-cliente.png)

#### Ações Administrativas Desabilitadas
![Ações Desabilitadas](docs/prints/acoes-desabilitadas.gif)

> Adicione outros prints ou GIFs em `docs/prints/` para ilustrar o uso do sistema.

---

### Exemplos de Requisições / API Usage Examples

#### Login (POST)
```http
POST /api/Auth/Login
Content-Type: application/json

{
  "email": "admin@empresa.com",
  "senha": "suaSenha"
}
```

#### Cadastro de Cliente (POST)
```http
POST /api/Cliente
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "email": "joao@exemplo.com",
  "dataContratacao": "2025-04-15T00:00:00Z"
}
```

#### Listar Clientes (GET)
```http
GET /api/Cliente
Authorization: Bearer {jwt_token}
```

#### Exemplo de Resposta (GET /api/Cliente)
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "email": "joao@exemplo.com",
    "ativo": true
  },
  ...
]
```

---

## 🇺🇸 English

### Overview
A Payroll Loan Management System built with .NET 9.0 (ASP.NET Core Web API) and Angular. Features JWT authentication, Oracle Database integration, full client and loan management, and a modern, responsive frontend.

### 🚀 Features
- ✅ User Authentication and Authorization (JWT)
- 👤 User Registration and Login
- 💼 Full Client CRUD Management
- 🔐 Secure API Endpoints
- 📱 Responsive Angular Frontend
- 📊 Consigned Loan Tracking

### 🛠️ Technologies
- Backend: .NET 9.0, ASP.NET Core Web API, Entity Framework Core, Oracle Database
- Frontend: Angular 17+, Angular Material, RxJS, TypeScript, HTML5, SCSS

### 🔧 Installation
#### Backend
```bash
cd Backend
# Restore dependencies
 dotnet restore
# Update database
 dotnet ef database update
# Run
 dotnet run
```
#### Frontend
```bash
cd Frontend
npm install
ng serve --open
```

### Usage Examples
See [API Usage Examples](#exemplos-de-requisições--api-usage-examples) above for request/response samples.

### Screenshots
See [Screenshots & GIFs](#prints-de-telas--screenshots--gifs) above.

---

## Observações / Notes
- For production, set proper environment variables for sensitive data (DB connection, JWT secrets, API URLs).
- The system follows best practices for separation of concerns between backend and frontend.
- User permissions are enforced both visually (frontend) and via API (backend).

---

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

---

### 🖥️ Frontend

O frontend da aplicação foi desenvolvido utilizando **Angular** e **Angular Material**, proporcionando uma interface moderna, responsiva e amigável para a gestão de clientes e empréstimos consignados.

#### Principais Funcionalidades
- Listagem, cadastro, edição, inativação e exclusão de clientes
- Autenticação e login de usuários
- Controle de permissões (ações administrativas visíveis apenas para administradores)
- Paginação, ordenação e pesquisa de clientes
- Diálogos de confirmação para ações críticas
- Integração total com o backend via API REST

#### Tecnologias Utilizadas
- Angular 17+
- Angular Material
- RxJS
- TypeScript
- HTML5 & SCSS/CSS3

#### Instalação do Frontend

```bash
# Acesse o diretório do frontend
cd Frontend

# Instale as dependências
npm install

# Execute a aplicação
ng serve --open
```

Acesse a interface web em: [http://localhost:4200](http://localhost:4200)

#### Estrutura de Diretórios (Frontend)
```
Frontend/
  └── src/
      └── app/
          ├── clientes/           # Componentes e serviços de clientes
          ├── auth/               # Autenticação e guarda de rotas
          └── ...                 # Outros módulos e componentes
```

#### Observações
- O frontend consome a API do backend para todas as operações.
- Permissões de usuário são controladas visualmente (botões administrativos desabilitados para não administradores, com mensagens de permissão).
- Para ambiente de produção, configure o endpoint da API no arquivo `environment.prod.ts`.

#### Exemplos de Uso (Frontend)

- **Login:**
  - Acesse a tela inicial, informe suas credenciais e faça login para acessar o sistema.
- **Gestão de Clientes:**
  - Após login, visualize a lista de clientes, utilize a busca, ordenação e paginação.
  - Apenas administradores podem cadastrar, editar, inativar ou excluir clientes. Usuários comuns visualizam os botões administrativos desabilitados, com mensagem de permissão ao passar o mouse.
- **Responsividade:**
  - A interface se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).

#### Prints de Telas (Frontend)

> Adicione aqui prints ou GIFs demonstrando o uso da aplicação para facilitar a visualização do sistema em funcionamento.

---

### 🗄️ Backend — Complementos

#### Configuração de Banco de Dados
- O backend utiliza **Oracle Database**. A string de conexão pode ser configurada no arquivo `appsettings.json`.
- Para ambiente de desenvolvimento local, utilize um banco Oracle acessível e ajuste a string de conexão conforme necessário.

#### Autenticação e Permissões
- O backend utiliza JWT para autenticação.
- Políticas de autorização controlam o acesso a endpoints críticos (ex: apenas administradores podem criar, editar, inativar ou excluir clientes).
- Endpoints públicos: login e cadastro de usuário.
- Endpoints protegidos: operações de clientes e empréstimos.

#### Estrutura de Diretórios (Backend)
```
Backend/
  ├── Controllers/           # Controllers da API
  ├── Models/                # Modelos de dados
  ├── Service/               # Serviços de negócio
  ├── DTO/                   # Data Transfer Objects
  ├── Enums/                 # Enumerações
  └── ...
```

#### Testes e Desenvolvimento
- Recomenda-se utilizar o Swagger (já configurado) para testar os endpoints da API durante o desenvolvimento.
- Para rodar testes automatizados, utilize os comandos do .NET Core (`dotnet test`).

#### Observações Gerais
- O sistema segue boas práticas de arquitetura, separando responsabilidades entre backend e frontend.
- Recomenda-se configurar variáveis de ambiente para dados sensíveis (como string de conexão e segredos JWT) em produção.
