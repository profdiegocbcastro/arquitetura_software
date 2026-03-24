import { RefundProcessor } from "./refund-processor";
import { RefundRequest } from "../../types/refund-request";

export class PaypalRefundProcessor implements RefundProcessor {
  refund(request: RefundRequest): void {
    console.log(
      `[PayPal] Reembolso ${request.transactionId} solicitado. Motivo: ${request.reason}. Valor: R$ ${request.amount.toFixed(2)}.`,
    );
  }
}
