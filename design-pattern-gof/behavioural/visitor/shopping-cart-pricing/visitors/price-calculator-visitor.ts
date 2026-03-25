import { BookItem } from "../elements/book-item";
import { ElectronicsItem } from "../elements/electronics-item";
import { CartVisitor } from "./cart-visitor";

export class PriceCalculatorVisitor implements CartVisitor {
  private total = 0;

  visitBook(book: BookItem): void {
    console.log(`[PriceCalculatorVisitor] Livro ${book.getTitle()} = R$ ${book.getPrice().toFixed(2)}`);
    this.total += book.getPrice();
  }

  visitElectronics(electronics: ElectronicsItem): void {
    console.log(
      `[PriceCalculatorVisitor] Eletronico ${electronics.getName()} = R$ ${electronics.getPrice().toFixed(2)}`,
    );
    this.total += electronics.getPrice();
  }

  getTotal(): number {
    return this.total;
  }
}
