import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { ExternalServiceError, NotFoundError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Gateway gRPC da API 1 (video feed)
 * =========================================================
 *
 * Isola os detalhes de comunicação com a API de feed.
 */
export class VideoFeedGateway {
  constructor(target) {
    const packageDefinition = protoLoader.loadSync(
      path.join(process.cwd(), "proto/video_feed.proto"),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      }
    );

    const videoFeedPackage = grpc.loadPackageDefinition(packageDefinition).videofeed;

    this.client = new videoFeedPackage.VideoFeedService(
      target,
      grpc.credentials.createInsecure()
    );
  }

  async getVideoById(videoId) {
    try {
      return await this.callUnary("GetVideoById", {
        video_id: videoId,
      });
    } catch (error) {
      if (error.code === grpc.status.NOT_FOUND) {
        throw new NotFoundError(`Vídeo ${videoId} não encontrado.`);
      }

      throw new ExternalServiceError(
        `Falha ao chamar a API 1 gRPC de video feed: ${error.message}`
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
