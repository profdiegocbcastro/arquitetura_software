import express from "express";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

import { getPlaybackController } from "./controllers/playbackController.js";
import { AdaptiveDeliveryGateway } from "./gateways/adaptiveDeliveryGateway.js";
import { VideoFeedGateway } from "./gateways/videoFeedGateway.js";
import { PlaybackService } from "./services/playbackService.js";

/**
 * =========================================================
 * Arquivo principal da API 2 gRPC (playback)
 * =========================================================
 *
 * Fluxo:
 *
 * GraphQL BFF -> Controller -> Service
 *                          |        |
 *                          |        +-> Gateway gRPC da API 1 (video feed)
 *                          |
 *                          +---------> Gateway gRPC da API 3 (adaptive delivery)
 *
 * Além do gRPC, este serviço também expõe a mídia em HTTP.
 */

/**
 * ===============================
 * 1) Instanciando os servidores
 * ===============================
 */
const grpcServer = new grpc.Server();
const mediaApp = express();

const grpcPort = Number(process.env.GRPC_PORT ?? 50051);
const mediaPort = Number(process.env.MEDIA_PORT ?? 7000);
const videoFeedTarget = process.env.VIDEO_FEED_GRPC_TARGET ?? "video-feed-service:50053";
const adaptiveTarget =
  process.env.ADAPTIVE_DELIVERY_GRPC_TARGET ?? "adaptive-delivery-service:50052";
const rtmpIngestUrl = process.env.RTMP_INGEST_URL ?? "rtmp://localhost:1935/live";

/**
 * ===============================
 * 2) Montando as camadas da aplicação
 * ===============================
 */
const videoFeedGateway = new VideoFeedGateway(videoFeedTarget);
const adaptiveDeliveryGateway = new AdaptiveDeliveryGateway(adaptiveTarget);
const playbackService = new PlaybackService(
  videoFeedGateway,
  adaptiveDeliveryGateway,
  rtmpIngestUrl
);
const playbackController = getPlaybackController(playbackService);

/**
 * ===============================
 * 3) Carregando o contrato .proto
 * ===============================
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/playback.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const playbackPackage = grpc.loadPackageDefinition(packageDefinition).playback;

/**
 * ===============================
 * 4) Registrando o serviço gRPC
 * ===============================
 */
grpcServer.addService(playbackPackage.PlaybackService.service, playbackController);

/**
 * ===============================
 * 5) Publicando a mídia em HTTP
 * ===============================
 */
mediaApp.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "playback-service",
  });
});

mediaApp.use("/media", express.static(path.join(process.cwd(), "media")));

/**
 * ===============================
 * 6) Publicando os servidores
 * ===============================
 */
grpcServer.bindAsync(
  `0.0.0.0:${grpcPort}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("[playback-service] erro ao iniciar gRPC:", error);
      return;
    }

    grpcServer.start();
    console.log(`[playback-service] gRPC online em 0.0.0.0:${port}`);
    console.log(`[playback-service] video feed target: ${videoFeedTarget}`);
    console.log(`[playback-service] adaptive delivery target: ${adaptiveTarget}`);
  }
);

mediaApp.listen(mediaPort, () => {
  console.log(`[playback-service] mídia HTTP online em http://0.0.0.0:${mediaPort}/media`);
  console.log(`[playback-service] RTMP ingest configurado em ${rtmpIngestUrl}`);
});
