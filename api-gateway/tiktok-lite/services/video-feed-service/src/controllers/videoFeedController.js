import { ValidationError } from "../shared/applicationError.js";
import { toGrpcError } from "../shared/toGrpcError.js";

/**
 * =========================================================
 * Controller gRPC de Video Feed
 * =========================================================
 *
 * Camada de entrada do serviço gRPC.
 */
export function getVideoFeedController(videoFeedService) {
  return {
    /**
     * Implementação de:
     * rpc ListFeed(ListFeedRequest) returns (ListFeedResponse)
     */
    async ListFeed(_call, callback) {
      try {
        const response = videoFeedService.listFeed();
        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc GetVideoById(GetVideoByIdRequest) returns (VideoDetails)
     */
    async GetVideoById(call, callback) {
      try {
        const videoId = readRequiredText(call.request.video_id, "video_id");
        const response = videoFeedService.getVideoById(videoId);
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
