import { GatewayFactory } from "./gateway-factory";
import { PaymentProcessor } from "../products/payments/payment-processor";
import { MercadoPagoPaymentProcessor } from "../products/payments/mercado-pago-payment-processor";
import { RefundProcessor } from "../products/refunds/refund-processor";
import { MercadoPagoRefundProcessor } from "../products/refunds/mercado-pago-refund-processor";

export class MercadoPagoGatewayFactory implements GatewayFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new MercadoPagoPaymentProcessor();
  }

  createRefundProcessor(): RefundProcessor {
    return new MercadoPagoRefundProcessor();
  }
}
