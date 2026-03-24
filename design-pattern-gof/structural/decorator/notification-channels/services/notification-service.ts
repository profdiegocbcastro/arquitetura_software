import { Notifier } from "../components/notifier";
import { NotificationRecipient } from "../types/notification-recipient";

export class NotificationService {
  constructor(private readonly notifier: Notifier) {}

  notify(message: string, recipient: NotificationRecipient): void {
    this.notifier.send(message, recipient);
  }
}
