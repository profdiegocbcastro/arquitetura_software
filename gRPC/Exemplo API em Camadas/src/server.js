import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

import { CatalogDatabase } from "./database/catalogDatabase.js";
import { OrderDatabase } from "./database/orderDatabase.js";
import { OrderRepository } from "./order/orderRepository.js";
import { OrderService } from "./order/orderService.js";
import { getOrderController } from "./order/orderController.js";
import { ProductRepository } from "./product/productRepository.js";

/**
 * Arquivo principal do servidor gRPC.
 *
 * Responsável por:
 * 1) Carregar o contrato .proto
 * 2) Montar as camadas da aplicação
 * 3) Registrar a controller do serviço gRPC
 * 4) Publicar o servidor na porta 50051
 */

/**
 * ===============================
 * 1) Montando as camadas
 * ===============================
 *
 * O fluxo deste exemplo é:
 *
 * gRPC -> Controller -> Service -> Repository -> Database
 */
const server = new grpc.Server();

const catalogDatabase = new CatalogDatabase();
const orderDatabase = new OrderDatabase();
const orderRepository = new OrderRepository(orderDatabase);
const productRepository = new ProductRepository(catalogDatabase);
const orderService = new OrderService(orderRepository, productRepository);
const orderController = getOrderController(orderService);

/**
 * A controller traduz a chamada gRPC para a camada de serviço.
 */

/**
 * Carregando o contrato .proto e registrando a controller do serviço gRPC no servidor.
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/orderApi.proto"),
  {}
);
const orderPackage = grpc.loadPackageDefinition(packageDefinition).orderPackage;

server.addService(orderPackage.OrderApi.service, orderController);

/**
 * Publicando o servidor gRPC na porta 50051.
 */
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Servidor gRPC de pedidos escutando em 127.0.0.1:${port}`);
  }
);
