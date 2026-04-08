/**
 * =========================================================
 * Repositório de Chat
 * =========================================================
 *
 * Neste exemplo didático, usamos armazenamento em memória.
 */
export class ChatRepository {
  constructor() {
    this.messages = [];
    this.sequence = 0;
  }

  /**
   * Persiste uma nova mensagem.
   */
  create({ fromUserId, toUserId, content }) {
    this.sequence += 1;

    const message = {
      id: `chat_${this.sequence}`,
      from_user_id: fromUserId,
      to_user_id: toUserId,
      content,
      sent_at: new Date().toISOString(),
    };

    this.messages.push(message);
    return message;
  }

  /**
   * Lista mensagens em que o usuário é remetente ou destinatário.
   */
  findByUser(userId) {
    return this.messages.filter(
      (message) => message.from_user_id === userId || message.to_user_id === userId
    );
  }
}
