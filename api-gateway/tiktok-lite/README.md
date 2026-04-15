# TikTok Lite - Gateway + GraphQL BFF + gRPC + RTMP + mídia adaptativa

Este projeto segue o mesmo estilo de aula do projeto anterior e simula um fluxo de vídeos curtos no estilo TikTok:

- **Gateway** na borda (Kong)
- **API GraphQL** como BFF exposta ao cliente
- **API 1 gRPC** (video feed) chamada pelo BFF
- **API 2 gRPC** (playback) chamada pelo BFF
- **API 3 gRPC** (adaptive delivery) chamada internamente pela API 2
- **RTMP Ingest** para representar o lado de publicação dos criadores
- **1 vídeo em 3 qualidades** (`low`, `medium`, `high`) para adaptar a entrega à rede do usuário

Além do roteamento, o gateway aplica:

- `auth` (API key) na API GraphQL
- `rate limit`
- `timeout`

---

# Arquitetura

```text
Cliente HTTP (GraphQL + vídeo)
        |
        v
Kong Gateway :4000
        |
        +-----------------------> /media -> Playback Service HTTP
        |
        v
GraphQL BFF
        |
        +-----------------------> API 1 gRPC (video feed) :50053
        |
        +-----------------------> API 2 gRPC (playback) :50051
                                   |
                                   +-> API 1 gRPC (video feed) :50053
                                   |
                                   `-> API 3 gRPC (adaptive delivery) :50052

Criador / Encoder
        |
        v
RTMP Ingest :1935
```

---

# Estrutura do projeto

```text
tiktok-lite
|
|-- docker-compose.yml
|-- README.md
|-- container.puml
|-- media
|   `-- README.md
|-- proto
|   |-- playback.proto
|   |-- video_feed.proto
|   `-- adaptive_delivery.proto
|-- load-balancer
|   `-- kong.yml
|-- rtmp-ingest
|   `-- nginx.conf
|-- graphql-bff
|   |-- Dockerfile
|   |-- package.json
|   `-- src
|       |-- index.js
|       |-- graphql
|       |   `-- schema.graphql
|       |-- repositories
|       |   |-- videoFeedRepository.js
|       |   `-- playbackRepository.js
|       |-- services
|       |   |-- videoFeedService.js
|       |   |-- playbackService.js
|       |   `-- serviceInfoService.js
|       `-- resolvers
|           |-- index.js
|           |-- videoFeedResolver.js
|           |-- playbackResolver.js
|           `-- serviceInfoResolver.js
`-- services
    |-- video-feed-service
    |   |-- Dockerfile
    |   |-- package.json
    |   `-- src
    |       |-- server.js
    |       |-- controllers
    |       |   `-- videoFeedController.js
    |       |-- services
    |       |   `-- videoFeedService.js
    |       |-- repositories
    |       |   `-- videoCatalogRepository.js
    |       `-- shared
    |           |-- applicationError.js
    |           `-- toGrpcError.js
    |-- playback-service
    |   |-- Dockerfile
    |   |-- package.json
    |   `-- src
    |       |-- server.js
    |       |-- controllers
    |       |   `-- playbackController.js
    |       |-- services
    |       |   `-- playbackService.js
    |       |-- gateways
    |       |   |-- videoFeedGateway.js
    |       |   `-- adaptiveDeliveryGateway.js
    |       `-- shared
    |           |-- applicationError.js
    |           `-- toGrpcError.js
    `-- adaptive-delivery-service
        |-- Dockerfile
        |-- package.json
        `-- src
            |-- server.js
            |-- controllers
            |   `-- adaptiveDeliveryController.js
            |-- services
            |   `-- adaptiveDeliveryService.js
            |-- repositories
            |   `-- networkProfileRepository.js
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
- rota pública `/media`
- `key-auth` no GraphQL (header `apikey`)
- `rate-limiting` para GraphQL e mídia
- timeouts para o tráfego do gateway

Chave de acesso do exemplo:

```text
apikey: tiktok-arq-123
```

Observação:

- neste exemplo, `/media` fica sem API key para simplificar a reprodução do vídeo
- em um sistema real, o mais comum seria usar CDN, URL assinada ou outro mecanismo de autorização

---

## `graphql-bff`

API GraphQL pública, seguindo separação em camadas:

- `resolvers`: adaptam o contrato GraphQL
- `services`: regras de aplicação, validação e mapeamento de campos
- `repositories`: integração com as APIs internas

Fluxo interno:

```text
GraphQL Resolver -> Service -> Repository -> Video Feed gRPC
                                   |
                                   `-> Playback gRPC
