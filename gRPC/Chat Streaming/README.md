# Chat streaming - gRPC bidirecional

Este projeto demonstra um caso clássico de **bidirectional streaming** com gRPC.

Nesse modelo:

- o cliente pode enviar várias mensagens ao servidor
- o servidor pode enviar várias mensagens ao cliente
- os dois lados mantêm o stream aberto ao mesmo tempo

O exemplo implementa um pequeno chat em terminal.

Arquitetura utilizada:

```text
Cliente A ----\
               \
Cliente B ------> Servidor gRPC de chat
               /
Cliente C ----/
```

---

# Estrutura do projeto

```text
chat streaming
|
|-- package.json
|-- proto
|   `-- chat.proto
`-- src
    |-- server.js
    `-- client.js
```

---

# Descrição dos arquivos

## proto/chat.proto

Define o contrato do chat.

O serviço possui apenas um RPC:

```proto
rpc Chat (stream ChatMessage) returns (stream ChatMessage);
```

Isso significa que a troca de mensagens acontece em fluxo contínuo nos dois sentidos.

---

## src/server.js

Servidor gRPC responsável por:

- receber novos clientes
- manter os streams ativos em memória
- receber mensagens enviadas por um cliente
- retransmitir essas mensagens para os demais clientes conectados

Esse comportamento simula um broadcast simples.

---

## src/client.js

Cliente de terminal.

Responsável por:

- abrir um stream bidirecional com o servidor
- ler mensagens digitadas no terminal
- enviar mensagens com `call.write(...)`
- receber mensagens com `call.on("data", ...)`

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

3. Em terminais diferentes, inicie clientes com nomes distintos:

```bash
node src/client.js Gabriel
```

```bash
node src/client.js Maria
```

4. Digite mensagens em cada cliente para ver a troca em tempo real

---

# Fluxo do chat

1. Cada cliente abre um stream com `client.chat()`
2. O servidor guarda a referência desse stream
3. Quando um cliente envia uma mensagem, o servidor recebe no evento `data`
4. O servidor retransmite a mensagem para os outros clientes
5. Quando o cliente fecha o terminal, o stream é encerrado
