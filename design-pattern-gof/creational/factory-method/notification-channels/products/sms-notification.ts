import { Notification } from "./notification";
import { NotificationRecipient } from "../types/notification-recipient";

export class SmsNotification implements Notification {
  send(recipient: NotificationRecipient, message: string): void {
    console.log(`[SMS] Enviando para ${recipient.phone}: ${message}`);
  }
}
