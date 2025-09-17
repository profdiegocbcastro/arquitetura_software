import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

import { BookDatasource } from './Book/Datasource.js';
import { BookService } from './Book/Service.js';
import { getBookServiceImplementation } from './Book/Implementation.js';

const packageDefinition = protoLoader.loadSync( path.join(process.cwd(), 'proto/bookStore.proto'),{});
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookStorePackage;

const bookDatasource = new BookDatasource();
const bookService = new BookService(bookDatasource);

const server = new grpc.Server();

const serviceImplementation = getBookServiceImplementation(bookService);

server.addService(bookStorePackage.Book.service, serviceImplementation);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});