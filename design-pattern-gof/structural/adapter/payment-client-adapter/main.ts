import { MercadoPagoPaymentGatewayAdapter } from "./adapters/mercado-pago-payment-gateway-adapter";
import { MercadoPagoClient } from "./clients/mercado-pago-client";
import { CheckoutService } from "./services/checkout-service";

const checkoutService = new CheckoutService(
  new MercadoPagoPaymentGatewayAdapter(new MercadoPagoClient()),
);

checkoutService.checkout({
  orderId: "PED-2026-1200",
  customerName: "Renata Lima",
  amount: 489.9,
});
