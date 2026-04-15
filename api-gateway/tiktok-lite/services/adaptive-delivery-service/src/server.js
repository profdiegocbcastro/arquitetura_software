import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { getAdaptiveDeliveryController } from "./controllers/adaptiveDeliveryController.js";
import { NetworkProfileRepository } from "./repositories/networkProfileRepository.js";
import { AdaptiveDeliveryService } from "./services/adaptiveDeliveryService.js";

/**
 * =========================================================
 * Arquivo principal da API 3 gRPC (adaptive delivery)
 * =========================================================
 *
 * Fluxo:
 *
 * gRPC -> Controller -> Service -> Repository
 */

/**
 * ===============================
 * 1) Instanciando o servidor gRPC
 * ===============================
 */
const server = new grpc.Server();
const grpcPort = Number(process.env.GRPC_PORT ?? 50052);

/**
 * ===============================
 * 2) Montando as camadas da aplicação
 * ===============================
 */
const networkProfileRepository = new NetworkProfileRepository();
const adaptiveDeliveryService = new AdaptiveDeliveryService(networkProfileRepository);
const adaptiveDeliveryController = getAdaptiveDeliveryController(adaptiveDeliveryService);

/**
 * ===============================
 * 3) Carregando o contrato .proto
 * ===============================
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/adaptive_delivery.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const adaptivePackage = grpc.loadPackageDefinition(packageDefinition).adaptive;

/**
 * ===============================
 * 4) Registrando o serviço no servidor
 * ===============================
 */
server.addService(
  adaptivePackage.AdaptiveDeliveryService.service,
  adaptiveDeliveryController
);

/**
 * ===============================
 * 5) Publicando o servidor na porta 50052
 * ===============================
 */
server.bindAsync(
  `0.0.0.0:${grpcPort}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("[adaptive-delivery-service] erro ao iniciar:", error);
      return;
    }

    server.start();
    console.log(`[adaptive-delivery-service] gRPC online em 0.0.0.0:${port}`);
  }
);
