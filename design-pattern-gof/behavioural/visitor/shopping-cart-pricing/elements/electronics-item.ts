import { CartVisitor } from "../visitors/cart-visitor";
import { CartItem } from "./cart-item";

export class ElectronicsItem implements CartItem {
  constructor(
    private readonly name: string,
    private readonly price: number,
  ) {}

  accept(visitor: CartVisitor): void {
    visitor.visitElectronics(this);
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}
