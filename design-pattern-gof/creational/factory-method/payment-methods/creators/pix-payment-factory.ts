import { PaymentFactory } from "./payment-factory";
import { PaymentMethod } from "../products/payment-method";
import { PixPayment } from "../products/pix-payment";

export class PixPaymentFactory extends PaymentFactory {
  protected createPaymentMethod(): PaymentMethod {
    return new PixPayment();
  }
}
