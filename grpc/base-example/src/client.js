import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

/**
 * Cliente gRPC de exemplo.
 *
 * Fluxo executado:
 * 1) Conecta ao servidor
 * 2) Cria um livro
 * 3) Lista os livros cadastrados
 */

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), 'proto/bookStore.proto'),
  {}
);
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookStorePackage;

function main() {
  /**
   * Cria um cliente gRPC para o serviço Book, conectando ao servidor na porta 50051.
   */
  const client = new bookStorePackage.Book(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  /**
   * Cria um livro com o título "Harry Potter" e, em seguida, lista os livros cadastrados.
   */
  client.createBook({ book: "Harry Potter" }, (err, response) => {
    if (err) {
      console.error("Erro ao criar livro:", err);
      return;
    }

    console.log("Livro criado:", response);

    client.readBooks({}, (err, res) => {
      if (err) {
        console.error("Erro ao listar livros:", err);
        return;
      }

      console.log("Livros:", res);
    });
  });
}

main();
