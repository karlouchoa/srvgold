# SRVGold – Documentação Técnica

## 1. Visão Geral
O projeto **SRVGold** é uma API multi-tenant construída com [NestJS](https://nestjs.com/) e [Prisma](https://www.prisma.io/) para atender diferentes clientes (tenants) utilizando o mesmo código base, mas bancos de dados isolados. A aplicação inclui infraestrutura para criação de novos tenants, roteamento dinâmico de conexões e módulos de domínio que manipulam entidades legadas do ERP.

## 2. Arquitetura e Tecnologias
- **Runtime:** Node.js 20 (requer >= 18).
- **Framework:** NestJS 11 com organização modular (controllers, services e DTOs).
- **ORM:** Prisma 6 com dois schemas:
  - `prisma/schema.prisma`: banco "main" com a tabela `Tenant`.
  - `prisma/erp.prisma`: espelha a base legada (centenas de tabelas) para cada tenant.
- **Banco de Dados:** PostgreSQL multi-base. Existe um banco principal com metadata (`Tenant`) e um banco por cliente (nomeado `tenant_<slug>`), clonado a partir do template `goldpdv`.
- **Configuração:** Variáveis de ambiente carregadas via `@nestjs/config`. O `TenantPrismaManager` monta as strings de conexão dinamicamente.
- **Middleware:** `TenantContextMiddleware` injeta automaticamente o `PrismaClient` do tenant com base no header `x-tenant` ou no subdomínio do host.

## 3. Estrutura de Pastas e Responsabilidades
```
src/
├── app.module.ts
├── main.ts
├── prisma.service.ts
├── tenant-prisma.manager.ts
├── middleware/
│   └── tenant-context.middleware.ts
├── tenants/
│   ├── tenants.controller.ts
│   ├── tenants.module.ts
│   └── tenants.service.ts
├── t_cli/
├── t_emp/
├── t_usere/
└── t_users/
```
| Pasta / Arquivo | Importância para o projeto |
|-----------------|----------------------------|
| `src/app.module.ts` | Declara todos os módulos, providers globais e aplica o middleware multi-tenant; é o ponto central da configuração Nest. |
| `src/main.ts` | Responsável pelo bootstrap da aplicação, incluindo CORS e definição da porta HTTP. |
| `src/prisma.service.ts` | Exposição do `PrismaClient` conectado ao banco principal; base para consultas à tabela `Tenant`. |
| `src/tenant-prisma.manager.ts` | Cria e cacheia `PrismaClient` por tenant; evita recriação de conexões e garante isolamento entre bancos. |
| `src/middleware/tenant-context.middleware.ts` | Resolve o tenant a partir do request e injeta o client correto; sem ele os services não conseguem acessar o banco certo. |
| `src/tenants/` | Endpoint, serviço e módulo para criação de novos tenants físicos e registro na tabela `Tenant`. |
| `src/t_cli/`, `src/t_emp/`, `src/t_usere/`, `src/t_users/` | Módulos de domínio que expõem CRUDs sobre entidades legadas; demonstram o padrão de implementação que deve ser seguido por novos módulos multi-tenant. |
| `prisma/` | Contém os schemas principais (`schema.prisma` e `erp.prisma`) e o código gerado em `prisma/generated/erp`, essenciais para o acesso tipado aos bancos. |
| `scripts/` | Automação em Node/TS, incluindo `migrate-tenants.ts` e `export-doc-pdf.ts`, úteis para manutenção dos bancos e geração de documentação. |
| `docs/` | Repositório dos artefatos de documentação (Markdown, PDF, DOCX). |
| `test/` | Base para testes automáticos (unitários e e2e) seguindo o padrão do Nest. |

Manter esta estrutura organizada facilita a escalabilidade do projeto, pois novos módulos podem ser criados replicando o padrão existente e o comportamento multi-tenant permanece transparente.

## 4. Configuração de Ambiente
1. **Instalar dependências**
   ```bash
   npm install
   ```
2. **Gerar clientes Prisma** (necessário após alterar schemas ou instalar o projeto):
   ```bash
   npx prisma generate
   ```
3. **Variáveis de ambiente** (arquivo `.env` na raiz):
   - `DATABASE_URL`: conexão com o banco principal (main).
   - `ERP_TEMPLATE_URL`: conexão com o banco template utilizada por scripts.
   - `BASE_PG_URL`: prefixo da URL PostgreSQL para montar conexões dos tenants.
   - `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`: credenciais administrativas usadas para criar/clonar bancos.
   - `PG_SUPER_DB` (opcional, padrão `postgres`): banco acessado pelo usuário administrativo.
   - `PG_TEMPLATE` (opcional, padrão `goldpdv`): nome do banco template clonado.
   - `PORT` (opcional): porta HTTP exposta pelo Nest (padrão 3000).

> **Segurança:** mantenha credenciais fora do controle de versão (adicione `.env` ao `.gitignore`) e rotacione senhas em ambientes compartilhados.

## 5. Execução e Scripts Úteis
- Desenvolvimento (watch mode)
  ```bash
  npm run start:dev
  ```
- Execução simples (sem hot-reload)
  ```bash
  npm run start
  ```
- Build de produção + execução
  ```bash
  npm run build && npm run start:prod
  ```
- Testes
  ```bash
  npm run test        # unit
  npm run test:e2e    # end-to-end
  npm run test:cov    # cobertura
  ```
- Migração dos tenants existentes (sincroniza o schema ERP em todos os bancos)
  ```bash
  npm run migrate:tenants
  ```
  O script `scripts/migrate-tenants.ts` lê todos os registros de `Tenant` no banco main, monta URLs com `BASE_PG_URL` e executa `prisma db push --schema=prisma/erp.prisma` para cada banco físico.

## 6. Multi-Tenancy em Detalhes
1. **Registro de tenant** – `POST /tenants` chama `TenantsService.createTenant`, que:
   - evita slug duplicado consultando o banco main;
   - cria um banco novo via `pg.Pool` clonando o template (`CREATE DATABASE ... WITH TEMPLATE ...`);
   - registra `name`, `slug` e `db_name` na tabela `Tenant`.
2. **Resolução do tenant em runtime**
   - `TenantContextMiddleware` lê `x-tenant` ou o subdomínio, busca o registro no banco main (`PrismaService`) e anexa ao request:
     - `tenantId` (ID numérico do tenant);
     - `tenantClient` (`PrismaClient` da base do tenant, obtido pelo `TenantPrismaManager`).
   - Controllers recebem `RequestWithPrisma` e delegam aos services utilizando o cliente correto.
3. **Gerenciamento de conexões**
   - `TenantPrismaManager` memoiza `Promise<PrismaClient>` por `dbName`, evitando condições de corrida ao criar múltiplos clientes simultâneos.
   - O hook `onModuleDestroy` fecha essas conexões de forma controlada quando a aplicação é encerrada.

## 7. Módulos de Domínio (exemplos)
- **t_users** (`src/t_users`)
  - CRUD completo sobre `t_users` (entidade legada com atributos como `cdusu`, `deusu`, `email`).
  - DTOs (`CreateTUsersDto`, `UpdateTUsersDto`) com validações `class-validator`.
- **t_usere** (`src/t_usere`)
  - Controlador e serviço expõem operações CRUD sobre `t_usere` (relaciona usuários a empresas).
  - DTOs alinhados com o schema Prisma: `id` é UUID opcional, `codusu` e `codemp` são obrigatórios, `autocod` é opcional.
- **t_cli**, **t_emp**, **t_comanda** e outros
  - Seguem o padrão Nest: módulo registra controller/service; controller recebe `RequestWithPrisma` e encaminha ao service; DTOs usam `class-validator`.

## 8. Camada de Dados
- **Banco principal (`Tenant`)**: gerenciado por `PrismaService` (extende `PrismaClient`). Schema definido em `prisma/schema.prisma`.
- **Banco ERP**: schema extenso (`prisma/erp.prisma`) com centenas de modelos. O cliente é gerado em `prisma/generated/erp` via `prisma generate`.
- **Acesso**: serviços trabalham com o `PrismaClient` passado pelo middleware, garantindo isolamento por tenant.

## 9. Observabilidade e Logs
- `TenantPrismaManager` configura logs de nível `warn` para o Prisma multi-tenant (ajustável conforme necessidade).
- Recomenda-se integrar `nestjs-pino` ou interceptors de logging para registrar `tenantId` em cada requisição.

## 10. Boas Práticas e Próximos Passos
- Adicionar guards/interceptors para controle de acesso específico por tenant e auditoria.
- Considerar o uso de `prisma migrate` para versionar mudanças no schema ERP de forma rastreável.
- Expandir cobertura de testes unitários e e2e para middleware e fluxos multi-tenant.
- Criar pipelines CI/CD que executem build, testes e o script de migração em ambientes de staging.
- Armazenar segredos em _secret managers_ (AWS Secrets Manager, Vault, etc.) e restringir acesso ao banco template.

## 11. APIs Disponibilizadas
Todas as rotas (exceto `GET /`) exigem o header `x-tenant` com o slug do tenant ou uma requisição via subdomínio configurado.

| Módulo | Método | Rota | Descrição |
|--------|--------|------|-----------|
| Core | `GET` | `/` | Resposta de saúde simples ("hello world"). |
| Tenants | `POST` | `/tenants` | Cria um novo tenant físico (clona banco template) e registra nome/slug no banco principal. |
| t_users | `POST` | `/t_users` | Cria usuário ERP no banco do tenant. |
| t_users | `GET` | `/t_users` | Lista usuários do tenant. |
| t_users | `GET` | `/t_users/:id` | Retorna usuário pelo ID UUID. |
| t_users | `PUT` | `/t_users/:id` | Atualiza todos os campos do usuário. |
| t_users | `PATCH` | `/t_users/:id` | Atualização parcial. |
| t_users | `DELETE` | `/t_users/:id` | Remove usuário. |
| t_usere | `POST` | `/t_usere` | Cria vínculo usuário ↔ empresa. |
| t_usere | `GET` | `/t_usere` | Lista vínculos. |
| t_usere | `GET` | `/t_usere/:id` | Detalha vínculo. |
| t_usere | `PUT` | `/t_usere/:id` | Atualiza vínculo. |
| t_usere | `PATCH` | `/t_usere/:id` | Atualização parcial. |
| t_usere | `DELETE` | `/t_usere/:id` | Remove vínculo. |
| t_cli | `POST` | `/t_cli` | Cria cliente. |
| t_cli | `GET` | `/t_cli` | Lista clientes. |
| t_cli | `GET` | `/t_cli/:id` | Detalha cliente. |
| t_cli | `PUT` | `/t_cli/:id` | Atualiza cliente (full). |
| t_cli | `PATCH` | `/t_cli/:id` | Atualiza cliente (parcial). |
| t_cli | `DELETE` | `/t_cli/:id` | Remove cliente. |
| t_emp | `POST` | `/t_emp` | Cria empresa. |
| t_emp | `GET` | `/t_emp` | Lista empresas. |
| t_emp | `GET` | `/t_emp/:id` | Detalha empresa. |
| t_emp | `PUT` | `/t_emp/:id` | Atualiza empresa (full). |
| t_emp | `PATCH` | `/t_emp/:id` | Atualiza empresa (parcial). |
| t_emp | `DELETE` | `/t_emp/:id` | Remove empresa. |

---
Documento atualizado automaticamente pelo Codex CLI.
