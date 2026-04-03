# Exemplo 6 - gRPC unary com PostgreSQL e Prisma ORM

Este projeto demonstra a mesma biblioteca dos exemplos GraphQL, agora usando:

- `authors`
- `books`
- `Prisma ORM`
- `gRPC unary`

O foco aqui e mostrar a diferenca entre:

- acessar o banco com SQL manual
- acessar o banco com um ORM

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
   +--> AuthorService ------> AuthorRepository ------> Prisma ------> PostgreSQL
   |
   `--> BookService --------> BookRepository --------> Prisma ------> PostgreSQL
```

---

# Estrutura do projeto

```text
Exemplo PostgreSQL com Prisma
|
|-- docker-compose.yml
|-- Dockerfile
|-- package.json
|-- prisma
|   |-- schema.prisma
|   `-- seed.js
|-- proto
|   `-- libraryApi.proto
`-- src
    |-- client.js
    |-- server.js
    |-- prisma.js
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

## prisma/schema.prisma

Define as entidades da aplicação:

- `Author`
- `Book`

Tambem descreve o relacionamento entre elas.

---

## prisma/seed.js

Insere os autores e livros iniciais do exemplo.

Assim o aluno pode subir o projeto e testar a API imediatamente.

---

## src/prisma.js

Centraliza a criacao do `PrismaClient`.

Essa instância é injetada nos repositories, evitando que o restante da aplicação dependa diretamente do ORM.

---

## src/author/*.js

Contem a camada de autor:

- `authorRepository.js`: operacoes com Prisma para `Author`
- `authorService.js`: validacoes e regras de negocio

---

## src/book/*.js

Contem a camada de livro:

- `bookRepository.js`: operacoes com Prisma para `Book`
- `bookService.js`: validacoes e regra de negocio

---

## src/library/libraryController.js

Faz a ponte entre o contrato gRPC e os services.

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

3. Gere o client do Prisma, sincronize o schema e rode o seed:

```bash
npm run db:setup
```

4. Inicie o servidor gRPC:

```bash
npm run server
```

5. Em outro terminal, execute o cliente:

```bash
npm run client
```
