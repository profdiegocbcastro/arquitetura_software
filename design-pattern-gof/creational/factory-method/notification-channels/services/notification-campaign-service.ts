import { NotificationFactory } from "../creators/notification-factory";
import { NotificationRecipient } from "../types/notification-recipient";

export class NotificationCampaignService {
  constructor(private readonly notificationFactory: NotificationFactory) {}

  runCampaign(
    recipient: NotificationRecipient,
    message: string,
  ): void {
    // O serviço mantém o fluxo da campanha sem conhecer o canal concreto.
    this.notificationFactory.sendNotification(recipient, message);
  }
}
