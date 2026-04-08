# `room-presence` - salas, presença e digitação

Este exemplo expande o uso de WebSocket com organização por sala (`room`) e eventos de colaboração.

Conceitos cobertos:

- entrada de usuários em sala
- lista de presença por sala
- mensagens direcionadas somente para membros da sala
- evento de digitação para melhorar experiência de chat

Arquitetura utilizada:

```text
Clientes Socket.IO
   |
   v
Servidor Socket.IO
   |
   +--> room:join
   +--> room:presence
   +--> room:message
   `--> room:typing
```

---

# Estrutura do projeto

```text
room-presence
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

Servidor principal.

Responsável por:

- registrar entrada de usuários em uma sala
- controlar presença da sala em memória
- enviar mensagens para a sala correta
- retransmitir indicador de digitação para os demais membros da sala

---

## `src/client.js`

Cliente CLI para testes manuais.

Permite informar:

- nome do usuário
- sala
- mensagem

---

## `src/simulator.js`

Simulador com dois clientes na mesma sala para mostrar:

- sincronização de presença
- digitação em tempo real
- troca de mensagens apenas na sala escolhida

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

3. Em outro terminal, rode simulação:

```bash
npm run simulator
```

Opcionalmente, teste manual:

```bash
npm run client -- Ana squad-arquitetura "Mensagem da Ana"
```

---

# Fluxo esperado

1. Cliente emite `room:join`.
2. Servidor inclui o cliente na `room` e publica `room:presence`.
3. Cliente emite `room:typing` e depois `room:send`.
4. Servidor publica `room:message` apenas para membros da sala.
