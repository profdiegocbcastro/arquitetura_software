import { PaymentProcessor } from "../products/payments/payment-processor";
import { RefundProcessor } from "../products/refunds/refund-processor";

export interface GatewayFactory {
  createPaymentProcessor(): PaymentProcessor;
  createRefundProcessor(): RefundProcessor;
}
