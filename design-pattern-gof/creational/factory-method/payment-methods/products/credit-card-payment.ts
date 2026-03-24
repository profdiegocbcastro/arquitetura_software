import { PaymentMethod } from "./payment-method";
import { PaymentRequest } from "../types/payment-request";

export class CreditCardPayment implements PaymentMethod {
  pay(request: PaymentRequest): void {
    console.log(
      `[Cartão de crédito] Pedido ${request.orderId} aprovado para ${request.customerName}. Valor: R$ ${request.amount.toFixed(2)} em 3x sem juros.`,
    );
  }
}
