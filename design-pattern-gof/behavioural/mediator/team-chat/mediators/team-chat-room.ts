import { ChatMediator } from "../colleagues/chat-mediator";
import { TeamMember } from "../colleagues/team-member";

export class TeamChatRoom implements ChatMediator {
  private readonly members: TeamMember[] = [];

  register(member: TeamMember): void {
    this.members.push(member);
  }

  sendMessage(message: string, sender: TeamMember): void {
    this.members.forEach((member) => {
      if (member !== sender) {
        member.receive(message, sender.getName());
      }
    });
  }
}
