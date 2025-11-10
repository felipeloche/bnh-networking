## Descrição do Sistema

O BNH (Business Network Hub) é uma plataforma web fullstack desenvolvida para digitalizar e otimizar a gestão de grupos de networking profissional focados em geração de negócios. Atualmente, esses grupos enfrentam desafios significativos ao gerenciar suas operações através de planilhas Excel e controles manuais, resultando em perda de informações importantes, dificuldade no acompanhamento de métricas de performance, processos burocráticos lentos e falta de transparência nos resultados.
A solução proposta centraliza todas as operações do grupo em uma única plataforma, oferecendo um processo de admissão automatizado, gestão completa de indicações de negócios entre membros, controle de presença em reuniões, dashboards de performance individual e coletiva, módulo financeiro para controle de mensalidades e sistema de comunicação interna. Com isso, o BNH elimina a necessidade de controles manuais, facilita o acompanhamento de resultados e permite que o grupo escale suas operações de forma eficiente e transparente.

## Diagrama de Arquitetura
O diagrama abaixo ilustra a arquitetura em três camadas da aplicação: Frontend (Next.js) que se comunica via REST API com o Backend (NestJS), que por sua vez interage com o banco de dados PostgreSQL. Toda a infraestrutura roda em containers Docker orquestrados pelo Docker Compose.

## Stacks Usadas

### PostgreSQL
Oferece integridade referencial via foreign keys, suporte ACID essencial para transações financeiras, e excelente performance em queries complexas e agregações para dashboards e relatórios.

### NestJS
Selecionado pela arquitetura modular baseada em MVC e TypeScript nativo, proporcionando type-safety e redução de erros. Sua Dependency Injection facilita testes e manutenção, enquanto recursos built-in reduzem dependências externas e mantêm código consistente.

### Next.js
Escolhido pela renderização híbrida que otimiza performance de páginas públicas mantendo interatividade em áreas autenticadas. O App Router simplifica organização de rotas, e otimizações automáticas (imagens, fontes, scripts) melhoram a experiência do usuário.

## Modelo de Dados

### Diagrama ERD

### Principais Entidades e Relacionamentos

## Organização e Estrutura de Componentes
A aplicação segue uma arquitetura component-based, priorizando componentização por tipo e função ao invés de por feature. Embora uma abordagem feature-based ofereça vantagens para escalabilidade em projetos maiores, a estrutura component-based atende perfeitamente as necessidades atuais do sistema, facilitando a localização e reutilização de componentes.

**Backend (NestJS):** Organizado em módulos funcionais dentro de src/modules/, cada um contendo controller, service, entities e DTOs próprios. Os módulos principais incluem auth, users, intentions, referrals, attendance, meetings, payments, thanks, announcements e dashboard. Código compartilhado (guards, interceptors, pipes, decorators) fica em src/common/, enquanto configurações ficam em src/config/. Migrations e seeds do banco ficam em src/database/.

**Frontend (Next.js):** Utiliza o App Router com grupos de rotas organizados por nível de acesso: (public) para landing page e formulário de intenção, (auth) para login e cadastro, (dashboard) para área de membros protegida e (admin) para gestão administrativa. Componentes são separados em três categorias: ui/ (Button, Input, Card, Modal, Table, Badge - componentes base sem lógica de negócio), layout/ (Header, Sidebar, Footer, Container - estrutura e navegação), e features/ (IntentionForm, ReferralCard, MemberCard, DashboardMetrics - componentes com lógica de negócio específica do domínio). Recursos auxiliares ficam em lib/ (utilitários e cliente HTTP), hooks/ (custom hooks), contexts/ (providers globais como AuthContext) e types/ (interfaces TypeScript).

### Gerenciamento de Estado
O gerenciamento de estado é distribuído em três níveis:
**Estado Local (useState/useReducer):** Utilizado para dados temporários e interações de UI, como estado de formulários, modais abertos/fechados, tabs ativas, e validações de campo.

**Estado do Servidor (React Query/SWR):** Toda comunicação com a API é gerenciada por bibliotecas de server-state como React Query, que oferecem cache automático, revalidação em background, e estados de loading/error.

**Estado Global (Context API):** Reservado exclusivamente para informações que precisam ser acessadas em múltiplos componentes da aplicação, como dados do usuário autenticado (id, nome, role), token JWT, e preferências do usuário.

## API
Todas as rotas da API seguem o padrão REST, retornam JSON e utilizam os métodos HTTP adequados (GET, POST, PATCH, DELETE).

### Autenticação
O sistema utiliza JWT (JSON Web Tokens) para autenticação stateless, com refresh tokens para sessões de longa duração.

`POST /api/auth/login`
Realiza login do usuário. Retorna access_token, refresh_token e dados do usuário. Pode retornar 401 (credenciais inválidas), 403 com status PENDING (aguardando aprovação) ou 403 com status REJECTED (solicitação recusada).

`POST /api/auth/set-password`
Define senha inicial para usuário aprovado. Recebe email, password e password_confirmation.

`POST /api/auth/refresh`
Renova o access token usando refresh token válido.

`POST /api/auth/logout`
Invalida o refresh token atual (adiciona em blacklist). Requer autenticação.

`GET /api/auth/login`
Retorna dados do usuário autenticado. Requer autenticação.

### Intenções
Gerenciam o processo de solicitação e aprovação de novos membros.

`POST /api/intentions`

