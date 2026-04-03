import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { AuthorRepository } from "./author/authorRepository.js";
import { AuthorService } from "./author/authorService.js";
import { BookRepository } from "./book/bookRepository.js";
import { BookService } from "./book/bookService.js";
import { pool } from "./database/postgres.js";
import { getLibraryController } from "./library/libraryController.js";

/**
 * =========================================================
 * Arquivo principal do servidor gRPC
 * =========================================================
 *
 * Fluxo do exemplo:
 *
 * gRPC -> Controller -> Service -> Repository -> PostgreSQL
 */

/**
 * ===============================
 * 1) Instanciando o servidor gRPC
 * ===============================
 */
const server = new grpc.Server();

/**
 * ===============================
 * 2) Montando as camadas da aplicação
 * ===============================
 */
const authorRepository = new AuthorRepository(pool);
const bookRepository = new BookRepository(pool);

const authorService = new AuthorService(authorRepository);
const bookService = new BookService(bookRepository, authorRepository);

const libraryController = getLibraryController(authorService, bookService);

/**
 * ===============================
 * 3) Carregando o contrato .proto
 * ===============================
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/libraryApi.proto"),
  {}
);
const libraryPackage = grpc.loadPackageDefinition(packageDefinition).libraryPackage;

/**
 * ===============================
 * 4) Registrando o servico no servidor
 * ===============================
 */
server.addService(libraryPackage.LibraryApi.service, libraryController);

/**
 * ===============================
 * 5) Publicando o servidor na porta 50051
 * ===============================
 */
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Servidor gRPC da biblioteca escutando em 127.0.0.1:${port}`);
  }
);
