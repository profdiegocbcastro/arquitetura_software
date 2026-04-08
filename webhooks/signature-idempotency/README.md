# `signature-idempotency` - webhook com assinatura e idempotência

Este projeto demonstra um cenário mais próximo de produção.

Além do envio normal de webhook, ele cobre:

- validação de origem por assinatura HMAC SHA-256
- idempotência para ignorar reentregas do mesmo evento

Arquitetura utilizada:

```text
Cliente
   |
   v
Billing Provider
   |
   +--> assina o payload com HMAC
   |
   v
Webhook POST /webhooks/payments
   |
   v
Accounting Service
   |
   +--> valida assinatura
   `--> ignora duplicidade
```

---

# Estrutura do projeto

```text
signature-idempotency
|
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

# Descrição dos arquivos

## `src/billing-provider.js`

Arquivo principal do emissor do webhook.

Responsável por:

- expor `POST /payments`
- validar entrada do pagamento
- gerar evento `payment.approved`
- assinar o payload
- enviar o webhook para o receiver
- simular reentrega quando `forceDuplicateDelivery=true`

---

## `src/accounting-service.js`

Arquivo principal do receptor do webhook.

Responsável por:

- expor `POST /webhooks/payments`
- ler corpo bruto da requisição
- validar assinatura recebida
- verificar se o evento já foi processado
- retornar sucesso sem reprocessar duplicatas

---

## `src/shared/signature.js`

Módulo utilitário para assinatura.

Contém:

- criação da assinatura HMAC
- comparação segura com `timingSafeEqual`

---

## `src/shared/webhook-event-store.js`

Armazenamento em memória dos eventos já processados.

No exemplo, esse store representa a lógica de idempotência.

---

## `src/client.js`

Cliente auxiliar que dispara um pagamento de teste.

Por padrão, ele ativa reentrega do mesmo evento para facilitar a visualização do comportamento idempotente no receiver.

---

# Como executar

1. Instale dependências:

```bash
npm install
```

2. Suba o receiver:

```bash
npm run receiver
```

3. Em outro terminal, suba o provider:

```bash
npm run provider
```

4. Em outro terminal, dispare o cliente:

```bash
npm run client
```

---

# Fluxo esperado

1. O cliente chama `POST /payments`.
2. O `billing-provider` aprova o pagamento.
3. O provider assina o payload e envia o webhook.
4. O `accounting-service` valida assinatura e processa a primeira entrega.
5. Na reentrega do mesmo evento, o receiver reconhece duplicidade e ignora reprocessamento.
