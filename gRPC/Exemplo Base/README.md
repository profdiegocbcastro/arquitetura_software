# Exemplo 1 - gRPC unary com cadastro de livros

Este projeto demonstra um serviço **gRPC simples** no formato **unary RPC**, isto é, cada chamada envia **uma requisição** e recebe **uma resposta**.

O domínio utilizado no exemplo é uma pequena loja de livros em memória.

Arquitetura utilizada:

```text
Cliente gRPC
   |
   v
Contrato bookStore.proto
   |
   v
Implementation gRPC
   |
   v
Service
   |
   v
Datasource em memória
```

---

# Estrutura do projeto

```text
exemplo 1
|
|-- package.json
|-- proto
|   `-- bookStore.proto
`-- src
    |-- client.js
    |-- server.js
    `-- Book
        |-- Datasource.js
        |-- Service.js
        `-- Implementation.js
```

---

# Descrição dos arquivos

## proto/bookStore.proto

Define o **contrato gRPC** da aplicação.

Contém:

- o serviço `Book`
- a operação `createBook`
- a operação `readBook`
- a operação `readBooks`
- as mensagens trocadas entre cliente e servidor

Este arquivo é o ponto central de integração entre cliente e servidor.

---

## src/server.js

Arquivo principal do servidor gRPC.

Responsável por:

- carregar o contrato `.proto`
- instanciar as camadas da aplicação
- registrar a implementação do serviço
- publicar o servidor na porta `50051`

---

## src/client.js

Cliente de exemplo.

Responsável por:

- criar um client stub a partir do contrato
- chamar o método `createBook`
- chamar o método `readBooks`
- imprimir o retorno recebido do servidor

---

## src/Book/Datasource.js

Representa a camada de persistência.

Neste exemplo, os dados são armazenados em memória usando um array simples. Isso facilita o entendimento do fluxo sem depender de banco de dados.

---

## src/Book/Service.js

Representa a camada de serviço.

Essa camada centraliza a lógica da aplicação e evita que a implementação gRPC acesse diretamente a persistência.

---

## src/Book/Implementation.js

Faz a adaptação entre o protocolo gRPC e a camada de serviço.

Aqui aparecem os elementos mais característicos de um método gRPC unary:

- `call.request`: dados enviados pelo cliente
- `callback`: função usada para devolver a resposta

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

3. Em outro terminal, execute o cliente:

```bash
npm run client
```

---

# Fluxo da chamada

1. O cliente envia `createBook`
2. O servidor recebe a chamada gRPC
3. A implementação delega para a camada `Service`
4. O `Service` delega para o `Datasource`
5. O livro é armazenado em memória
6. A resposta volta para o cliente
7. O cliente chama `readBooks` para listar os livros cadastrados
