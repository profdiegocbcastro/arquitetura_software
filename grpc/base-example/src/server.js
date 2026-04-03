import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

import { BookDatasource } from './Book/Datasource.js';
import { BookService } from './Book/Service.js';
import { getBookServiceImplementation } from './Book/Implementation.js';

/**
 * Arquivo principal do servidor gRPC.
 *
 * Responsável por:
 * 1) Carregar o contrato .proto
 * 2) Montar as camadas da aplicação
 * 3) Registrar a implementação do serviço gRPC
 * 4) Publicar o servidor na porta 50051
 */

/**
 * ===============================
 * 1) Montando as camadas
 * ===============================
 *
 * O fluxo deste exemplo é:
 *
 * gRPC -> Implementation -> Service -> Datasource
 */

const server = new grpc.Server();

/**
 * A implementação traduz a chamada gRPC para a camada de serviço.
 */
const bookDatasource = new BookDatasource();
const bookService = new BookService(bookDatasource);

const serviceImplementation = getBookServiceImplementation(bookService);

/**
 * Carregando o contrato .proto e registrando a implementação do serviço gRPC no servidor.
 */
const packageDefinition = protoLoader.loadSync(path.join(process.cwd(), 'proto/bookStore.proto'), {});
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookStorePackage;
server.addService(bookStorePackage.Book.service, serviceImplementation);

/**
 * Publicando o servidor gRPC na porta 50051.
 */
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});
