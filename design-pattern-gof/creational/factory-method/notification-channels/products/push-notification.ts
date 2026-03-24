import { Notification } from "./notification";
import { NotificationRecipient } from "../types/notification-recipient";

export class PushNotification implements Notification {
  send(recipient: NotificationRecipient, message: string): void {
    console.log(
      `[Push] Enviando para o dispositivo ${recipient.deviceToken}: ${message}`,
    );
  }
}
