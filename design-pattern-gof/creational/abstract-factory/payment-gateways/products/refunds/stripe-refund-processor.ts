import { RefundProcessor } from "./refund-processor";
import { RefundRequest } from "../../types/refund-request";

export class StripeRefundProcessor implements RefundProcessor {
  refund(request: RefundRequest): void {
    console.log(
      `[Stripe] Reembolso ${request.transactionId} iniciado. Motivo: ${request.reason}. Valor: R$ ${request.amount.toFixed(2)}.`,
    );
  }
}
