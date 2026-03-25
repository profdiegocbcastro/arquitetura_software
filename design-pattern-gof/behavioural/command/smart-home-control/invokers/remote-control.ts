import { Command } from "../commands/command";

export class RemoteControl {
  private lastCommand?: Command;

  press(command: Command): void {
    console.log(`[RemoteControl] Executando ${command.constructor.name}.`);
    command.execute();
    this.lastCommand = command;
  }

  undoLast(): void {
    if (!this.lastCommand) {
      console.log("[RemoteControl] Nenhum comando para desfazer.");
      return;
    }

    console.log(
      `[RemoteControl] Desfazendo ${this.lastCommand.constructor.name}.`,
    );
    this.lastCommand.undo();
    this.lastCommand = undefined;
  }
}
