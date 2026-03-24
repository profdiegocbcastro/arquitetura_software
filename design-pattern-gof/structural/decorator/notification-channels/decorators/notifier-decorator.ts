import { Notifier } from "../components/notifier";
import { NotificationRecipient } from "../types/notification-recipient";

export abstract class NotifierDecorator implements Notifier {
  constructor(protected readonly wrappee: Notifier) {}

  send(message: string, recipient: NotificationRecipient): void {
    this.wrappee.send(message, recipient);
  }
}
