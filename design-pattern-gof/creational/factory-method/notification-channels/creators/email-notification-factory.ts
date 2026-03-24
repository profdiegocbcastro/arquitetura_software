import { NotificationFactory } from "./notification-factory";
import { Notification } from "../products/notification";
import { EmailNotification } from "../products/email-notification";

export class EmailNotificationFactory extends NotificationFactory {
  protected createNotification(): Notification {
    return new EmailNotification();
  }
}
