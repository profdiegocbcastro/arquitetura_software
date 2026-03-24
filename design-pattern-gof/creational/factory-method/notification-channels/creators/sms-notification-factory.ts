import { NotificationFactory } from "./notification-factory";
import { Notification } from "../products/notification";
import { SmsNotification } from "../products/sms-notification";

export class SmsNotificationFactory extends NotificationFactory {
  protected createNotification(): Notification {
    return new SmsNotification();
  }
}
