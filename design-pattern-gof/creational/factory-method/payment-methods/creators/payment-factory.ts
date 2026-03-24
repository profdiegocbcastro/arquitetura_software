import { PaymentMethod } from "../products/payment-method";
import { PaymentRequest } from "../types/payment-request";

export abstract class PaymentFactory {
  protected abstract createPaymentMethod(): PaymentMethod;

  processPayment(request: PaymentRequest): void {
    const paymentMethod = this.createPaymentMethod();
    paymentMethod.pay(request);
  }
}
