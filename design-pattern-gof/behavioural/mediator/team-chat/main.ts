import { TeamMember } from "./colleagues/team-member";
import { TeamChatRoom } from "./mediators/team-chat-room";

const chatRoom = new TeamChatRoom();

const ana = new TeamMember("Ana", chatRoom);
const bruno = new TeamMember("Bruno", chatRoom);
const clara = new TeamMember("Clara", chatRoom);

chatRoom.register(ana);
chatRoom.register(bruno);
chatRoom.register(clara);

ana.send("Pessoal, a daily comeca em 5 minutos.");
console.log("");
clara.send("Recebido. Vou compartilhar o status do deploy.");
