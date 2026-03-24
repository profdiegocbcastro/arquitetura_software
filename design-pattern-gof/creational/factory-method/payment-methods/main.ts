import { BoletoPaymentFactory } from "./creators/boleto-payment-factory";
import { CreditCardPaymentFactory } from "./creators/credit-card-payment-factory";
import { PixPaymentFactory } from "./creators/pix-payment-factory";
import { CheckoutService } from "./services/checkout-service";
import { PaymentRequest } from "./types/payment-request";

const request: PaymentRequest = {
  orderId: "PED-2026-00045",
  amount: 349.9,
  customerName: "Carlos Eduardo",
};

const pixCheckout = new CheckoutService(new PixPaymentFactory());
const creditCardCheckout = new CheckoutService(
  new CreditCardPaymentFactory(),
);
const boletoCheckout = new CheckoutService(new BoletoPaymentFactory());

pixCheckout.checkout(request);
creditCardCheckout.checkout(request);
boletoCheckout.checkout(request);
