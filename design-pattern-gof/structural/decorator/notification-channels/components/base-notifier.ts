import { Notifier } from "./notifier";
import { NotificationRecipient } from "../types/notification-recipient";

export class BaseNotifier implements Notifier {
  send(message: string, recipient: NotificationRecipient): void {
    console.log(
      `[Base] Preparando notificação para ${recipient.name}: ${message}`,
    );
  }
}
