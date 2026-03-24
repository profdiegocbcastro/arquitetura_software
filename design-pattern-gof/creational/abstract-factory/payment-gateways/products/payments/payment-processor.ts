import { PaymentRequest } from "../../types/payment-request";

export interface PaymentProcessor {
  pay(request: PaymentRequest): void;
}
