# Streaming simples - exemplos de server e client streaming

Este projeto demonstra dois estilos de comunicação suportados pelo gRPC:

- **Server Streaming**
- **Client Streaming**

O domínio usado no exemplo é propositalmente simples para destacar o comportamento do streaming.

Arquitetura utilizada:

```text
Cliente gRPC
   |
   v
Contrato calculadora.proto
   |
   v
Servidor gRPC
```

---

# Descrição dos RPCs

## getFibonacci

Assinatura:

```proto
rpc getFibonacci (Contador) returns (stream Resposta);
```

Esse método representa **server streaming**:

- o cliente envia um único valor `count`
- o servidor responde com vários números da sequência de Fibonacci

---

## sendNumbers

Assinatura:

```proto
rpc sendNumbers (stream Contador) returns (Resposta);
```

Esse método representa **client streaming**:

- o cliente envia vários números ao servidor
- o servidor acumula os valores
- ao final, devolve uma única resposta com a soma total

---

# Estrutura do projeto

```text
streaming simples
|
|-- package.json
|-- proto
|   `-- calculadora.proto
`-- src
    |-- server.js
    |-- clientFibo.js
    `-- clientSum.js
```

---

# Descrição dos arquivos

## proto/calculadora.proto

Define o contrato gRPC do exemplo.

Contém:

- o serviço `Calculadora`
- a mensagem `Contador`
- a mensagem `Resposta`
- os dois tipos de streaming usados no projeto

---

## src/server.js

Implementa os métodos gRPC do servidor.

Responsável por:

- gerar a sequência de Fibonacci usando `call.write(...)`
- receber múltiplos números via eventos `data`
- devolver a resposta final quando o stream do cliente termina

---

## src/clientFibo.js

Cliente de **server streaming**.

Ele envia uma requisição única e escuta respostas com:

- `call.on("data", ...)`
- `call.on("end", ...)`

---

## src/clientSum.js

Cliente de **client streaming**.

Ele abre um stream de envio, chama vários `write(...)` e finaliza com `end()`.

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

3. Em outro terminal, teste o streaming do servidor:

```bash
npm run clientFibo
```

4. Em outro terminal, teste o streaming do cliente:

```bash
npm run clientSum
```
