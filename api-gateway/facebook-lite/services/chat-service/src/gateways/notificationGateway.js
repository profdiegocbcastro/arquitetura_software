import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { ExternalServiceError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Gateway gRPC da API 2 (notification)
 * =========================================================
 *
 * Isola os detalhes de comunicação com a API 2.
 */
export class NotificationGateway {
  constructor(target) {
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

    this.client = new notificationPackage.NotificationService(
      target,
      grpc.credentials.createInsecure()
    );
  }

  async createNotification({ userId, title, content }) {
    try {
      return await this.callUnary("CreateNotification", {
        user_id: userId,
        title,
        content,
      });
    } catch (error) {
      throw new ExternalServiceError(`Falha ao chamar API 2 gRPC: ${error.message}`);
    }
  }

  async listNotificationsByUser(userId) {
    try {
      return await this.callUnary("ListNotificationsByUser", {
        user_id: userId,
      });
    } catch (error) {
      throw new ExternalServiceError(`Falha ao chamar API 2 gRPC: ${error.message}`);
    }
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
