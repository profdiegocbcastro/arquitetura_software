import { ForwardMessage } from "../prototypes/forward-message";
import { MessageRecipient } from "../types/message-recipient";

export class MessageForwardingService {
  forwardToRecipients(
    baseMessage: ForwardMessage,
    recipients: MessageRecipient[],
  ): ForwardMessage[] {
    return recipients.map((recipient) => {
      const message = baseMessage.clone();
      message.recipient = recipient;
      message.forwardingNote = `Encaminhado para ${recipient.name} em ${recipient.email}.`;
      return message;
    });
  }

  print(messages: ForwardMessage[]): void {
    messages.forEach((message) => {
      console.log("Mensagem encaminhada:");
      console.log(JSON.stringify(message, null, 2));
    });
  }
}
