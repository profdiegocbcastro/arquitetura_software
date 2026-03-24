import { EmailNotificationFactory } from "./creators/email-notification-factory";
import { PushNotificationFactory } from "./creators/push-notification-factory";
import { SmsNotificationFactory } from "./creators/sms-notification-factory";
import { NotificationCampaignService } from "./services/notification-campaign-service";
import { NotificationRecipient } from "./types/notification-recipient";

const recipient: NotificationRecipient = {
  name: "Marina",
  email: "marina@empresa.com",
  phone: "+55 11 99999-0000",
  deviceToken: "device-token-123",
};

const emailCampaign = new NotificationCampaignService(
  new EmailNotificationFactory(),
);
const smsCampaign = new NotificationCampaignService(
  new SmsNotificationFactory(),
);
const pushCampaign = new NotificationCampaignService(
  new PushNotificationFactory(),
);

emailCampaign.runCampaign(
  recipient,
  `Olá, ${recipient.name}. Seu relatório mensal já está disponível.`,
);
smsCampaign.runCampaign(
  recipient,
  "Seu código de autenticação expirará em 5 minutos.",
);
pushCampaign.runCampaign(
  recipient,
  "Uma nova atualização foi liberada no aplicativo.",
);
