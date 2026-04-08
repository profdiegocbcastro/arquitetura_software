# `base-example` — API GraphQL simples com PostgreSQL

Este projeto demonstra a construção de uma **API GraphQL simples** conectada a um **banco de dados PostgreSQL**, utilizando **Node.js, Express e Apollo Server**.

O objetivo deste exemplo é apresentar os **conceitos básicos do GraphQL**, mantendo uma arquitetura simples onde os resolvers acessam o banco de dados diretamente.

Arquitetura utilizada:

```
Cliente
   ↓
API GraphQL (Express + Apollo Server)
   ↓
PostgreSQL
```

---

# Estrutura do projeto

```
base-example
│
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
│
├─ db
│  └─ init.sql
│
└─ src
   ├─ index.js
   ├─ db.js
   └─ book.graphql
```

---

# Descrição dos arquivos

### docker-compose.yml

Define os containers da aplicação:

* **db**: container do PostgreSQL
* **api**: container que executa a aplicação Node.js com o servidor GraphQL

Também configura variáveis de ambiente e volumes de persistência.

---

### Dockerfile

Define como a imagem da aplicação Node.js é construída.

Instala as dependências do projeto e inicia o servidor GraphQL.

---

### package.json

Lista as dependências da aplicação e scripts de execução.

Principais bibliotecas utilizadas:

* `@apollo/server`
* `graphql`
* `express`
* `pg`

---

### db/init.sql

Script executado automaticamente quando o banco é inicializado.

Responsável por:

* criar a tabela `books`
* inserir alguns registros iniciais para teste

---

### src/db.js

Configura a conexão com o PostgreSQL utilizando um **connection pool**.

As configurações são obtidas através de variáveis de ambiente.

---

### src/book.graphql

Define o **schema GraphQL da aplicação**.

Contém:

* o tipo `Book`
* a query `books`
* a mutation `addBook`

Este arquivo representa o **contrato da API**.

---

### src/index.js

Arquivo principal da aplicação.

Responsável por:

* iniciar o servidor Express
* iniciar o Apollo Server
* carregar o schema GraphQL
* definir os resolvers
* executar consultas SQL no banco

Neste exemplo, os resolvers ficam no próprio `src/index.js`, sem uma pasta separada de `resolvers`.

---

# Como executar o projeto

1. Inicie os containers com Docker:

```
docker compose up --build
```

2. A API GraphQL ficará disponível em:

```
http://localhost:4000/graphql
```

---

# Exemplos de uso

### Query — listar livros

```
query {
  books {
    id
    title
    author
    available
  }
}
```

### Mutation — adicionar livro

```
mutation {
  addBook(title: "Clean Code", author: "Robert Martin") {
    id
    title
  }
}
```
