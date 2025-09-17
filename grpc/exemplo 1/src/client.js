import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), 'proto/bookStore.proto'),
  {}
);
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookStorePackage;

function main() {
  const client = new bookStorePackage.Book(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  client.createBook({ book: "Harry Potter" }, (err, response) => {
    client.readBooks({}, (err, res) => {
      console.log("Livros:", res);
    });
  });
}

main();
