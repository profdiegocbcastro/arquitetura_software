import { ChatMediator } from "./chat-mediator";

export class TeamMember {
  constructor(
    private readonly name: string,
    private readonly mediator: ChatMediator,
  ) {}

  send(message: string): void {
    console.log(`[TeamMember] ${this.name} enviou: ${message}`);
    this.mediator.sendMessage(message, this);
  }

  receive(message: string, senderName: string): void {
    console.log(
      `[TeamMember] ${this.name} recebeu de ${senderName}: ${message}`,
    );
  }

  getName(): string {
    return this.name;
  }
}
