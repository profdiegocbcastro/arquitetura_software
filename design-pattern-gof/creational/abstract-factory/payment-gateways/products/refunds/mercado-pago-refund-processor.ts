import { RefundProcessor } from "./refund-processor";
import { RefundRequest } from "../../types/refund-request";

export class MercadoPagoRefundProcessor implements RefundProcessor {
  refund(request: RefundRequest): void {
    console.log(
      `[Mercado Pago] Reembolso ${request.transactionId} aberto. Motivo: ${request.reason}. Valor: R$ ${request.amount.toFixed(2)}.`,
    );
  }
}
