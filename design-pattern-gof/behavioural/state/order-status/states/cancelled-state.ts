import { Order } from "../contexts/order";
import { OrderState } from "./order-state";

export class CancelledState implements OrderState {
  pay(_: Order): void {
    console.log("[CancelledState] Nao e possivel pagar um pedido cancelado.");
  }

  ship(_: Order): void {
    console.log("[CancelledState] Nao e possivel enviar um pedido cancelado.");
  }

  cancel(_: Order): void {
    console.log("[CancelledState] O pedido ja esta cancelado.");
  }
}
