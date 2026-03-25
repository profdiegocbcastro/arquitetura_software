import { BookItem } from "../elements/book-item";
import { ElectronicsItem } from "../elements/electronics-item";

export interface CartVisitor {
  visitBook(book: BookItem): void;
  visitElectronics(electronics: ElectronicsItem): void;
}
