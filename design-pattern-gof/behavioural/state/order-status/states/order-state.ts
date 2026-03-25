import { Order } from "../contexts/order";

export interface OrderState {
  pay(order: Order): void;
  ship(order: Order): void;
  cancel(order: Order): void;
}
