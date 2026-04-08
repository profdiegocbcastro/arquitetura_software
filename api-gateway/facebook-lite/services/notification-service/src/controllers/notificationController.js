import { ValidationError } from "../shared/applicationError.js";
import { toGrpcError } from "../shared/toGrpcError.js";

/**
 * =========================================================
 * Controller gRPC de Notification
 * =========================================================
 *
 * Esta camada conhece o contrato gRPC.
 */
export function getNotificationController(notificationService) {
  return {
    /**
     * Implementação de:
     * rpc CreateNotification(CreateNotificationRequest) returns (Notification)
     */
    async CreateNotification(call, callback) {
      try {
        const userId = readRequiredText(call.request.user_id, "user_id");
        const title = readRequiredText(call.request.title, "title");
        const content = readRequiredText(call.request.content, "content");

        const response = notificationService.createNotification({
          userId,
          title,
          content,
        });

        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc ListNotificationsByUser(ListNotificationsByUserRequest)
     * returns (ListNotificationsByUserResponse)
     */
    async ListNotificationsByUser(call, callback) {
      try {
        const userId = readRequiredText(call.request.user_id, "user_id");
        const response = notificationService.listNotificationsByUser(userId);
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
