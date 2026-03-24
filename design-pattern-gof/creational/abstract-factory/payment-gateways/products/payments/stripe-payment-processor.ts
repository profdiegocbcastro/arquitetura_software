import { PaymentProcessor } from "./payment-processor";
import { PaymentRequest } from "../../types/payment-request";

export class StripePaymentProcessor implements PaymentProcessor {
  pay(request: PaymentRequest): void {
    console.log(
      `[Stripe] Pagamento ${request.transactionId} confirmado para ${request.customerName}. Valor: R$ ${request.amount.toFixed(2)}.`,
    );
  }
}
