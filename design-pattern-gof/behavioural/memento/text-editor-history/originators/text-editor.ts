import { EditorMemento } from "../mementos/editor-memento";

export class TextEditor {
  private content = "";

  write(content: string): void {
    this.content = content;
  }

  createMemento(): EditorMemento {
    return new EditorMemento(this.content);
  }

  restore(memento: EditorMemento): void {
    this.content = memento.content;
  }

  getContent(): string {
    return this.content;
  }
}
