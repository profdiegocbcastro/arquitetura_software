import { MercadoPagoGatewayFactory } from "./factories/mercado-pago-gateway-factory";
import { PaypalGatewayFactory } from "./factories/paypal-gateway-factory";
import { StripeGatewayFactory } from "./factories/stripe-gateway-factory";
import { PaymentOrchestrationService } from "./services/payment-orchestration-service";
import { PaymentRequest } from "./types/payment-request";
import { RefundRequest } from "./types/refund-request";

const paymentRequest: PaymentRequest = {
  transactionId: "TX-2026-9001",
  amount: 589.9,
  customerName: "Larissa Monteiro",
};

const refundRequest: RefundRequest = {
  transactionId: "TX-2026-9001",
  amount: 589.9,
  reason: "Cancelamento da assinatura premium",
};

const paypalService = new PaymentOrchestrationService(
  new PaypalGatewayFactory(),
);
const mercadoPagoService = new PaymentOrchestrationService(
  new MercadoPagoGatewayFactory(),
);
const stripeService = new PaymentOrchestrationService(
  new StripeGatewayFactory(),
);

paypalService.executePaymentAndRefund(paymentRequest, refundRequest);
mercadoPagoService.executePaymentAndRefund(paymentRequest, refundRequest);
stripeService.executePaymentAndRefund(paymentRequest, refundRequest);
