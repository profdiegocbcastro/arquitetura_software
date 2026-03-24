import { NotifierDecorator } from "./notifier-decorator";
import { NotificationRecipient } from "../types/notification-recipient";

export class SlackNotifierDecorator extends NotifierDecorator {
  override send(message: string, recipient: NotificationRecipient): void {
    super.send(message, recipient);
    console.log(`[Slack] Publicando em ${recipient.slackChannel}: ${message}`);
  }
}
