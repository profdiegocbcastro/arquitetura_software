import { CreditCardPaymentProcessor } from "./processors/credit-card-payment-processor";
import { PixPaymentProcessor } from "./processors/pix-payment-processor";

new CreditCardPaymentProcessor().process(250);
console.log("");
new PixPaymentProcessor().process(250);
