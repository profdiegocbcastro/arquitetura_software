import { CartVisitor } from "../visitors/cart-visitor";
import { CartItem } from "./cart-item";

export class BookItem implements CartItem {
  constructor(
    private readonly title: string,
    private readonly price: number,
  ) {}

  accept(visitor: CartVisitor): void {
    visitor.visitBook(this);
  }

  getTitle(): string {
    return this.title;
  }

  getPrice(): number {
    return this.price;
  }
}
