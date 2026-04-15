import { ValidationError } from "../shared/applicationError.js";
import { toGrpcError } from "../shared/toGrpcError.js";

/**
 * =========================================================
 * Controller gRPC de Playback
 * =========================================================
 *
 * Camada de entrada do serviço gRPC.
 */
export function getPlaybackController(playbackService) {
  return {
    /**
     * Implementação de:
     * rpc StartPlayback(StartPlaybackRequest) returns (PlaybackSession)
     */
    async StartPlayback(call, callback) {
      try {
        const videoId = readRequiredText(call.request.video_id, "video_id");
        const networkProfile = readOptionalNetworkProfile(call.request.network_profile);
        const bandwidthKbps = readOptionalBandwidth(call.request.bandwidth_kbps);

        const response = await playbackService.startPlayback({
          videoId,
          networkProfile,
          bandwidthKbps,
        });

        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc GetIngestInfo(GetIngestInfoRequest) returns (IngestInfo)
     */
    async GetIngestInfo(_call, callback) {
      try {
        const response = playbackService.getIngestInfo();
        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },
  };
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new ValidationError(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}

function readOptionalNetworkProfile(value) {
  const normalizedValue = (value ?? "auto").trim().toLowerCase();
  const supportedProfiles = ["low", "medium", "high", "auto"];

  if (!supportedProfiles.includes(normalizedValue)) {
    throw new ValidationError("network_profile deve ser low, medium, high ou auto.");
  }

  return normalizedValue;
}

function readOptionalBandwidth(value) {
  if (value === null || value === undefined || value === 0) {
    return 0;
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new ValidationError("bandwidth_kbps deve ser um número positivo.");
  }

  return Math.trunc(numericValue);
}
