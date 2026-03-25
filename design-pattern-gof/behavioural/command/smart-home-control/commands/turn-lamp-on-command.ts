import { SmartLamp } from "../receivers/smart-lamp";
import { Command } from "./command";

export class TurnLampOnCommand implements Command {
  constructor(private readonly lamp: SmartLamp) {}

  execute(): void {
    this.lamp.turnOn();
  }

  undo(): void {
    this.lamp.turnOff();
  }
}
