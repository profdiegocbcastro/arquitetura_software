import { ForwardMessage } from "./prototypes/forward-message";
import { MessageForwardingService } from "./services/message-forwarding-service";
import { MessageRecipient } from "./types/message-recipient";

const baseForwardMessage = new ForwardMessage(
  "Fwd: Atualização do cronograma do projeto",
  "gerencia@empresa.com",
  "Prezados, segue o alinhamento atualizado do cronograma para validação.",
  ["cronograma-atualizado.pdf", "riscos-do-projeto.xlsx"],
);

const recipients: MessageRecipient[] = [
  {
    name: "Aline",
    email: "aline@empresa.com",
  },
  {
    name: "Roberto",
    email: "roberto@empresa.com",
  },
  {
    name: "Patrícia",
    email: "patricia@empresa.com",
  },
];

const forwardingService = new MessageForwardingService();
const forwardedMessages = forwardingService.forwardToRecipients(
  baseForwardMessage,
  recipients,
);

forwardedMessages[0].attachments.push("ata-da-reuniao.docx");

forwardingService.print(forwardedMessages);
console.log("Mensagem-base preservada:");
console.log(JSON.stringify(baseForwardMessage, null, 2));
