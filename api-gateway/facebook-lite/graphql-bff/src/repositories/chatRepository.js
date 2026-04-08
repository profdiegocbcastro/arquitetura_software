import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

/**
 * =========================================================
 * Repositório de Chat (acesso via gRPC)
 * =========================================================
 *
 * Esta camada encapsula os detalhes de chamada para a API 1.
 */
export class ChatRepository {
  constructor(target) {
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

    this.client = new chatPackage.ChatService(target, grpc.credentials.createInsecure());
  }

  sendMessageAndNotify({ fromUserId, toUserId, content }) {
    return this.callUnary("SendMessageAndNotify", {
      from_user_id: fromUserId,
      to_user_id: toUserId,
      content,
    });
  }

  listMessagesByUser(userId) {
    return this.callUnary("ListMessagesByUser", {
      user_id: userId,
    });
  }

  listNotificationsByUser(userId) {
    return this.callUnary("ListNotificationsByUser", {
      user_id: userId,
    });
  }

  callUnary(method, request) {
    return new Promise((resolve, reject) => {
      this.client[method](request, (error, response) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(response);
      });
    });
  }
}
