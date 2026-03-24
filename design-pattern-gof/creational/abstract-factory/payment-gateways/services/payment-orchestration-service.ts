import { GatewayFactory } from "../factories/gateway-factory";
import { PaymentRequest } from "../types/payment-request";
import { RefundRequest } from "../types/refund-request";

export class PaymentOrchestrationService {
  constructor(private readonly gatewayFactory: GatewayFactory) {}

  executePaymentAndRefund(
    paymentRequest: PaymentRequest,
    refundRequest: RefundRequest,
  ): void {
    const paymentProcessor = this.gatewayFactory.createPaymentProcessor();
    const refundProcessor = this.gatewayFactory.createRefundProcessor();

    paymentProcessor.pay(paymentRequest);
    refundProcessor.refund(refundRequest);
  }
}
