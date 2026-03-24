import { PaymentRequest } from "../types/payment-request";

export interface PaymentMethod {
  pay(request: PaymentRequest): void;
}
