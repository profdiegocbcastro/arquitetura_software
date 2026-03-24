import { PaymentMethod } from "./payment-method";
import { PaymentRequest } from "../types/payment-request";

export class BoletoPayment implements PaymentMethod {
  pay(request: PaymentRequest): void {
    console.log(
      `[Boleto] Pedido ${request.orderId} gerado para ${request.customerName}. Valor: R$ ${request.amount.toFixed(2)} com vencimento em 3 dias.`,
    );
  }
}
