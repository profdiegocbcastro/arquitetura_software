# Facebook Lite - Gateway + GraphQL BFF + gRPC interno encadeado

Este exemplo foi montado para seguir exatamente o desenho de aula:

- **Gateway** na borda (Kong)
- **API GraphQL** como BFF exposta ao cliente
- **API 1 gRPC** (chat) chamada pelo BFF
- **API 2 gRPC** (notification) chamada internamente pela API 1

Além do roteamento, o gateway aplica:

- `auth` (API key)
- `rate limit`
- `timeout`

---

# Arquitetura

```text
Cliente HTTP (GraphQL)
        |
        v
Kong Gateway :4000
        |
        v
GraphQL BFF
        |
        v
API 1 gRPC (chat) :50051
        |
        v
API 2 gRPC (notification) :50052
```

---

# Estrutura do projeto

```text
facebook-lite
|
|-- docker-compose.yml
|-- README.md
|-- container.puml
|-- proto
|   |-- chat.proto
|   `-- notification.proto
|-- load-balancer
|   `-- kong.yml
|-- graphql-bff
|   |-- Dockerfile
|   |-- package.json
|   `-- src
|       |-- index.js
|       |-- graphql
|       |   `-- schema.graphql
|       |-- repositories
|       |   `-- chatRepository.js
|       |-- services
|       |   |-- chatService.js
|       |   `-- serviceInfoService.js
|       `-- resolvers
|           |-- index.js
|           |-- chatResolver.js
|           `-- serviceInfoResolver.js
`-- services
    |-- chat-service
    |   |-- Dockerfile
    |   |-- package.json
    |   `-- src
    |       |-- server.js
    |       |-- controllers
    |       |   `-- chatController.js
    |       |-- services
    |       |   `-- chatService.js
    |       |-- repositories
    |       |   `-- chatRepository.js
    |       |-- gateways
    |       |   `-- notificationGateway.js
    |       `-- shared
    |           |-- applicationError.js
    |           `-- toGrpcError.js
    `-- notification-service
        |-- Dockerfile
        |-- package.json
        `-- src
            |-- server.js
            |-- controllers
            |   `-- notificationController.js
            |-- services
            |   `-- notificationService.js
            |-- repositories
            |   `-- notificationRepository.js
            `-- shared
                |-- applicationError.js
                `-- toGrpcError.js
```

---

# Descrição dos componentes

## `load-balancer/kong.yml`

Configuração declarativa do Kong em modo DB-less.

Define:

- upstream com duas instâncias do BFF (`graphql-bff-1` e `graphql-bff-2`)
- rota pública `/graphql`
- `key-auth` (header `apikey`)
- `rate-limiting` (60 req/min)
- timeouts (`connect/read/write` em 3000ms)

Chave de acesso do exemplo:

```text
apikey: aula-arq-123
```

---

## `graphql-bff`

API GraphQL pública (única API exposta), seguindo separação em camadas:

- `resolvers`: adaptam o contrato GraphQL
- `services`: regras de aplicação e validações
- `repositories`: integração com API 1 gRPC

Fluxo interno:

```text
GraphQL Resolver -> Service -> Repository -> API 1 gRPC
```

---

## `services/chat-service` (API 1 gRPC)

Módulo gRPC organizado no padrão:

- `controllers`: lê `call.request`, valida entrada e usa `callback`
- `services`: regras de negócio
- `repositories`: persistência em memória de mensagens
- `gateways`: client gRPC da API 2
- `shared`: erros de aplicação e mapeamento para erro gRPC

Fluxo interno:

```text
Controller -> Service -> Repository
                    |
                    +-> Notification Gateway -> API 2 gRPC
```

---

## `services/notification-service` (API 2 gRPC)

Módulo gRPC organizado no padrão:

- `controllers`: camada de transporte gRPC
- `services`: regras de negócio
- `repositories`: persistência em memória de notificações
- `shared`: erros de aplicação e tradução para gRPC

Fluxo interno:

```text
Controller -> Service -> Repository
```

---

# Como executar

1. Entre na pasta do exemplo:

```bash
cd "api-gateway/facebook-lite"
```

2. Suba o ambiente:

```bash
docker compose up --build
```

3. Endpoint público:

```text
http://localhost:4000/graphql
```

---

# Testes GraphQL (com API key)

Todas as chamadas devem enviar o header:

```text
apikey: aula-arq-123
```

## 1) Verificar instância do BFF (balanceamento)

```graphql
query {
  serviceInfo {
    instanceName
    architecture
  }
}
```

## 2) Enviar mensagem + notificação (encadeado API 1 -> API 2)

```graphql
mutation {
  sendMessageAndNotify(
    fromUserId: "u-ana"
    toUserId: "u-bruno"
    content: "Oi Bruno, tudo bem?"
  ) {
    bffInstance
    message {
      id
      fromUserId
      toUserId
      content
      sentAt
    }
    notification {
      id
      userId
      title
      content
      createdAt
    }
  }
}
```

## 3) Listar mensagens do usuário

```graphql
query {
  chatMessagesByUser(userId: "u-bruno") {
    id
    fromUserId
    toUserId
    content
    sentAt
  }
}
```

## 4) Listar notificações do usuário

```graphql
query {
  notificationsByUser(userId: "u-bruno") {
    id
    userId
    title
    content
    createdAt
  }
}
```

---

# Leitura arquitetural

Esse exemplo demonstra de forma direta:

- cliente não acessa gRPC
- cliente só enxerga GraphQL no gateway
- BFF não chama API 2 diretamente
- API 1 e API 2 se comunicam via gRPC internamente
