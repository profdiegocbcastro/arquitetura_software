import { BaseNotifier } from "./components/base-notifier";
import { EmailNotifierDecorator } from "./decorators/email-notifier-decorator";
import { SlackNotifierDecorator } from "./decorators/slack-notifier-decorator";
import { SmsNotifierDecorator } from "./decorators/sms-notifier-decorator";
import { NotificationService } from "./services/notification-service";
import { NotificationRecipient } from "./types/notification-recipient";

const recipient: NotificationRecipient = {
  name: "Mariana",
  email: "mariana@empresa.com",
  phone: "+55 11 98888-1111",
  slackChannel: "#suporte-prioritario",
};

const notifier = new SmsNotifierDecorator(
  new SlackNotifierDecorator(new EmailNotifierDecorator(new BaseNotifier())),
);

const notificationService = new NotificationService(notifier);

notificationService.notify(
  "Seu chamado foi atualizado para o status Em atendimento.",
  recipient,
);
