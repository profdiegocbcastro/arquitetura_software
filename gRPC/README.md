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
|-- Streaming Simples
|   |-- proto
|   |   `-- calculadora.proto
|   `-- src
|       |-- server.js
|       |-- clientFibo.js
|       `-- clientSum.js
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
cd "gRPC/Chat Streaming"
node src/client.js Gabriel
```

---

# Observação importante

Os exemplos carregam os arquivos `.proto` usando `process.cwd()`.

Por isso, os comandos devem ser executados a partir da pasta de cada exemplo. Se você executar o arquivo de outro diretório, o caminho do contrato `.proto` pode não ser encontrado corretamente.
