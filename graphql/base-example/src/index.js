/**
 * Arquivo principal da aplicação.
 *
 * Responsável por:
 * 1) Inicializar o servidor HTTP (Express)
 * 2) Inicializar o servidor GraphQL (Apollo Server)
 * 3) Carregar o schema GraphQL (.graphql)
 * 4) Definir os resolvers
 * 5) Conectar ao banco PostgreSQL
 */

import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { readFileSync } from "fs"
import { join } from "path"

import db from "./db.js"

/**
 * ===============================
 * 1) Carregando o schema GraphQL
 * ===============================
 *
 * O schema define o "contrato" da API GraphQL.
 * Ele descreve:
 *
 * - Quais tipos existem
 * - Quais queries podem ser feitas
 * - Quais mutations existem
 *
 * Neste exemplo estamos carregando um arquivo
 * .graphql que contém essa definição.
 */

const typeDefs = readFileSync(
  join(process.cwd(), "src/book.graphql"),
  "utf8"
)

/**
 * ===============================
 * 2) Definição dos resolvers
 * ===============================
 *
 * Resolvers são funções responsáveis por
 * buscar os dados solicitados pelo cliente.
 *
 * Cada campo definido no schema pode possuir
 * um resolver correspondente.
 */

const resolvers = {

  /**
   * Resolvers de leitura de dados
   */
  Query: {

    /**
     * Query: books
     *
     * Executa uma consulta no banco de dados
     * para retornar todos os livros.
     */
    books: async () => {

      // Executa a consulta SQL
      const result = await db.query("SELECT * FROM books")

      // result.rows contém os dados retornados
      return result.rows
    }
  },

  /**
   * Resolvers de escrita de dados
   */
  Mutation: {

    /**
     * Mutation: addBook
     *
     * Insere um novo livro no banco de dados.
     */
    addBook: async (_, { title, author }) => {

      const result = await db.query(
        "INSERT INTO books(title, author, available) VALUES($1,$2,true) RETURNING *",
        [title, author]
      )

      return result.rows[0]
    }
  }
}

/**
 * ===============================
 * 3) Construindo o schema executável
 * ===============================
 *
 * makeExecutableSchema combina:
 *
 * - Schema GraphQL (typeDefs)
 * - Resolvers
 *
 * Criando um schema que o Apollo Server pode executar.
 */

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

/**
 * ===============================
 * 4) Inicialização do servidor
 * ===============================
 */

async function startServer() {

  /**
   * Express será utilizado como servidor HTTP.
   * O GraphQL será montado como um middleware.
   */
  const app = express()

  /**
   * Criação do Apollo Server
   */
  const server = new ApolloServer({
    schema
  })

  /**
   * O servidor GraphQL precisa ser iniciado
   * antes de ser conectado ao Express.
   */
  await server.start()

  /**
   * Middleware GraphQL
   *
   * Todas as requisições feitas para:
   *
   * http://localhost:4000/graphql
   *
   * serão tratadas pelo Apollo Server.
   */
  app.use("/graphql", express.json(), expressMiddleware(server))

  /**
   * Inicialização do servidor HTTP
   */
  app.listen(4000, () => {
    console.log("🚀 GraphQL server running at http://localhost:4000/graphql")
  })
}

/**
 * Inicia a aplicação
 */
startServer()