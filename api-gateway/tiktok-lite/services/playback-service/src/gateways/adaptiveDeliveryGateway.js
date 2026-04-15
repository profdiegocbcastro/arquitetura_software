import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { ExternalServiceError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Gateway gRPC da API 2 (adaptive delivery)
 * =========================================================
 *
 * Isola os detalhes de comunicação com a API 2.
 */
export class AdaptiveDeliveryGateway {
  constructor(target) {
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

    this.client = new adaptivePackage.AdaptiveDeliveryService(
      target,
      grpc.credentials.createInsecure()
    );
  }

  async resolveQuality({ networkProfile, bandwidthKbps }) {
    try {
      return await this.callUnary("ResolveQuality", {
        network_profile: networkProfile,
        bandwidth_kbps: bandwidthKbps,
      });
    } catch (error) {
      throw new ExternalServiceError(
        `Falha ao chamar a API 2 gRPC de adaptive delivery: ${error.message}`
      );
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
