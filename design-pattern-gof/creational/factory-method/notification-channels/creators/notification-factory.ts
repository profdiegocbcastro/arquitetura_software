import { Notification } from "../products/notification";
import { NotificationRecipient } from "../types/notification-recipient";

export abstract class NotificationFactory {
  protected abstract createNotification(): Notification;

  sendNotification(
    recipient: NotificationRecipient,
    message: string,
  ): void {
    const notification = this.createNotification();
    notification.send(recipient, message);
  }
}
