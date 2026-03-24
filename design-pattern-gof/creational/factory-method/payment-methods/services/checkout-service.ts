import { PaymentFactory } from "../creators/payment-factory";
import { PaymentRequest } from "../types/payment-request";

export class CheckoutService {
  constructor(private readonly paymentFactory: PaymentFactory) {}

  checkout(request: PaymentRequest): void {
    // O checkout executa o fluxo sem conhecer o meio de pagamento concreto.
    this.paymentFactory.processPayment(request);
  }
}
