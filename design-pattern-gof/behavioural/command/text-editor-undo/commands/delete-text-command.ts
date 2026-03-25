import { TextDocument } from "../receivers/text-document";
import { Command } from "./command";

export class DeleteTextCommand implements Command {
  private removedText = "";

  constructor(
    private readonly document: TextDocument,
    private readonly quantity: number,
  ) {}

  execute(): void {
    this.removedText = this.document.readLast(this.quantity);
    this.document.removeLast(this.quantity);
  }

  undo(): void {
    this.document.append(this.removedText);
  }
}
