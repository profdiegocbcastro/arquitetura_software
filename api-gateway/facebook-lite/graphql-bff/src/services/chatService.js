/**
 * =========================================================
 * Serviço de Chat do BFF
 * =========================================================
 */
export class ChatService {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async sendMessageAndNotify({ fromUserId, toUserId, content }) {
    const safeFromUserId = readRequiredText(fromUserId, "fromUserId");
    const safeToUserId = readRequiredText(toUserId, "toUserId");
    const safeContent = readRequiredText(content, "content");

    const grpcResponse = await this.chatRepository.sendMessageAndNotify({
      fromUserId: safeFromUserId,
      toUserId: safeToUserId,
      content: safeContent,
    });

    return {
      api1Instance: grpcResponse.api_1_instance,
      message: toGraphQLMessage(grpcResponse.message),
      notification: toGraphQLNotification(grpcResponse.notification),
    };
  }

  async listMessagesByUser(userId) {
    const safeUserId = readRequiredText(userId, "userId");
    const grpcResponse = await this.chatRepository.listMessagesByUser(safeUserId);
    return grpcResponse.messages.map(toGraphQLMessage);
  }

  async listNotificationsByUser(userId) {
    const safeUserId = readRequiredText(userId, "userId");
    const grpcResponse = await this.chatRepository.listNotificationsByUser(safeUserId);
    return grpcResponse.notifications.map(toGraphQLNotification);
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new Error(`${fieldName} é obrigatório.`);
  }

  return normalizedValue;
}

function toGraphQLMessage(grpcMessage) {
  return {
    id: grpcMessage.id,
    fromUserId: grpcMessage.from_user_id,
    toUserId: grpcMessage.to_user_id,
    content: grpcMessage.content,
    sentAt: grpcMessage.sent_at,
  };
}

function toGraphQLNotification(grpcNotification) {
  return {
    id: grpcNotification.id,
    userId: grpcNotification.user_id,
    title: grpcNotification.title,
    content: grpcNotification.content,
    createdAt: grpcNotification.created_at,
  };
}
