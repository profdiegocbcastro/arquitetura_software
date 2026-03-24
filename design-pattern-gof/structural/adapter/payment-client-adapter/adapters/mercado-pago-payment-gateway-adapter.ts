import { MercadoPagoClient } from "../clients/mercado-pago-client";
import { PaymentGateway } from "../targets/payment-gateway";
import { PaymentRequest } from "../types/payment-request";
import { PaymentResult } from "../types/payment-result";

export class MercadoPagoPaymentGatewayAdapter implements PaymentGateway {
  constructor(private readonly mercadoPagoClient: MercadoPagoClient) {}

  pay(request: PaymentRequest): PaymentResult {
    const response = this.mercadoPagoClient.createPreference({
      external_reference: request.orderId,
      payer_name: request.customerName,
      total_amount: request.amount,
    });

    return {
      transactionId: response.id,
      status: response.payment_status,
    };
  }
}
