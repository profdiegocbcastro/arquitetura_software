import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "node:path";

/**
 * =========================================================
 * Repositório de Playback (acesso via gRPC)
 * =========================================================
 *
 * Responsável pelas chamadas para a API 2.
 */
export class PlaybackRepository {
  constructor(target) {
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

    this.client = new playbackPackage.PlaybackService(
      target,
      grpc.credentials.createInsecure()
    );
  }

  startPlayback({ videoId, networkProfile, bandwidthKbps }) {
    return this.callUnary("StartPlayback", {
      video_id: videoId,
      network_profile: networkProfile,
      bandwidth_kbps: bandwidthKbps,
    });
  }

  getIngestInfo() {
    return this.callUnary("GetIngestInfo", {});
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
