import { Order } from "../contexts/order";
import { CancelledState } from "./cancelled-state";
import { OrderState } from "./order-state";
import { ShippedState } from "./shipped-state";

export class PaidState implements OrderState {
  pay(_: Order): void {
    console.log("[PaidState] O pedido ja foi pago.");
  }

  ship(order: Order): void {
    console.log("[PaidState] Pedido enviado para a transportadora.");
    order.setState(new ShippedState());
  }

  cancel(order: Order): void {
    console.log("[PaidState] Pedido cancelado com estorno.");
    order.setState(new CancelledState());
  }
}
