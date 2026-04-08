/**
 * =========================================================
 * Repositório de Notification
 * =========================================================
 *
 * Neste exemplo didático, usamos armazenamento em memória.
 */
export class NotificationRepository {
  constructor() {
    this.notifications = [];
    this.sequence = 0;
  }

  /**
   * Persiste uma nova notificação.
   */
  create({ userId, title, content }) {
    this.sequence += 1;

    const notification = {
      id: `notif_${this.sequence}`,
      user_id: userId,
      title,
      content,
      created_at: new Date().toISOString(),
    };

    this.notifications.push(notification);
    return notification;
  }

  /**
   * Lista notificações por usuário.
   */
  findByUser(userId) {
    return this.notifications.filter((notification) => notification.user_id === userId);
  }
}
