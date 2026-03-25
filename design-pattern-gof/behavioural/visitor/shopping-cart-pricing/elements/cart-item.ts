import { CartVisitor } from "../visitors/cart-visitor";

export interface CartItem {
  accept(visitor: CartVisitor): void;
}
