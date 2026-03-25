import { GameMemento } from "../mementos/game-memento";

export class GameSession {
  private level = 1;
  private score = 0;
  private lives = 3;

  advanceLevel(): void {
    this.level += 1;
  }

  addScore(points: number): void {
    this.score += points;
  }

  takeDamage(damage: number): void {
    this.lives = Math.max(0, this.lives - damage);
  }

  createMemento(): GameMemento {
    return new GameMemento(this.level, this.score, this.lives);
  }

  restore(memento: GameMemento): void {
    this.level = memento.level;
    this.score = memento.score;
    this.lives = memento.lives;
  }

  getStatus(): string {
    return `nivel=${this.level}, score=${this.score}, vidas=${this.lives}`;
  }
}
