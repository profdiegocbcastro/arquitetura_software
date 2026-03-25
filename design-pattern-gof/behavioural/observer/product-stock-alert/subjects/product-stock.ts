import { Observer } from "../observers/observer";

export class ProductStock {
  private readonly observers: Observer[] = [];

  constructor(
    private readonly name: string,
    private quantity: number,
  ) {}

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
    this.notify();
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  getName(): string {
    return this.name;
  }

  getQuantity(): number {
    return this.quantity;
  }
}
