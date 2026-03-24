import { PaymentMethod } from "./payment-method";
import { PaymentRequest } from "../types/payment-request";

export class PixPayment implements PaymentMethod {
  pay(request: PaymentRequest): void {
    console.log(
      `[Pix] Pedido ${request.orderId} pago por ${request.customerName}. Valor: R$ ${request.amount.toFixed(2)}.`,
    );
  }
}
