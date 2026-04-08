# `basic-flow` - webhook básico entre serviços

Este projeto demonstra o fluxo mais simples de webhook HTTP.

O cenário simula dois sistemas:

- **checkout-service**: cria pedidos e dispara webhook
- **fulfillment-service**: recebe o webhook e processa o evento

Arquitetura utilizada:

```text
Cliente
   |
   v
Checkout Service
   |
   v
Webhook POST /webhooks/orders
   |
   v
Fulfillment Service
```

---

# Estrutura do projeto

```text
basic-flow
|
|-- package.json
|-- README.md
`-- src
    |-- checkout-service.js
    |-- fulfillment-service.js
    `-- client.js
```

---

# Descrição dos arquivos

## `src/checkout-service.js`

Arquivo principal do serviço emissor.

Responsável por:

- expor `POST /orders`
- validar dados de entrada do pedido
- criar pedido em memória
- montar o evento `order.created`
- enviar o webhook para o receiver

---

## `src/fulfillment-service.js`

Arquivo principal do serviço receptor.

Responsável por:

- expor `POST /webhooks/orders`
- receber o evento de pedido criado
- simular a ação de separação do pedido
- retornar confirmação HTTP para o emissor

---

## `src/client.js`

Cliente auxiliar para testar o cenário.

Ele envia uma requisição para o `checkout-service`, que então dispara o webhook para o `fulfillment-service`.

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

1. O cliente chama `POST /orders`.
2. O `checkout-service` cria o pedido.
3. O `checkout-service` dispara o webhook `order.created`.
4. O `fulfillment-service` recebe e processa o evento.
5. O receiver responde HTTP `200` confirmando recebimento.
