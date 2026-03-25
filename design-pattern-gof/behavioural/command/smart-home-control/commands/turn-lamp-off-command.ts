import { SmartLamp } from "../receivers/smart-lamp";
import { Command } from "./command";

export class TurnLampOffCommand implements Command {
  constructor(private readonly lamp: SmartLamp) {}

  execute(): void {
    this.lamp.turnOff();
  }

  undo(): void {
    this.lamp.turnOn();
  }
}
