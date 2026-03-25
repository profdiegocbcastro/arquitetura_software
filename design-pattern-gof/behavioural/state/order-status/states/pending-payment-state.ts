import { Order } from "../contexts/order";
import { CancelledState } from "./cancelled-state";
import { OrderState } from "./order-state";
import { PaidState } from "./paid-state";

export class PendingPaymentState implements OrderState {
  pay(order: Order): void {
    console.log("[PendingPaymentState] Pagamento aprovado.");
    order.setState(new PaidState());
  }

  ship(_: Order): void {
    console.log("[PendingPaymentState] Nao e possivel enviar antes de pagar.");
  }

  cancel(order: Order): void {
    console.log("[PendingPaymentState] Pedido cancelado.");
    order.setState(new CancelledState());
  }
}
