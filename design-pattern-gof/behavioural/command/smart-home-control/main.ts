import { TurnLampOffCommand } from "./commands/turn-lamp-off-command";
import { TurnLampOnCommand } from "./commands/turn-lamp-on-command";
import { RemoteControl } from "./invokers/remote-control";
import { SmartLamp } from "./receivers/smart-lamp";

const livingRoomLamp = new SmartLamp("Lampada da sala");
const turnLampOnCommand = new TurnLampOnCommand(livingRoomLamp);
const turnLampOffCommand = new TurnLampOffCommand(livingRoomLamp);
const remoteControl = new RemoteControl();

remoteControl.press(turnLampOnCommand);
remoteControl.press(turnLampOffCommand);
remoteControl.undoLast();
