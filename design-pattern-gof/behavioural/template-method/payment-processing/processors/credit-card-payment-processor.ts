import { PaymentProcessor } from "./payment-processor";

export class CreditCardPaymentProcessor extends PaymentProcessor {
  protected authorize(amount: number): void {
    console.log(
      `[CreditCardPaymentProcessor] Autorizando transacao de R$ ${amount.toFixed(2)} no gateway de cartao.`,
    );
  }

  protected capture(amount: number): void {
    console.log(
      `[CreditCardPaymentProcessor] Capturando pagamento de R$ ${amount.toFixed(2)} no cartao.`,
    );
  }
}
