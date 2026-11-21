# Evolução de API REST: Refatoração para Arquitetura MVC

**Disciplina:** Programação Web III (PW3) • Atividade Prática 02  
**Aluno:** Giovanni  
**Turma:** PW3  

API REST desenvolvida em Node.js com Express e MariaDB, refatorada seguindo o padrão arquitetural **MVC (Model-View-Controller)**.

---

## Arquitetura MVC Adotada

A refatoração separou as responsabilidades do sistema em camadas desacopladas, eliminando consultas diretas ao banco no arquivo de inicialização:

- **`config/db.js`**: Gerencia a criação do pool de conexões com o MySQL/MariaDB utilizando a biblioteca `mysql2/promise` e carrega as variáveis de ambiente com `dotenv`.
- **`models/usuarioModel.js`**: Camada de dados responsável exclusivamente por executar instruções SQL (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) com queries parametrizadas (placeholders `?`) contra SQL Injection.
- **`controllers/usuarioController.js`**: Camada de controle que recebe as requisições (`req`), valida os dados de entrada, aciona a `usuarioModel` e devolve a resposta HTTP adequada com status correspondente (`res`).
- **`routes/usuarioRoutes.js`**: Define os endpoints REST através do `express.Router()` e mapeia cada verbo HTTP ao método do respectivo controller.
- **`server.js`**: Ponto de entrada da aplicação, responsável apenas pela configuração de middlewares (`cors`, `express.json`), registro das rotas e inicialização do servidor HTTP.
- **Camada View**: Como se trata de uma API REST backend, a resposta estruturada em JSON retornada pelo Express cumpre o papel da View.

---

## Estrutura de Pastas

```text
├── src/
│   ├── config/
│   │   └── db.js                # Pool de conexão com MySQL
│   ├── models/
│   │   └── usuarioModel.js      # Consultas SQL isoladas
│   ├── controllers/
│   │   └── usuarioController.js # Lógica de requisição e resposta
│   ├── routes/
│   │   └── usuarioRoutes.js     # Definição dos endpoints REST
│   └── server.js                # Configuração de middlewares e subida do servidor
├── .env.example                 # Modelo de variáveis de ambiente sem senhas reais
├── .gitignore                   # Bloqueio de node_modules/ e .env
├── package.json                 # Dependências e scripts
├── schema.sql                   # Script de criação do banco e tabela
└── README.md                    # Documentação do projeto
```

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **mysql2** (Pool de conexões e Promises)
- **dotenv**
- **cors**

---

## Como Rodar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/nome-do-aluno-API-node-mvc.git
cd nome-do-aluno-API-node-mvc
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```
Preencha os dados do banco de dados no arquivo `.env`.

### 4. Criar o Banco de Dados e a Tabela
Execute o script `schema.sql` no seu banco MySQL/MariaDB:
```bash
mysql -u root -p < schema.sql
```

### 5. Iniciar o Servidor
```bash
npm run watch
```
Servidor disponível em: `http://localhost:3002`

---

## Endpoints da API

| Método | Rota | Descrição | Status Sucesso |
|---|---|---|---|
| `POST` | `/usuarios` | Cadastra um novo usuário (`nome`, `email`) | `201 Created` |
| `GET` | `/usuarios` | Lista todos os usuários cadastrados | `200 OK` |
| `PUT` | `/usuarios/:id` | Atualiza dados do usuário por ID | `200 OK` |
| `DELETE` | `/usuarios/:id` | Remove o usuário por ID | `200 OK` |
