import { PaymentFactory } from "./payment-factory";
import { PaymentMethod } from "../products/payment-method";
import { BoletoPayment } from "../products/boleto-payment";

export class BoletoPaymentFactory extends PaymentFactory {
  protected createPaymentMethod(): PaymentMethod {
    return new BoletoPayment();
  }
}
