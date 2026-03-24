import { PaymentProcessor } from "./payment-processor";
import { PaymentRequest } from "../../types/payment-request";

export class MercadoPagoPaymentProcessor implements PaymentProcessor {
  pay(request: PaymentRequest): void {
    console.log(
      `[Mercado Pago] Pagamento ${request.transactionId} autorizado para ${request.customerName}. Valor: R$ ${request.amount.toFixed(2)}.`,
    );
  }
}