`GET /api/intentions`

`GET /api/intentions/:id`

`PATCH /api/intentions/:id/approve`

`PATCH /api/intentions/:id/reject`

### Indicações
Gerenciam o fluxo de indicações de negócios entre membros.

`POST /api/referrals`
Cria nova indicação de negócio. Recebe to_user_id, company_name, contact_name, contact_info, description e value. Requer autenticação.

`GET /api/referrals`
Lista indicações do usuário logado. Aceita filtros: type (sent/received), status, page, limit. Retorna indicações enviadas e recebidas separadamente com contadores.

`GET /api/referrals/:id`
Retorna detalhes completos de uma indicação com informações dos usuários envolvidos.

`PATCH /api/auth/login`
Atualiza status da indicação (apenas destinatário pode atualizar). Status possíveis: NEW, IN_CONTACT, CLOSED, REJECTED.

`GET /api/referrals/stats`
Retorna estatísticas de indicações do usuário. Aceita filtro de período (week/month/year/all). Retorna totais por status, taxa de sucesso e valor total fechado.

### Dashboard
Fornece métricas e dados consolidados para visualização.

`GET /api/dashboard`
Retorna dashboard com métricas principais. Aceita filtro de período. Usuário comum vê suas próprias métricas (indicações, reuniões, agradecimentos, presença, pagamentos). Admin vê métricas gerais do grupo (total de membros, indicações do mês, taxa de presença, financeiro, top performers).

### Membros

`GET /api/members`

### Pagamentos

`GET /api/payments`
Lista pagamentos. Usuário vê seus próprios, admin vê todos. Aceita filtros: status (PENDING/PAID/OVERDUE), user_id (admin only), month (YYYY-MM).

`POST /api/payments/:id/mark-paid`
Marca pagamento como pago com data (admin only). Recebe paid_date.

## Segurança
A segurança é implementada em múltiplas camadas para proteger dados sensíveis e prevenir acessos não autorizados.

**Autenticação JWT:** Access tokens com expiração curta (15min) e refresh tokens com expiração longa (7 dias). Tokens incluem user_id, role e email, assinados com HS256. Refresh tokens invalidados no logout vão para blacklist (Redis ou tabela no banco).

**Proteção de Rotas:** Frontend usa middleware do Next.js para proteger rotas autenticadas e admin. Backend usa Guards do NestJS (JwtAuthGuard para autenticação, RolesGuard para autorização, StatusGuard para bloquear usuários PENDING/REJECTED).

**Validação:** DTOs com class-validator em todos endpoints, sanitização automática de inputs e validação de tipos, formatos e regras de negócio. Senhas hasheadas com bcrypt (salt rounds = 10).

**Proteção contra ataques:** ORM com prepared statements previne SQL Injection. Sanitização de inputs e CSP headers previnem XSS. Tokens JWT no header Authorization (não em cookies) previnem CSRF. Rate limiting implementado via @nestjs/throttler (100 req/15min por IP em rotas públicas, 5 tentativas/15min para login, 1000 req/15min para rotas autenticadas). CORS configurado com whitelist de origens.

**Logs e Auditoria:** Registro de tentativas de login, alterações em dados sensíveis e acessos a recursos restritos, mantidos por 90 dias. Variáveis de ambiente com secrets nunca commitadas, validadas no startup. Headers de segurança configurados via Helmet.js.

## Infra
A infraestrutura da aplicação é totalmente containerizada utilizando Docker, facilitando deploy, escalabilidade e consistência entre ambientes de desenvolvimento e produção.

**Docker Compose:** Orquestra três containers principais que compõem a aplicação: PostgreSQL (banco de dados na porta 5432), Backend NestJS (API REST na porta 3001) e Frontend Next.js (interface web na porta 3000).

**Volumes Persistentes:** O container do PostgreSQL utiliza volumes Docker para persistir os dados do banco mesmo após reinicializações ou atualizações dos containers. Isso garante que informações de membros, indicações e mensalidades não sejam perdidas.

**Variáveis de Ambiente:** Toda configuração sensível é gerenciada através de variáveis de ambiente definidas em arquivo .env.

## Testes
A estratégia de testes segue a pirâmide com 60% testes unitários, 30% integração e 10% E2E, garantindo qualidade em todas as camadas com cobertura mínima de 80%.

**Testes Unitários:** Jest + @nestjs/testing para backend (services, validators, helpers, guards) e Jest + React Testing Library para frontend (componentes ui/, features/, hooks e utilities). Testam unidades isoladas sem dependências externas usando mocks.

**Testes de Integração:** Jest + Supertest testam fluxos completos de API (request → controller → service → database → response), incluindo validação de DTOs, guards de autenticação/autorização e respostas de erro. Usam banco em memória ou de teste.

**Testes E2E:** Playwright ou Cypress testam fluxos completos do ponto de vista do usuário (cadastro de intenção, login, criação de indicação, aprovação de intenção pelo admin, atualização de status).

**CI/CD:** Pipeline automatizado executa install, lint (ESLint + Prettier), testes unitários (backend + frontend), testes de integração, testes E2E, build e deploy (se testes passarem). Bloqueia merges se testes falharem, cobertura < 80% ou lint com erros.

**Cobertura:** Meta global de 80%, services críticos 90%, controllers 70%, componentes React 75%. Relatórios gerados via Jest (--coverage) e visualizados via Istanbul.
