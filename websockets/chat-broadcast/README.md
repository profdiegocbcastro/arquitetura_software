# `chat-broadcast` - chat em tempo real com broadcast global

Este exemplo demonstra o fluxo mais básico de WebSocket.

Cenário:

- clientes conectam no servidor
- clientes enviam mensagens
- servidor faz broadcast para todos os conectados
- emissor recebe ACK confirmando envio

Arquitetura utilizada:

```text
Clientes Socket.IO
   |
   v
Servidor Socket.IO
   |
   v
Broadcast global do evento chat:message
```

---

# Estrutura do projeto

```text
chat-broadcast
|
|-- package.json
|-- README.md
`-- src
    |-- server.js
    |-- client.js
    `-- simulator.js
```

---

# Descrição dos arquivos

## `src/server.js`

Servidor principal do exemplo.

Responsável por:

- aceitar conexões Socket.IO
- manter contador de clientes conectados
- receber evento `chat:send`
- reenviar para todos com evento `chat:message`
- responder ACK para o cliente emissor

---

## `src/client.js`

Cliente CLI reutilizável para testes manuais.

Ele permite informar:

- nome do usuário
- texto da mensagem

Depois conecta, envia a mensagem e imprime os eventos recebidos.

---

## `src/simulator.js`

Simulador automático com dois clientes (Alice e Bob).

Ele facilita demonstração rápida em aula, sem abrir vários terminais para clientes.

---

# Como executar

1. Instale dependências:

```bash
npm install
```

2. Suba o servidor:

```bash
npm run server
```

3. Em outro terminal, execute simulação:

```bash
npm run simulator
```

Opcionalmente, você pode testar manual:

```bash
npm run client -- Alice "Olá turma"
```

---

# Fluxo esperado

1. Clientes conectam e recebem evento de boas-vindas.
2. Cliente emite `chat:send`.
3. Servidor publica `chat:message` para todos.
4. Servidor retorna ACK para o emissor.
