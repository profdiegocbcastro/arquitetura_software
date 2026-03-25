import { TeamMember } from "./team-member";

export interface ChatMediator {
  register(member: TeamMember): void;
  sendMessage(message: string, sender: TeamMember): void;
}
