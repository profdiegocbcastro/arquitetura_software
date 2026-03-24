import { Notification } from "./notification";
import { NotificationRecipient } from "../types/notification-recipient";

export class EmailNotification implements Notification {
  send(recipient: NotificationRecipient, message: string): void {
    console.log(
      `[E-mail] Enviando para ${recipient.email} com assunto "Atualização da campanha": ${message}`,
    );
  }
}
