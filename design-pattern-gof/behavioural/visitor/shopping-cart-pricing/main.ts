import { BookItem } from "./elements/book-item";
import { ElectronicsItem } from "./elements/electronics-item";
import { CartItem } from "./elements/cart-item";
import { PriceCalculatorVisitor } from "./visitors/price-calculator-visitor";

const items: CartItem[] = [
  new BookItem("Clean Code", 120),
  new ElectronicsItem("Monitor 27", 1600),
];

const calculator = new PriceCalculatorVisitor();

items.forEach((item) => item.accept(calculator));

console.log(`[Main] Total do carrinho: R$ ${calculator.getTotal().toFixed(2)}`);
