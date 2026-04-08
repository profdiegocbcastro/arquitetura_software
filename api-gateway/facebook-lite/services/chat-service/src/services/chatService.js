/**
 * =========================================================
 * Serviço de Chat
 * =========================================================
 */
export class ChatService {
  constructor(chatRepository, notificationGateway, api1Instance) {
    this.chatRepository = chatRepository;
    this.notificationGateway = notificationGateway;
    this.api1Instance = api1Instance;
  }

  /**
   * Cria mensagem e aciona a API 2 gRPC para gerar notificação.
   */
  async sendMessageAndNotify({ fromUserId, toUserId, content }) {
    const message = this.chatRepository.create({ fromUserId, toUserId, content });

    const notification = await this.notificationGateway.createNotification({
      userId: toUserId,
      title: `Nova mensagem de ${fromUserId}`,
      content,
    });

    return {
      message,
      notification,
      api_1_instance: this.api1Instance,
    };
  }

  /**
   * Lista mensagens de um usuário.
   */
  listMessagesByUser(userId) {
    return {
      messages: this.chatRepository.findByUser(userId),
    };
  }

  /**
   * Encaminha a consulta de notificações para a API 2.
   */
  async listNotificationsByUser(userId) {
    return this.notificationGateway.listNotificationsByUser(userId);
  }
}
