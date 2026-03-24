import { NotifierDecorator } from "./notifier-decorator";
import { NotificationRecipient } from "../types/notification-recipient";

export class SmsNotifierDecorator extends NotifierDecorator {
  override send(message: string, recipient: NotificationRecipient): void {
    super.send(message, recipient);
    console.log(`[SMS] Enviando para ${recipient.phone}: ${message}`);
  }
}
