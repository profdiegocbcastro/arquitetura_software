import { GatewayFactory } from "./gateway-factory";
import { PaymentProcessor } from "../products/payments/payment-processor";
import { PaypalPaymentProcessor } from "../products/payments/paypal-payment-processor";
import { RefundProcessor } from "../products/refunds/refund-processor";
import { PaypalRefundProcessor } from "../products/refunds/paypal-refund-processor";

export class PaypalGatewayFactory implements GatewayFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new PaypalPaymentProcessor();
  }

  createRefundProcessor(): RefundProcessor {
    return new PaypalRefundProcessor();
  }
}
