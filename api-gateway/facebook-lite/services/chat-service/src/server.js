import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { getChatController } from "./controllers/chatController.js";
import { NotificationGateway } from "./gateways/notificationGateway.js";
import { ChatRepository } from "./repositories/chatRepository.js";
import { ChatService } from "./services/chatService.js";

/**
 * =========================================================
 * Arquivo principal da API 1 gRPC (chat)
 * =========================================================
 *
 * Fluxo do exemplo:
 *
 * gRPC -> Controller -> Service -> Repository
 *                            |
 *                            +-> Gateway gRPC da API 2
 */

/**
 * ===============================
 * 1) Instanciando o servidor gRPC
 * ===============================
 */
const server = new grpc.Server();
const api1Instance = process.env.API_1_INSTANCE_NAME ?? "api-1-grpc-chat";
const notificationTarget =
  process.env.NOTIFICATION_GRPC_TARGET ?? "notification-service:50052";

/**
 * ===============================
 * 2) Montando as camadas da aplicação
 * ===============================
 */
const chatRepository = new ChatRepository();
const notificationGateway = new NotificationGateway(notificationTarget);
const chatService = new ChatService(chatRepository, notificationGateway, api1Instance);
const chatController = getChatController(chatService);

/**
 * ===============================
 * 3) Carregando o contrato .proto
 * ===============================
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/chat.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const chatPackage = grpc.loadPackageDefinition(packageDefinition).chat;

/**
 * ===============================
 * 4) Registrando o serviço no servidor
 * ===============================
 */
server.addService(chatPackage.ChatService.service, chatController);

/**
 * ===============================
 * 5) Publicando o servidor na porta 50051
 * ===============================
 */
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("[chat-service] erro ao iniciar:", error);
      return;
    }

    console.log(`[chat-service] API 1 gRPC online em 0.0.0.0:${port}`);
    console.log(`[chat-service] API 2 target configurado para: ${notificationTarget}`);
  }
);
