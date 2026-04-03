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
|-- Exemplo Base
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
|-- Exemplo API em Camadas
|   |-- proto
|   |   `-- orderApi.proto
|   `-- src
|       |-- client.js
|       |-- server.js
|       |-- database
|       |   |-- catalogDatabase.js
|       |   `-- orderDatabase.js
|       |-- product
|       |   `-- productRepository.js
|       |-- shared
|       |   |-- applicationError.js
|       |   `-- toGrpcError.js
|       `-- order
|           |-- orderController.js
|           |-- orderRepository.js
|           `-- orderService.js
|
|-- Exemplo PostgreSQL sem ORM
|   |-- db
|   |   `-- init.sql
|   |-- proto
|   |   `-- libraryApi.proto
|   `-- src
|       |-- client.js
|       |-- server.js
|       |-- database
|       |   `-- postgres.js
|       |-- author
|       |   |-- authorRepository.js
|       |   `-- authorService.js
|       |-- book
|       |   |-- bookRepository.js
|       |   `-- bookService.js
|       `-- library
|           `-- libraryController.js
|
|-- Exemplo PostgreSQL com Prisma
|   |-- prisma
|   |   |-- schema.prisma
|   |   `-- seed.js
|   |-- proto
|   |   `-- libraryApi.proto
|   `-- src
|       |-- client.js
|       |-- server.js
|       |-- prisma.js
|       |-- author
|       |   |-- authorRepository.js
|       |   `-- authorService.js
|       |-- book
|       |   |-- bookRepository.js
|       |   `-- bookService.js
|       `-- library
|           `-- libraryController.js
|
|-- Streaming Simples
|   |-- proto
|   |   `-- calculadora.proto
|   `-- src
|       |-- server.js
|       |-- clientFibo.js
|       `-- clientSum.js
|
|-- Exemplo Duas APIs
|   |-- proto
|   |   |-- authorApi.proto
|   |   `-- bookApi.proto
|   `-- src
|       |-- client.js
|       |-- author
|       |   |-- authorController.js
|       |   |-- authorDatabase.js
|       |   |-- authorRepository.js
|       |   |-- authorService.js
|       |   `-- server.js
|       `-- book
|           |-- authorGateway.js
|           |-- bookController.js
|           |-- bookDatabase.js
|           |-- bookRepository.js
|           |-- bookService.js
|           `-- server.js
|
`-- Chat Streaming
    |-- proto
    |   `-- chat.proto
    `-- src
        |-- server.js
        `-- client.js
```

---

# Descrição dos exemplos

## Exemplo Base

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

## Streaming Simples

Apresenta dois tipos de streaming:

- **Server Streaming** com a geração da sequência de Fibonacci
- **Client Streaming** com o envio de vários números para soma

Esse exemplo é útil para enxergar a diferença entre:

- um servidor que envia vários eventos ao cliente
- um cliente que envia várias mensagens antes da resposta final

---

## Exemplo API em Camadas

Apresenta um caso unary mais próximo de uma API de negócio.

O serviço modela um fluxo de pedidos com:

- criação de pedido
- consulta por ID
- listagem por cliente
- atualização de status
- validação de entrada
- mapeamento de erros para códigos gRPC

Também amplia a separação em camadas:

- **Controller**: adaptação entre gRPC e a aplicação
- **OrderService**: regras de negócio e transições de status
- **OrderRepository**: acesso ao `orderDatabase`
- **ProductRepository**: acesso ao `catalogDatabase`

---

## Chat Streaming

Apresenta **streaming bidirecional**.

Cada cliente abre um canal com o servidor e pode:

- enviar mensagens continuamente
- receber mensagens enviadas por outros clientes

Na prática, o servidor funciona como um pequeno broadcast em memória.

---

## Exemplo PostgreSQL sem ORM

Apresenta o dominio de **authors** e **books** persistindo dados em um **PostgreSQL real**.

Esse exemplo destaca:

- uso de `pg` com SQL manual
- tabelas `authors` e `books`
- `JOIN` para carregar o autor de cada livro
- Docker Compose para subir o banco

---

## Exemplo PostgreSQL com Prisma

Apresenta o mesmo dominio de **authors** e **books** com **PostgreSQL + Prisma ORM**.

Esse exemplo destaca:

- modelagem do banco em `schema.prisma`
- relacionamento entre `Author` e `Book`
- repositories usando Prisma em vez de SQL manual
- seed inicial com os mesmos dados dos exemplos GraphQL

---

## Exemplo Duas APIs

Apresenta uma comunicação **API para API** usando gRPC.

Nesse cenário:

- a `AuthorApi` cuida dos autores
- a `BookApi` cuida dos livros
- a `BookApi` chama a `AuthorApi` por gRPC para validar e enriquecer os dados do autor

É um bom ponto de partida para discutir contratos separados, responsabilidades separadas e integrações entre serviços.

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
cd "gRPC/Exemplo Base"
npm run client
```

```bash
cd "gRPC/Streaming Simples"
npm run clientFibo
```

```bash
cd "gRPC/Exemplo API em Camadas"
npm run client
```

```bash
cd "gRPC/Exemplo PostgreSQL sem ORM"
npm run client
```

```bash
cd "gRPC/Exemplo PostgreSQL com Prisma"
npm run client
```

```bash
cd "gRPC/Exemplo Duas APIs"
npm run client
```

```bash
cd "gRPC/Chat Streaming"
node src/client.js Gabriel
```

---

# Observação importante

Os exemplos carregam os arquivos `.proto` usando `process.cwd()`.

Por isso, os comandos devem ser executados a partir da pasta de cada exemplo. Se você executar o arquivo de outro diretório, o caminho do contrato `.proto` pode não ser encontrado corretamente.
