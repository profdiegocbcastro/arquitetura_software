import { Order } from "../contexts/order";
import { OrderState } from "./order-state";

export class ShippedState implements OrderState {
  pay(_: Order): void {
    console.log("[ShippedState] O pedido ja foi pago e enviado.");
  }

  ship(_: Order): void {
    console.log("[ShippedState] O pedido ja esta em transporte.");
  }

  cancel(_: Order): void {
    console.log("[ShippedState] Nao e possivel cancelar apos o envio.");
  }
}
