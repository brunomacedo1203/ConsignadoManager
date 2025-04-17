# 🏦 Sistema de Gestão de Empréstimos Consignados

[🇧🇷 Português](#português) | [🇺🇸 English](#english)

---

# <a name="português"></a>🇧🇷 Português

## 📑 Sumário
- [Visão Geral](#visão-geral)
- [Badges](#badges)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Frontend](#frontend)
- [Backend](#backend)
- [Exemplos de Uso](#exemplos-de-uso)
- [Prints da Aplicação](#prints-da-aplicação)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Testes](#testes)
- [Observações](#observações)

---

## Visão Geral
Sistema completo de Gestão de Empréstimos Consignados desenvolvido em .NET 9.0 (ASP.NET Core Web API) e Angular. Possui autenticação JWT, integração com banco Oracle, gestão de clientes e empréstimos, e frontend moderno e responsivo.

## Badges
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/seu-usuario/seu-repo/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Frontend-Angular-red)](https://angular.io/)
[![.NET](https://img.shields.io/badge/Backend-.NET%209.0-blue)](https://dotnet.microsoft.com/)

## Funcionalidades
- ✅ Autenticação e autorização de usuários (JWT)
- 👤 Cadastro e login de usuários
- 💼 CRUD completo de clientes
- 🔐 Endpoints seguros
- 📱 Frontend Angular responsivo
- 📊 Controle de empréstimos consignados

## Tecnologias
- Backend: .NET 9.0, ASP.NET Core Web API, Entity Framework Core, Oracle Database
- Frontend: Angular 17+, Angular Material, RxJS, TypeScript, HTML5, SCSS

## Instalação
```bash
# Clone o repositório
git clone [url-do-seu-repositório]
cd [nome-do-projeto]
```
### Backend
```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run
```
### Frontend
```bash
cd Frontend
npm install
ng serve --open
```
Acesse: [http://localhost:4200](http://localhost:4200)

## Frontend
O frontend utiliza Angular e Angular Material para uma interface moderna e responsiva.

### Principais Funcionalidades
- Listagem, cadastro, edição, inativação e exclusão de clientes
- Autenticação/login
- Controle de permissões (ações administrativas só para admins)
- Paginação, ordenação, busca
- Diálogos de confirmação
- Integração total com backend REST

### Tecnologias
- Angular 17+
- Angular Material
- RxJS
- TypeScript
- HTML5 & SCSS/CSS3

## Backend
Backend robusto em .NET Core Web API, com autenticação JWT, CRUD de clientes, integração Oracle.

## Exemplos de Uso
### Login (POST)
```http
POST /api/Auth/Login
Content-Type: application/json
{
  "email": "admin@empresa.com",
  "senha": "suaSenha"
}
```
### Cadastrar Cliente (POST)
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
### Listar Clientes (GET)
```http
GET /api/Cliente
Authorization: Bearer {jwt_token}
```
### Exemplo de Resposta
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "email": "joao@exemplo.com",
    "ativo": true
  }
]
```

## Prints da Aplicação
### 1. Tela de Login
[![Login](Prints/Login.png)](Prints/Login.png)
<p align="center"><i>Tela inicial para autenticação do usuário.</i></p>
### 2. Criar Conta
[![Criar Conta](Prints/Criar%20Conta.png)](Prints/Criar%20Conta.png)
<p align="center"><i>Formulário para novos usuários criarem sua conta.</i></p>
### 3. Lista de Usuários
[![Usuários](Prints/Usuários.png)](Prints/Usuários.png)
<p align="center"><i>Visualização dos usuários cadastrados.</i></p>
### 4. Lista de Clientes
[![Clientes](Prints/Clientes.png)](Prints/Clientes.png)
<p align="center"><i>Clientes cadastrados, com busca, paginação e ações.</i></p>
### 5. Cadastrar Novo Cliente
[![Cadastrar novo cliente](Prints/Cadastrar%20novo%20cliente.png)](Prints/Cadastrar%20novo%20cliente.png)
<p align="center"><i>Adicionar novo cliente ao sistema.</i></p>
### 6. Editar Cliente
[![Editar Cliente](Prints/Editar%20Cliente.png)](Prints/Editar%20Cliente.png)
<p align="center"><i>Editar dados de um cliente existente.</i></p>
### 7. Detalhes do Cliente
[![Detalhes do Cliente](Prints/Detalhes%20do%20%20Cliente.png)](Prints/Detalhes%20do%20%20Cliente.png)
<p align="center"><i>Visualização detalhada de um cliente.</i></p>

## Estrutura de Diretórios
### Frontend
```
Frontend/
  └── src/
      └── app/
          ├── clientes/           # Componentes e serviços de clientes
          ├── auth/               # Autenticação e guarda de rotas
          └── ...                 # Outros módulos e componentes
```
### Backend
```
Backend/
  ├── Controllers/           # Controllers da API
  ├── Models/                # Modelos de dados
  ├── Service/               # Serviços de negócio
  ├── DTO/                   # Data Transfer Objects
  ├── Enums/                 # Enumerações
  └── ...
```

## Testes
- Use o Swagger para testar os endpoints durante o desenvolvimento.
- Para testes automatizados, utilize `dotnet test`.

## Observações
- O sistema segue boas práticas de arquitetura, separando responsabilidades.
- Recomenda-se configurar variáveis de ambiente para dados sensíveis em produção.

---

# <a name="english"></a>🇺🇸 English

## Table of Contents
- [Overview](#overview)
- [Badges](#badges-1)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Frontend](#frontend-1)
- [Backend](#backend-1)
- [Usage Examples](#usage-examples)
- [Application Screenshots](#application-screenshots)
- [Project Structure](#project-structure)
- [Tests](#tests)
- [Notes](#notes)

---

## Overview
A comprehensive Payroll Loan Management System built with .NET 9.0 (ASP.NET Core Web API) and Angular. Features JWT authentication, Oracle Database integration, full client and loan management, and a modern, responsive frontend.

## Badges
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/seu-usuario/seu-repo/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Frontend-Angular-red)](https://angular.io/)
[![.NET](https://img.shields.io/badge/Backend-.NET%209.0-blue)](https://dotnet.microsoft.com/)

## Features
- ✅ User Authentication and Authorization (JWT)
- 👤 User Registration and Login
- 💼 Full Client CRUD Management
- 🔐 Secure API Endpoints
- 📱 Responsive Angular Frontend
- 📊 Consigned Loan Tracking

## Technologies
- Backend: .NET 9.0, ASP.NET Core Web API, Entity Framework Core, Oracle Database
- Frontend: Angular 17+, Angular Material, RxJS, TypeScript, HTML5, SCSS

## Installation
```bash
# Clone the repository
git clone [your-repo-url]
cd [your-project-name]
```
### Backend
```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run
```
### Frontend
```bash
cd Frontend
npm install
ng serve --open
```
Access: [http://localhost:4200](http://localhost:4200)

## Frontend
The frontend is built with Angular and Angular Material for a modern, responsive UI for client and loan management.

### Main Features
- List, create, edit, inactivate, and delete clients
- User authentication and login
- Permission control (admin-only actions)
- Pagination, sorting, searching
- Confirmation dialogs
- Full integration with backend REST

### Technologies
- Angular 17+
- Angular Material
- RxJS
- TypeScript
- HTML5 & SCSS/CSS3

## Backend
Robust backend in .NET Core Web API, with JWT authentication, client CRUD, Oracle integration.

## Usage Examples
### Login (POST)
```http
POST /api/Auth/Login
Content-Type: application/json
{
  "email": "admin@company.com",
  "senha": "yourPassword"
}
```
### Create Client (POST)
```http
POST /api/Cliente
Authorization: Bearer {jwt_token}
Content-Type: application/json
{
  "nome": "John Smith",
  "cpf": "123.456.789-00",
  "email": "john@example.com",
  "dataContratacao": "2025-04-15T00:00:00Z"
}
```
### List Clients (GET)
```http
GET /api/Cliente
Authorization: Bearer {jwt_token}
```
### Example Response
```json
[
  {
    "id": 1,
    "nome": "John Smith",
    "cpf": "123.456.789-00",
    "email": "john@example.com",
    "ativo": true
  }
]
```

## Application Screenshots
### 1. Login Screen
[![Login](Prints/Login.png)](Prints/Login.png)
<p align="center"><i>User authentication screen.</i></p>
### 2. Create Account
[![Criar Conta](Prints/Criar%20Conta.png)](Prints/Criar%20Conta.png)
<p align="center"><i>Form for new users to register.</i></p>
### 3. User List
[![Usuários](Prints/Usuários.png)](Prints/Usuários.png)
<p align="center"><i>View of registered users.</i></p>
### 4. Client List
[![Clientes](Prints/Clientes.png)](Prints/Clientes.png)
<p align="center"><i>Registered clients, with search, pagination, actions.</i></p>
### 5. Register New Client
[![Cadastrar novo cliente](Prints/Cadastrar%20novo%20cliente.png)](Prints/Cadastrar%20novo%20cliente.png)
<p align="center"><i>Add a new client to the system.</i></p>
### 6. Edit Client
[![Editar Cliente](Prints/Editar%20Cliente.png)](Prints/Editar%20Cliente.png)
<p align="center"><i>Edit an existing client's data.</i></p>
### 7. Client Details
[![Detalhes do Cliente](Prints/Detalhes%20do%20%20Cliente.png)](Prints/Detalhes%20do%20%20Cliente.png)
<p align="center"><i>Detailed view of a client.</i></p>

## Project Structure
### Frontend
```
Frontend/
  └── src/
      └── app/
          ├── clientes/           # Client components and services
          ├── auth/               # Authentication and route guards
          └── ...                 # Other modules and components
```
### Backend
```
Backend/
  ├── Controllers/           # API Controllers
  ├── Models/                # Data Models
  ├── Service/               # Business Services
  ├── DTO/                   # Data Transfer Objects
  ├── Enums/                 # Enumerations
  └── ...
```

## Tests
- Use Swagger to test the endpoints during development.
- For automated tests, use `dotnet test`.

## Notes
- The system follows best practices for architecture and separation of concerns.
- It is recommended to configure environment variables for sensitive data in production.

---
