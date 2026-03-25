import { OrderState } from "../states/order-state";
import { PendingPaymentState } from "../states/pending-payment-state";

export class Order {
  private state: OrderState = new PendingPaymentState();

  setState(state: OrderState): void {
    this.state = state;
  }

  pay(): void {
    this.state.pay(this);
  }

  ship(): void {
    this.state.ship(this);
  }

  cancel(): void {
    this.state.cancel(this);
  }
}
