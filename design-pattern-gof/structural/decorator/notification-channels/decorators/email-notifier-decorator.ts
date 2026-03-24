import { NotifierDecorator } from "./notifier-decorator";
import { NotificationRecipient } from "../types/notification-recipient";

export class EmailNotifierDecorator extends NotifierDecorator {
  override send(message: string, recipient: NotificationRecipient): void {
    super.send(message, recipient);
    console.log(`[E-mail] Enviando para ${recipient.email}: ${message}`);
  }
}
