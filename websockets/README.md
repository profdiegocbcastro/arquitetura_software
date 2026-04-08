# WebSockets - exemplos práticos

Esta pasta reúne exemplos introdutórios de **WebSockets com Node.js e Socket.IO**, mostrando comunicação em tempo real entre cliente e servidor.

O objetivo é apresentar, de forma progressiva:

- conexão bidirecional e broadcast global
- confirmação de entrega com callback de ACK
- salas (`rooms`) para segmentar mensagens
- presença de usuários e indicador de digitação

Arquitetura geral utilizada:

```text
Clientes WebSocket
   |
   v
Servidor Socket.IO
   |
   +--> Broadcast global
   +--> Rooms
   `--> Eventos em tempo real
```

---

# Estrutura da pasta

```text
websockets
|
|-- chat-broadcast
|   |-- package.json
|   |-- README.md
|   `-- src
|       |-- server.js
|       |-- client.js
|       `-- simulator.js
|
`-- room-presence
    |-- package.json
    |-- README.md
    `-- src
        |-- server.js
        |-- client.js
        `-- simulator.js
```

---

# Descrição dos exemplos

## `chat-broadcast`

Mostra o fluxo mais simples de chat em tempo real:

- usuários conectam no servidor
- cada mensagem enviada por um cliente vira broadcast para todos
- servidor confirma entrega usando ACK

---

## `room-presence`

Mostra organização por sala e eventos auxiliares:

- usuário entra em uma sala específica
- servidor atualiza lista de presença da sala
- mensagens são enviadas apenas para a sala escolhida
- evento de digitação é compartilhado para os demais membros da sala

---

# Como executar

Cada exemplo possui seu próprio `package.json`.

## `chat-broadcast`

```bash
cd websockets/chat-broadcast
npm install
npm run server
```

Em outro terminal:

```bash
cd websockets/chat-broadcast
npm run simulator
```

## `room-presence`

```bash
cd websockets/room-presence
npm install
npm run server
```

Em outro terminal:

```bash
cd websockets/room-presence
npm run simulator
```

---

# Observação importante

Os exemplos usam memória local para foco didático.

Em produção, normalmente você evolui com:

- autenticação de usuários
- persistência de mensagens
- escalabilidade horizontal com adapter (ex.: Redis)
- observabilidade de conexões e eventos
