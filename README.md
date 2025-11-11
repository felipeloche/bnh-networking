# BNH - Business Network Hub

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow">
  <img alt="Tecnologia Principal" src="https://img.shields.io/badge/tech-NestJS%20%26%20Next.js-blueviolet">
  <img alt="Licença" src="https://img.shields.io/badge/license-MIT-green">
</p>

O **BNH (Business Network Hub )** é uma plataforma web fullstack para digitalizar e otimizar a gestão de grupos de networking profissional. O objetivo é centralizar o fluxo de admissão, gerenciamento de indicações e métricas de performance, substituindo processos manuais.

Para uma visão aprofundada sobre as decisões de tecnologia, modelo de dados e padrões de arquitetura, consulte o documento **[arquitetura.md](./arquitetura.md)**.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

*   **Node.js** (versão 18 ou superior)
*   **Docker**

### Guia de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/felipeloche/bnh-networking.git
    cd bnh-networking
    ```

2.  **Inicie o banco de dados:**
    ```bash
    docker run --name postgres-bnh -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=bnh -p 5432:5432 -d postgres
    ```

3.  **Configure e inicie o Backend (em um terminal ):**
    ```bash
    cd backend
    npm install
    cp .env.example .env # Crie o arquivo de ambiente
    npm run seed         # Crie o usuário admin
    npm run start:dev
    ```

4.  **Configure e inicie o Frontend (em outro terminal):**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Acessos

*   **Aplicação:** [http://localhost:3000](http://localhost:3000 )
*   **API:** `http://localhost:3001`
*   **Login Admin:** `admin@bnh.com` / `admin123`

---

### Testes

Para executar os testes automatizados de cada aplicação:

```bash
# Testes do Backend
cd backend && npm test

# Testes do Frontend
cd frontend && npm test
