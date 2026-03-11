# Exemplo 4 - gRPC unary com camadas simulando uma API de pedidos

Este projeto demonstra um serviço **gRPC unary** mais próximo de uma API de negócio real.

O domínio usado no exemplo é um pequeno fluxo de **pedidos de e-commerce**, com operações para:

- criar um pedido
- consultar um pedido por ID
- listar pedidos por cliente
- atualizar o status do pedido

Também mostra uma separação mais explícita de camadas:

- **Controller (gRPC)**: recebe `call.request` e devolve `callback(...)`
- **Service**: centraliza a regra de negócio
- **OrderRepository**: intermedia o acesso ao `orderDatabase`
- **ProductRepository**: intermedia o acesso ao `catalogDatabase`
- **Databases em memória**: simulam a persistência da aplicação

Arquitetura utilizada:

```text
Cliente gRPC
   |
   v
Contrato orderApi.proto
   |
   v
Controller gRPC
   |
   v
Service
   |
   +--> OrderRepository
   |      |
   |      v
   |   orderDatabase
   |
   `--> ProductRepository
          |
          v
       catalogDatabase
```

---

# Estrutura do projeto

```text
Exemplo API em Camadas
|
|-- package.json
|-- proto
|   `-- orderApi.proto
`-- src
    |-- client.js
    |-- server.js
    |-- database
    |   |-- catalogDatabase.js
    |   `-- orderDatabase.js
    |-- product
    |   `-- productRepository.js
    |-- shared
    |   |-- applicationError.js
    |   `-- toGrpcError.js
    `-- order
        |-- orderController.js
        |-- orderRepository.js
        `-- orderService.js
```

---

# Descrição dos arquivos

## proto/orderApi.proto

Define o **contrato gRPC** da aplicação.

Contém:

- o serviço `OrderApi`
- a operação `CreateOrder`
- a operação `GetOrder`
- a operação `ListOrdersByCustomer`
- a operação `UpdateOrderStatus`
- as mensagens trocadas entre cliente e servidor

Este arquivo funciona como o ponto central de integração entre cliente e servidor.

---

## src/server.js

Arquivo principal do servidor gRPC.

Responsável por:

- carregar o contrato `.proto`
- montar a cadeia `Controller -> Service -> Repository -> Database`
- registrar o serviço gRPC
- publicar o servidor na porta `50051`

---

## src/client.js

Cliente de exemplo.

Responsável por:

- criar um client stub a partir do contrato
- criar um pedido válido
- consultar o pedido criado
- atualizar o status do pedido
- listar pedidos do cliente
- demonstrar um erro de estoque insuficiente

---

## src/order/orderController.js

Representa a camada de entrada do gRPC.

Essa camada:

- lê os dados recebidos em `call.request`
- delega a operação para o `OrderService`
- converte exceções da aplicação para erros gRPC

---

## src/order/orderService.js

Representa a camada de serviço.

Essa camada centraliza a regra de negócio do exemplo, incluindo:

- validação dos dados de entrada
- verificação de estoque
- cálculo do total do pedido
- transições de status
- coordenação entre `OrderRepository` e `ProductRepository`

---

## src/order/orderRepository.js

Representa o repositório de pedidos.

Seu papel é isolar o acesso ao `orderDatabase`, evitando que a camada de serviço manipule a persistência diretamente.

---

## src/product/productRepository.js

Representa o repositório de produtos.

Seu papel é isolar o acesso ao `catalogDatabase`, permitindo:

- buscar produtos por ID
- atualizar estoque dos produtos

---

## src/database/orderDatabase.js

Simula a persistência de pedidos em memória.

Neste exemplo, os pedidos são armazenados em um array simples, suficiente para demonstrar a interação com um repositório sem depender de banco de dados real.

---

## src/database/catalogDatabase.js

Simula a persistência do catálogo de produtos em memória.

Neste exemplo, o catálogo contém produtos com preço e estoque para que o fluxo de criação de pedidos tenha uma verificação mais próxima de uma API real.

---

## src/shared/applicationError.js

Define um erro de aplicação simples, usado para carregar:

- a mensagem de erro
- o código gRPC correspondente

---

## src/shared/toGrpcError.js

Converte erros internos da aplicação para o formato esperado pelo gRPC no callback da camada de controller.

---

# Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm run server
```

3. Em outro terminal, execute o cliente:

```bash
npm run client
```

---

# Fluxo da chamada `CreateOrder`

1. O cliente envia `CreateOrder`
2. O servidor recebe a chamada gRPC
3. O `orderController` lê `call.request`
4. O `OrderService` valida os dados e coordena a regra de negócio
5. O `ProductRepository` consulta o `catalogDatabase` para validar os produtos e o estoque
6. O `OrderRepository` persiste o pedido no `orderDatabase`
7. A resposta volta ao cliente no formato do contrato
