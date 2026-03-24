import { NotificationFactory } from "./notification-factory";
import { Notification } from "../products/notification";
import { PushNotification } from "../products/push-notification";

export class PushNotificationFactory extends NotificationFactory {
  protected createNotification(): Notification {
    return new PushNotification();
  }
}
