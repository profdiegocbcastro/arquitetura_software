import { TextDocument } from "../receivers/text-document";
import { Command } from "./command";

export class AppendTextCommand implements Command {
  constructor(
    private readonly document: TextDocument,
    private readonly text: string,
  ) {}

  execute(): void {
    this.document.append(this.text);
  }

  undo(): void {
    this.document.removeLast(this.text.length);
  }
}