```

---

## `services/video-feed-service` (API 1 gRPC)

Módulo gRPC organizado no padrão:

- `controllers`: camada de transporte gRPC
- `services`: regras de negócio do feed e do catálogo
- `repositories`: catálogo em memória com metadados e variantes dos vídeos
- `shared`: erros de aplicação e tradução para gRPC

Fluxo interno:

```text
Controller -> Service -> Repository
```

---

## `services/playback-service` (API 2 gRPC)

Módulo gRPC organizado no padrão:

- `controllers`: lê `call.request`, valida entrada e usa `callback`
- `services`: regras de negócio da sessão de playback
- `gateways`: client gRPC da API 1 (video feed) e da API 3 (adaptive delivery)
- `shared`: erros de aplicação e mapeamento para erro gRPC

Além disso, este serviço também expõe:

- `HTTP /media` para servir os arquivos de vídeo

Fluxo interno:

```text
Controller -> Service
              |
              +-> Video Feed Gateway -> API 1 gRPC
              |
              +-> Adaptive Delivery Gateway -> API 3 gRPC
```

---

## `services/adaptive-delivery-service` (API 3 gRPC)

Módulo gRPC organizado no padrão:

- `controllers`: camada de transporte gRPC
- `services`: regras de decisão de qualidade
- `repositories`: faixas de banda e bitrates recomendados
- `shared`: erros de aplicação e tradução para gRPC

Fluxo interno:

```text
Controller -> Service -> Repository
```

---

## `rtmp-ingest`

Container NGINX RTMP para representar a entrada do vídeo.

Neste exemplo:

- o criador publica para `rtmp://localhost:1935/live`
- a etapa de processamento posterior é simulada
- as variantes `low`, `medium` e `high` já são consideradas existentes em `media/`

Isso permite demonstrar:

- publicação em `RTMP`
- orquestração interna via `gRPC`
- entrega adaptativa usando múltiplas qualidades
- separação entre catálogo/feed e reprodução

---

# Como funciona a escolha da qualidade

O serviço `adaptive-delivery-service` decide entre:

- `low` para banda baixa
- `medium` para banda intermediária
- `high` para banda alta

O cliente pode informar:

- `networkProfile`: `LOW`, `MEDIUM`, `HIGH` ou `AUTO`
- `bandwidthKbps`: largura de banda estimada em kbps

Regras do exemplo:

- `AUTO` com banda baixa tende a escolher `low`
- `AUTO` com banda média tende a escolher `medium`
- `AUTO` com banda alta tende a escolher `high`
- se o cliente pedir `HIGH`, mas a banda informada for baixa, o sistema faz `fallback`

---

# Convenção dos arquivos de mídia

```text
media/videos/video-1/low.mp4
media/videos/video-1/medium.mp4
media/videos/video-1/high.mp4
```

Para os posters:

```text
media/videos/video-1/poster.jpg
```

---

# Como executar

1. Entre na pasta do exemplo:

```bash
cd "api-gateway/tiktok-lite"
```

2. Se quiser, coloque o vídeo e o poster em `media/videos/video-1/`

3. Suba o ambiente:

```bash
docker compose up --build
```

4. Endpoints principais:

```text
GraphQL público: http://localhost:4000/graphql
Mídia pública:   http://localhost:4000/media
RTMP ingest:     rtmp://localhost:1935/live
RTMP status:     http://localhost:8080
```

---

# Testes GraphQL (com API key)

Todas as chamadas GraphQL devem enviar o header:

```text
apikey: tiktok-arq-123
```

## 1) Verificar instância do BFF

```graphql
query {
  serviceInfo {
    instanceName
    architecture
  }
}
```

## 2) Listar o feed em modo automático

```graphql
query {
  videoFeed(networkProfile: AUTO, bandwidthKbps: 850) {
    id
    title
    creatorName
    availableQualities
    recommendedPlayback {
      selectedQuality
      selectedBitrateKbps
      streamUrl
      fallbackReason
    }
  }
}
```

## 3) Solicitar um playback específico

```graphql
query {
  playback(videoId: "video-1", networkProfile: HIGH, bandwidthKbps: 600) {
    videoId
    selectedQuality
    selectedBitrateKbps
    streamUrl
    fallbackReason
    availableVariants {
      quality
      bitrateKbps
      resolution
    }
  }
}
```

Nesse caso, mesmo pedindo `HIGH`, a banda de `600 kbps` deve forçar um `fallback` para uma variante mais leve.

## 4) Obter os dados de ingestão RTMP

```graphql
query {
  ingestInfo {
    ingestProtocol
    ingestUrl
    streamKeyPattern
    publishFlow
    notes
  }
}
```

---

# Exemplos de URLs de mídia

Se os arquivos existirem, a reprodução poderá ser feita diretamente por URLs como:

```text
http://localhost:4000/media/videos/video-1/low.mp4
http://localhost:4000/media/videos/video-1/medium.mp4
http://localhost:4000/media/videos/video-1/high.mp4
```

---

# Leitura arquitetural

Esse exemplo demonstra de forma direta:

- o cliente não fala com `gRPC`
- o cliente enxerga `GraphQL` e URLs HTTP de mídia
- o `BFF` centraliza o contrato público
- o `video-feed-service` concentra o catálogo e o feed
- o `playback-service` cuida apenas da reprodução e da entrega da sessão
- a decisão de playback acontece internamente
- a escolha da qualidade pode respeitar perfil e banda
- existe um componente separado de `RTMP` para representar a entrada do vídeo
- as variantes de vídeo podem ser trocadas sem mudar o contrato público do cliente
