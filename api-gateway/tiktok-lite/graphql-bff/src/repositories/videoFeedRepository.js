import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

/**
 * =========================================================
 * Repositório de Feed (acesso via gRPC)
 * =========================================================
 *
 * Responsável pelas chamadas para a API 1.
 */
export class VideoFeedRepository {
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

  listFeed() {
    return this.callUnary("ListFeed", {});
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
