import { GameMemento } from "../mementos/game-memento";

export class SavepointManager {
  private readonly savepoints: GameMemento[] = [];

  save(memento: GameMemento): void {
    this.savepoints.push(memento);
  }

  getLast(): GameMemento | undefined {
    return this.savepoints.pop();
  }
}
