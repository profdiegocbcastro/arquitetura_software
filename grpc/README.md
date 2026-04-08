# gRPC - Exemplos práticos

Esta pasta reúne exemplos introdutórios de **gRPC com Node.js**, mostrando como o protocolo pode ser utilizado em diferentes formatos de comunicação entre cliente e servidor.

O objetivo aqui é apresentar, de forma progressiva, os principais estilos de RPC suportados pelo gRPC:

- **Unary RPC**: uma requisição e uma resposta
- **Server Streaming**: uma requisição e várias respostas
- **Client Streaming**: várias mensagens do cliente e uma resposta final
- **Bidirectional Streaming**: cliente e servidor trocam mensagens continuamente

Arquitetura geral utilizada nos exemplos:

```text
Cliente
   |
   v
Contrato .proto
   |
   v
Servidor gRPC
```

---

# Estrutura da pasta

```text
grpc
|
|-- base-example
|   |-- proto
|   |   `-- bookStore.proto
|   `-- src
|       |-- client.js
|       |-- server.js
|       `-- Book
|           |-- Datasource.js
|           |-- Service.js
|           `-- Implementation.js
|
|-- simple-streaming
|   |-- proto
|   |   `-- calculadora.proto
|   `-- src
|       |-- server.js
|       |-- clientFibo.js
|       `-- clientSum.js
|
|-- chat-streaming
|   |-- proto
|   |   `-- chat.proto
|   `-- src
|       |-- server.js
|       `-- client.js
|
|-- no-orm-api
|   |-- db
|   |   `-- init.sql
|   |-- proto
|   |   `-- libraryApi.proto
|   `-- src
|       |-- client.js
|       |-- server.js
|       |-- database
|       |   `-- postgres.js
|       |-- shared
|       |   |-- applicationError.js
|       |   `-- toGrpcError.js
|       |-- author
|       |   |-- authorRepository.js
|       |   `-- authorService.js
|       |-- book
|       |   |-- bookRepository.js
|       |   `-- bookService.js
|       `-- library
|           `-- libraryController.js
|
`-- orm-api
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

# Descrição dos exemplos

## `base-example`

Apresenta um serviço gRPC tradicional, no estilo **request/response**.

Este exemplo simula uma pequena API de livros com operações para:

- criar um livro
- buscar um livro pelo ID
- listar todos os livros

Também mostra uma pequena separação em camadas:

- **Datasource**: persistência em memória
- **Service**: lógica da aplicação
- **Implementation**: adaptação entre gRPC e a camada de serviço

---

## `simple-streaming`

Apresenta dois tipos de streaming:

- **Server Streaming** com a geração da sequência de Fibonacci
- **Client Streaming** com o envio de vários números para soma

Esse exemplo é útil para enxergar a diferença entre:

- um servidor que envia vários eventos ao cliente
- um cliente que envia várias mensagens antes da resposta final

---

## `chat-streaming`

Apresenta **streaming bidirecional**.

Cada cliente abre um canal com o servidor e pode:

- enviar mensagens continuamente
- receber mensagens enviadas por outros clientes

Na prática, o servidor funciona como um pequeno broadcast em memória.

---

## `no-orm-api`

Apresenta o domínio de **authors** e **books** persistindo dados em um **PostgreSQL real**.

Esse exemplo destaca:

- uso de `pg` com SQL manual
- tabelas `authors` e `books`
- `JOIN` para carregar o autor de cada livro
- Docker Compose para subir o banco
- separação em `libraryController`, `services`, `repositories` e camada `shared`

---

## `orm-api`

Apresenta o mesmo domínio de **authors** e **books** com **PostgreSQL + Prisma ORM**.

Esse exemplo destaca:

- modelagem do banco em `prisma/schema.prisma`
- relacionamento entre `Author` e `Book`
- repositories usando Prisma em vez de SQL manual
- seed inicial com os mesmos dados dos exemplos GraphQL
- separação em `libraryController`, `services`, `repositories` e camada `shared`

---

# Como executar

Cada exemplo possui seu próprio `package.json`.

Entre na pasta desejada, instale as dependências e execute os scripts:

```bash
npm install
npm run server
```

Em outro terminal, execute o cliente correspondente.

Exemplos:

```bash
cd grpc/base-example
npm run client
```

```bash
cd grpc/simple-streaming
npm run clientFibo
```

```bash
cd grpc/simple-streaming
npm run clientSum
```

```bash
cd grpc/no-orm-api
npm run client
```

```bash
cd grpc/orm-api
npm run client
```

```bash
cd grpc/chat-streaming
node src/client.js Gabriel
```

Os exemplos `no-orm-api` e `orm-api` também possuem `docker-compose.yml` para subir o PostgreSQL localmente.

---

# Observação importante

Os exemplos carregam os arquivos `.proto` usando `process.cwd()`.

Por isso, os comandos devem ser executados a partir da pasta de cada exemplo. Se você executar o arquivo de outro diretório, o caminho do contrato `.proto` pode não ser encontrado corretamente.
