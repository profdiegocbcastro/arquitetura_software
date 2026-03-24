import { PaymentFactory } from "./payment-factory";
import { PaymentMethod } from "../products/payment-method";
import { CreditCardPayment } from "../products/credit-card-payment";

export class CreditCardPaymentFactory extends PaymentFactory {
  protected createPaymentMethod(): PaymentMethod {
    return new CreditCardPayment();
  }
}
