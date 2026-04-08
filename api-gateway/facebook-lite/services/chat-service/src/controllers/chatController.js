import { ValidationError } from "../shared/applicationError.js";
import { toGrpcError } from "../shared/toGrpcError.js";

/**
 * =========================================================
 * Controller gRPC de Chat
 * =========================================================
 *
 * Esta camada conhece o contrato gRPC.
 */
export function getChatController(chatService) {
  return {
    /**
     * Implementação de:
     * rpc SendMessageAndNotify(SendMessageRequest) returns (DeliveryResult)
     */
    async SendMessageAndNotify(call, callback) {
      try {
        const fromUserId = readRequiredText(call.request.from_user_id, "from_user_id");
        const toUserId = readRequiredText(call.request.to_user_id, "to_user_id");
        const content = readRequiredText(call.request.content, "content");

        const response = await chatService.sendMessageAndNotify({
          fromUserId,
          toUserId,
          content,
        });

        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc ListMessagesByUser(ListMessagesByUserRequest)
     * returns (ListMessagesByUserResponse)
     */
    async ListMessagesByUser(call, callback) {
      try {
        const userId = readRequiredText(call.request.user_id, "user_id");
        const response = await chatService.listMessagesByUser(userId);
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
        const response = await chatService.listNotificationsByUser(userId);
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
