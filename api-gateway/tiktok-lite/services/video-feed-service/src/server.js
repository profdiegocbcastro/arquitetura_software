import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { getVideoFeedController } from "./controllers/videoFeedController.js";
import { VideoCatalogRepository } from "./repositories/videoCatalogRepository.js";
import { VideoFeedService } from "./services/videoFeedService.js";

/**
 * =========================================================
 * Arquivo principal da API 1 gRPC (video feed)
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
const grpcPort = Number(process.env.GRPC_PORT ?? 50053);
const publicMediaBaseUrl =
  process.env.PUBLIC_MEDIA_BASE_URL ?? "http://localhost:4000/media";

/**
 * ===============================
 * 2) Montando as camadas da aplicação
 * ===============================
 */
const videoCatalogRepository = new VideoCatalogRepository(publicMediaBaseUrl);
const videoFeedService = new VideoFeedService(videoCatalogRepository);
const videoFeedController = getVideoFeedController(videoFeedService);

/**
 * ===============================
 * 3) Carregando o contrato .proto
 * ===============================
 */
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

/**
 * ===============================
 * 4) Registrando o serviço no servidor
 * ===============================
 */
server.addService(videoFeedPackage.VideoFeedService.service, videoFeedController);

/**
 * ===============================
 * 5) Publicando o servidor na porta 50053
 * ===============================
 */
server.bindAsync(
  `0.0.0.0:${grpcPort}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("[video-feed-service] erro ao iniciar:", error);
      return;
    }

    server.start();
    console.log(`[video-feed-service] gRPC online em 0.0.0.0:${port}`);
  }
);
