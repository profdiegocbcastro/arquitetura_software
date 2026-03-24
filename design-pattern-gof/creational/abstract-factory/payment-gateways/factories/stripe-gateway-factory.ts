import { GatewayFactory } from "./gateway-factory";
import { PaymentProcessor } from "../products/payments/payment-processor";
import { StripePaymentProcessor } from "../products/payments/stripe-payment-processor";
import { RefundProcessor } from "../products/refunds/refund-processor";
import { StripeRefundProcessor } from "../products/refunds/stripe-refund-processor";

export class StripeGatewayFactory implements GatewayFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new StripePaymentProcessor();
  }

  createRefundProcessor(): RefundProcessor {
    return new StripeRefundProcessor();
  }
}
