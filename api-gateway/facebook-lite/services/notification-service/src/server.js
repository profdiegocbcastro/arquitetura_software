import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { getNotificationController } from "./controllers/notificationController.js";
import { NotificationRepository } from "./repositories/notificationRepository.js";
import { NotificationService } from "./services/notificationService.js";

/**
 * =========================================================
 * Arquivo principal da API 2 gRPC (notification)
 * =========================================================
 *
 * Fluxo do exemplo:
 *
 * gRPC -> Controller -> Service -> Repository
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
const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);
const notificationController = getNotificationController(notificationService);

/**
 * ===============================
 * 3) Carregando o contrato .proto
 * ===============================
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/notification.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const notificationPackage = grpc.loadPackageDefinition(packageDefinition).notification;

/**
 * ===============================
 * 4) Registrando o serviço no servidor
 * ===============================
 */
server.addService(notificationPackage.NotificationService.service, notificationController);

/**
 * ===============================
 * 5) Publicando o servidor na porta 50052
 * ===============================
 */
server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("[notification-service] erro ao iniciar:", error);
      return;
    }

    console.log(`[notification-service] gRPC online em 0.0.0.0:${port}`);
  }
);
