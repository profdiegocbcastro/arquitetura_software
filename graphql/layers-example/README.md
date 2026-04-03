# Exemplo 2 — API GraphQL com camadas e Prisma

Este projeto demonstra a construção de uma **API GraphQL conectada a um banco PostgreSQL** utilizando **Node.js, Apollo Server e Prisma ORM**, aplicando uma **arquitetura em camadas**.

Diferente do exemplo anterior, neste projeto os resolvers **não acessam diretamente o banco de dados**.  
O acesso aos dados é realizado através de **Services e Repositories**, promovendo **desacoplamento e organização da lógica da aplicação**.

Arquitetura utilizada:

Cliente
↓
API GraphQL (Apollo Server)
↓
Resolvers
↓
Services
↓
Repositories (Prisma ORM)
↓
PostgreSQL


---

# Descrição dos arquivos

## docker-compose.yml

Define os containers da aplicação:

- **db**: container do PostgreSQL  
- **api**: container que executa a aplicação Node.js  

Também configura:

- variáveis de ambiente
- rede entre containers
- volume de persistência do banco

---

## Dockerfile

Define como a imagem da aplicação Node.js é construída.

Durante o build:

- instala dependências do projeto
- gera o **Prisma Client**

Quando o container inicia:

- sincroniza o banco com o schema (`prisma db push`)
- executa o seed inicial
- inicia o servidor Node.js

---

## package.json

Define as dependências da aplicação.

Principais bibliotecas utilizadas:

- `@apollo/server`
- `graphql`
- `express`
- `prisma`
- `@prisma/client`

---

# Camada de Persistência

## prisma/schema.prisma

Define o **modelo de dados da aplicação** utilizando Prisma.

Exemplo de entidades:

- `Author`
- `Book`

Este arquivo é utilizado para:

- gerar o **Prisma Client**
- sincronizar a estrutura do banco de dados

---

## prisma/seed.js

Script responsável por inserir **dados iniciais no banco de dados**, permitindo testar rapidamente a API após subir o ambiente.

---

## src/prisma.js

Responsável por criar e exportar uma instância do **Prisma Client**, utilizada pelos repositórios para acessar o banco de dados.

---

# Camada de Repositories

Os **repositories** são responsáveis pelo **acesso ao banco de dados**.

Eles utilizam o **Prisma ORM** para executar operações como:

- buscar registros
- inserir dados
- consultar entidades específicas

Essa camada encapsula o acesso ao banco, evitando que outras partes da aplicação dependam diretamente do ORM.

---

# Camada de Services

Os **services** contêm a **lógica de negócio da aplicação**.

Eles utilizam os repositories para acessar os dados e podem implementar regras como:

- validações
- orquestração de operações
- tratamento de erros

Resolvers chamam os services em vez de acessar diretamente o banco.

---

# Camada de GraphQL

## graphql/*.graphql

Define o **schema GraphQL da aplicação**.

Contém:

- tipos (`Book`, `Author`)
- queries
- mutations
- relacionamentos entre entidades

Este arquivo representa o **contrato da API**.

---

# Camada de Resolvers

Os **resolvers** conectam o schema GraphQL com os services da aplicação.

Eles são responsáveis por:

- receber as requisições GraphQL
- chamar os services correspondentes
- retornar os dados para o cliente

Também podem resolver **relacionamentos entre entidades**, como o autor de um livro.

---

# index.js

Arquivo principal da aplicação.

Responsável por:

- iniciar o servidor Apollo
- carregar os schemas GraphQL
- registrar os resolvers
- iniciar o servidor HTTP