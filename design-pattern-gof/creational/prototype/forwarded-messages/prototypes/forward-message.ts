import { Prototype } from "./prototype";
import { MessageRecipient } from "../types/message-recipient";

export class ForwardMessage implements Prototype<ForwardMessage> {
  constructor(
    public subject: string,
    public originalSender: string,
    public body: string,
    public attachments: string[],
    public recipient: MessageRecipient | null = null,
    public forwardingNote: string = "",
  ) {}

  clone(): ForwardMessage {
    return new ForwardMessage(
      this.subject,
      this.originalSender,
      this.body,
      [...this.attachments],
      this.recipient ? { ...this.recipient } : null,
      this.forwardingNote,
    );
  }
}
