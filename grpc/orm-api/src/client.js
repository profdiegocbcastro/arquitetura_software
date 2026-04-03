import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

/**
 * =========================================================
 * Cliente gRPC de demonstração
 * =========================================================
 *
 * Este cliente repete o fluxo do exemplo sem ORM,
 * mudando apenas a implementação da persistência.
 */

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/libraryApi.proto"),
  {}
);
const libraryPackage = grpc.loadPackageDefinition(packageDefinition).libraryPackage;

const client = new libraryPackage.LibraryApi(
  process.env.GRPC_SERVER_URL ?? "localhost:50051",
  grpc.credentials.createInsecure()
);

function promisifyUnary(methodName, payload) {
  return new Promise((resolve, reject) => {
    client[methodName](payload, (error, response) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
}

async function main() {
  try {
    const authors = await promisifyUnary("ListAuthors", {});
    console.log("Autores iniciais:");
    console.log(authors);

    const createdAuthor = await promisifyUnary("AddAuthor", {
      name: "Kent Beck",
    });
    console.log("\nAutor criado:");
    console.log(createdAuthor);

    const createdBook = await promisifyUnary("AddBook", {
      title: "Test-Driven Development",
      authorId: createdAuthor.authorId,
      available: true,
    });
    console.log("\nLivro criado:");
    console.log(createdBook);

    const fetchedBook = await promisifyUnary("GetBook", {
      bookId: createdBook.bookId,
    });
    console.log("\nLivro consultado por ID:");
    console.log(fetchedBook);

    const booksByAuthor = await promisifyUnary("ListBooksByAuthor", {
      authorId: createdAuthor.authorId,
    });
    console.log("\nLivros do autor criado:");
    console.log(booksByAuthor);

    await promisifyUnary("AddBook", {
      title: "Livro inválido",
      authorId: 999,
      available: true,
    });
  } catch (error) {
    console.error("\nErro esperado do fluxo:");
    console.error({
      code: error.code,
      details: error.details,
      message: error.message,
    });
  }
}

main();
