import { PaymentGateway } from "../targets/payment-gateway";
import { PaymentRequest } from "../types/payment-request";

export class CheckoutService {
  constructor(private readonly paymentGateway: PaymentGateway) {}

  checkout(request: PaymentRequest): void {
    const result = this.paymentGateway.pay(request);

    console.log("Pagamento concluído:", result);
  }
}
