import { Command } from "../commands/command";

export class EditorToolbar {
  private readonly history: Command[] = [];

  run(command: Command): void {
    console.log(`[EditorToolbar] Executando ${command.constructor.name}.`);
    command.execute();
    this.history.push(command);
  }

  undoLast(): void {
    const command = this.history.pop();

    if (!command) {
      console.log("[EditorToolbar] Nenhum comando para desfazer.");
      return;
    }

    console.log(`[EditorToolbar] Desfazendo ${command.constructor.name}.`);
    command.undo();
  }
}
