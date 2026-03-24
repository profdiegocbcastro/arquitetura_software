import { NotificationRecipient } from "../types/notification-recipient";

export interface Notifier {
  send(message: string, recipient: NotificationRecipient): void;
}
