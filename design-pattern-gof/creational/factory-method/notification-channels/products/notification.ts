import { NotificationRecipient } from "../types/notification-recipient";

export interface Notification {
  send(recipient: NotificationRecipient, message: string): void;
}
