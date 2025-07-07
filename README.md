# Sistema de Gestão de Empréstimos Consignados

## 🗺️ Visão Geral da Arquitetura

Este projeto é dividido em três grandes partes:

- **Backend**: API desenvolvida em .NET (C#), responsável pela lógica de negócio, autenticação, regras e comunicação com o banco de dados Oracle.
- **Frontend**: Aplicação web feita em Angular, onde o usuário interage com o sistema de forma visual e intuitiva.
- **Banco de Dados**: Oracle Database, onde ficam armazenados os dados dos clientes, empréstimos, usuários, etc.

A comunicação entre frontend e backend é feita via API REST (requisições HTTP). O backend se conecta ao banco Oracle usando Entity Framework Core.

## 🚀 Stack Tecnológica

- **Backend:** .NET 9.0, ASP.NET Core Web API, Entity Framework Core
- **Frontend:** Angular 17+, Angular Material, TypeScript, RxJS
- **Banco de Dados:** Oracle XE (Express Edition)
- **Outros:** Docker, Docker Compose, Swagger, SCSS

## 🐳 Uso do Docker

O Docker é utilizado para facilitar a execução do projeto, criando containers para o banco Oracle, backend e frontend. Assim, você não precisa instalar cada tecnologia separadamente na sua máquina.

- O arquivo `docker-compose.yml` orquestra todos os serviços.
- Cada parte (backend, frontend, banco) tem seu próprio `Dockerfile`.

## 🏗️ Mapa Simplificado da Arquitetura

```
Raiz do Projeto
│
├── Backend/
│   └── WebAPI_EmprestimoConsignado/
│       ├── Controllers/      # Endpoints da API (ex: ClienteController.cs)
│       ├── Models/           # Modelos de dados (ex: ClienteModel.cs, EmprestimoModel.cs)
│       ├── Service/          # Lógica de negócio (ex: ClienteService.cs)
│       ├── DTO/              # Objetos de transferência de dados
│       ├── Enums/            # Enumerações usadas nos modelos
│       ├── DataContext/      # Configuração do acesso ao banco
│       ├── Migrations/       # Histórico de migrações do banco
│       └── ...
│
├── Frontend/
│   └── src/
│       └── app/
│           ├── clientes/     # Componentes e serviços de clientes
│           ├── auth/         # Autenticação e guarda de rotas
│           ├── dashboard/    # Dashboard e gráficos
│           ├── shared/       # Componentes reutilizáveis
│           └── ...
│
├── scripts/                  # Scripts SQL para criação do banco
├── docker-compose.yml        # Orquestração dos containers
└── README.md                 # Este arquivo
```

## 🧩 Como Funciona a Arquitetura

1. **Usuário acessa o Frontend (Angular)** pelo navegador.
2. O Frontend faz requisições HTTP para o Backend (API .NET).
3. O Backend processa as regras, acessa o banco Oracle e retorna os dados para o Frontend.
4. O usuário visualiza, cadastra, edita ou exclui informações pela interface web.

## 💡 Dicas para Iniciantes

- Sempre inicie o projeto pelo Docker se não quiser instalar tudo manualmente.
- Use o Swagger (http://localhost:8080/swagger) para testar a API.
- O banco Oracle pode demorar alguns minutos para iniciar no primeiro uso.
- O frontend fica disponível em http://localhost:4200.
- Para criar as tabelas, use as migrations do Entity Framework ou rode o script SQL fornecido.

## 📚 Exemplos de Pastas e Arquivos Importantes

- **Backend/WebAPI_EmprestimoConsignado/Controllers/ClienteController.cs**: Endpoints para operações com clientes.
- **Backend/WebAPI_EmprestimoConsignado/Models/ClienteModel.cs**: Estrutura dos dados de cliente.
- **Frontend/src/app/clientes/**: Componentes Angular para cadastro, listagem e edição de clientes.

---

(As demais instruções de instalação, uso e detalhes já estão descritas nas seções abaixo do README.)
