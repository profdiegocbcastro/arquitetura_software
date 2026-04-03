/**
 * Arquivo principal da aplicação.
 *
 * Responsável por:
 * 1) Inicializar o servidor HTTP (Express)
 * 2) Inicializar o servidor GraphQL (Apollo Server)
 * 3) Carregar o schema GraphQL (.graphql)
 * 4) Montar as camadas: Resolver -> Service -> Repository -> ORM
 */

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { prisma } from "./prisma.js";

import { AuthorRepository } from "./repositories/authorRepository.js";
import { BookRepository } from "./repositories/bookRepository.js";

import { AuthorService } from "./services/authorService.js";
import { BookService } from "./services/bookService.js";

import { buildResolvers } from "./resolvers/index.js";

/**
 * ===============================
 * 1) Carregando o schema GraphQL
 * ===============================
 *
 * Agora o schema está modular:
 * - schema.graphql (raiz)
 * - book.graphql
 * - author.graphql
 */
const typeDefs = [
  readFileSync(join(process.cwd(), "src/graphql/schema.graphql"), "utf8"),
  readFileSync(join(process.cwd(), "src/graphql/book.graphql"), "utf8"),
  readFileSync(join(process.cwd(), "src/graphql/author.graphql"), "utf8"),
];

/**
 * ===============================
 * 2) Montando as camadas
 * ===============================
 *
 * Neste exemplo, o Repository não usa SQL manual:
 * ele usa o Prisma (ORM).
 *
 * Resolver -> Service -> Repository -> Prisma -> PostgreSQL
 */
const authorRepository = new AuthorRepository(prisma);
const bookRepository = new BookRepository(prisma);

const authorService = new AuthorService(authorRepository);
const bookService = new BookService(bookRepository, authorRepository);

/**
 * ===============================
 * 3) Definição dos resolvers
 * ===============================
 *
 * Resolvers chamam services, não acessam banco diretamente.
 */
const resolvers = buildResolvers({ authorService, bookService });

/**
 * ===============================
 * 4) Schema executável
 * ===============================
 */
const schema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * ===============================
 * 5) Inicialização do servidor
 * ===============================
 */
async function startServer() {
  const app = express();

  const server = new ApolloServer({ schema });
  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));

  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, () => {
    console.log(`🚀 GraphQL server running at http://localhost:${port}/graphql`);
  });
}

startServer();