# Webhooks - exemplos práticos

Esta pasta reúne exemplos introdutórios de **webhooks com Node.js**, mostrando como sistemas notificam outros serviços automaticamente quando um evento relevante acontece.

O objetivo é apresentar, de forma progressiva, os principais conceitos:

- envio e recebimento de webhook no fluxo mais simples
- separação entre sistema emissor e sistema receptor
- validação de origem por assinatura
- processamento idempotente para lidar com reentregas

Arquitetura geral utilizada:

```text
Sistema emissor
   |
   v
Evento de negócio
   |
   v
Webhook HTTP (POST)
   |
   v
Sistema receptor
```

---

# Estrutura da pasta

```text
webhooks
|
|-- basic-flow
|   |-- package.json
|   |-- README.md
|   `-- src
|       |-- checkout-service.js
|       |-- fulfillment-service.js
|       `-- client.js
|
`-- signature-idempotency
    |-- package.json
    |-- README.md
    `-- src
        |-- billing-provider.js
        |-- accounting-service.js
        |-- client.js
        `-- shared
            |-- signature.js
            `-- webhook-event-store.js
```

---

# Descrição dos exemplos

## `basic-flow`

Demonstra o webhook no formato mais básico.

Nesse cenário:

- o `checkout-service` cria um pedido
- após criar o pedido, dispara o webhook `order.created`
- o `fulfillment-service` recebe o evento e confirma o processamento

Esse exemplo é útil para entender o fundamento: **webhook é uma notificação server-to-server disparada por evento**.

---

## `signature-idempotency`

Demonstra duas proteções importantes para produção:

- **assinatura HMAC** para verificar se o webhook veio do emissor esperado
- **idempotência** para evitar processamento duplicado do mesmo evento

Nesse cenário:

- o `billing-provider` aprova um pagamento e envia webhook assinado
- o `accounting-service` valida assinatura e ignora duplicatas

---

# Como executar

Cada exemplo possui seu próprio `package.json`.

Instale dependências e rode os serviços em terminais separados.

## `basic-flow`

```bash
cd webhooks/basic-flow
npm install
npm run receiver
```

Em outro terminal:

```bash
cd webhooks/basic-flow
npm run provider
```

Em outro terminal:

```bash
cd webhooks/basic-flow
npm run client
```

## `signature-idempotency`

```bash
cd webhooks/signature-idempotency
npm install
npm run receiver
```

Em outro terminal:

```bash
cd webhooks/signature-idempotency
npm run provider
```

Em outro terminal:

```bash
cd webhooks/signature-idempotency
npm run client
```