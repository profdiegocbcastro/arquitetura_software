import { PaymentRequest } from "../types/payment-request";
import { PaymentResult } from "../types/payment-result";

export interface PaymentGateway {
  pay(request: PaymentRequest): PaymentResult;
}
