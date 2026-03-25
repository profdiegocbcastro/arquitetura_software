import { EditorMemento } from "../mementos/editor-memento";

export class EditorHistory {
  private readonly snapshots: EditorMemento[] = [];

  save(memento: EditorMemento): void {
    this.snapshots.push(memento);
  }

  getLast(): EditorMemento | undefined {
    return this.snapshots.pop();
  }
}
