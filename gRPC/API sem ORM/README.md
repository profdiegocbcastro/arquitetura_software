# Exemplo 5 - gRPC unary com PostgreSQL e SQL manual

Este projeto demonstra uma API gRPC de biblioteca usando o mesmo dominio dos exemplos de GraphQL:

- `authors`
- `books`

O objetivo aqui e mostrar uma arquitetura em camadas, mas sem ORM.
Em vez disso, os repositories usam **SQL manual** com a biblioteca `pg`.

Arquitetura utilizada:

```text
Cliente gRPC
   |
   v
Contrato libraryApi.proto
   |
   v
Controller gRPC
   |
   +--> AuthorService ------> AuthorRepository ------> PostgreSQL
   |
   `--> BookService --------> BookRepository --------> PostgreSQL
```

---

# Estrutura do projeto

```text
Exemplo PostgreSQL sem ORM
|
|-- docker-compose.yml
|-- Dockerfile
|-- package.json
|-- db
|   `-- init.sql
|-- proto
|   `-- libraryApi.proto
`-- src
    |-- client.js
    |-- server.js
    |-- database
    |   `-- postgres.js
    |-- shared
    |   |-- applicationError.js
    |   `-- toGrpcError.js
    |-- author
    |   |-- authorRepository.js
    |   `-- authorService.js
    |-- book
    |   |-- bookRepository.js
    |   `-- bookService.js
    `-- library
        `-- libraryController.js
```

---

# Descricao dos arquivos

## db/init.sql

Cria as duas tabelas usadas no exemplo:

- `authors`
- `books`

Tambem insere os mesmos autores e livros usados nos exemplos GraphQL.

---

## proto/libraryApi.proto

Define o contrato gRPC da biblioteca.

Neste contrato existem operacoes para:

- listar autores
- buscar um autor
- criar um autor
- listar livros
- buscar um livro
- listar livros por autor
- criar um livro

---

## src/database/postgres.js

Centraliza a conexao com o PostgreSQL usando `Pool`.

Os repositories recebem esse pool e executam consultas SQL sem expor detalhes de conexao para as outras camadas.

---

## src/author/*.js

Contem a camada de autor:

- `authorRepository.js`: acesso SQL a tabela `authors`
- `authorService.js`: validacoes e regras de negocio do autor

---

## src/book/*.js

Contem a camada de livro:

- `bookRepository.js`: acesso SQL a tabela `books` com `JOIN` em `authors`
- `bookService.js`: validacoes e regras de negocio do livro

---

## src/library/libraryController.js

Representa a camada gRPC.

Essa controller:

- le os dados recebidos em `call.request`
- escolhe o service correto
- converte exceções para o formato esperado pelo gRPC

---

# Como executar

1. Suba o PostgreSQL:

```bash
docker compose up -d
```

2. Instale as dependencias:

```bash
npm install
```

3. Inicie o servidor gRPC:

```bash
npm run server
```

4. Em outro terminal, execute o cliente:

```bash
npm run client
```

---

# Observacao importante

Por padrão, a aplicação local usa:

- `DB_HOST=localhost`
- `DB_PORT=5433`
- `DB_NAME=grpc_library`

Se quiser mudar isso, exporte as variaveis de ambiente antes de iniciar o servidor.
