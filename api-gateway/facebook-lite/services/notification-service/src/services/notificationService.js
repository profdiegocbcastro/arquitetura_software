/**
 * =========================================================
 * Serviço de Notification
 * =========================================================
 */
export class NotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  /**
   * Cria uma nova notificação.
   */
  createNotification({ userId, title, content }) {
    return this.notificationRepository.create({ userId, title, content });
  }

  /**
   * Lista notificações de um usuário.
   */
  listNotificationsByUser(userId) {
    return {
      notifications: this.notificationRepository.findByUser(userId),
    };
  }
}
