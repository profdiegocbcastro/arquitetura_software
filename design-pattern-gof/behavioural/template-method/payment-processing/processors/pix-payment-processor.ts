import { PaymentProcessor } from "./payment-processor";

export class PixPaymentProcessor extends PaymentProcessor {
  protected authorize(amount: number): void {
    console.log(
      `[PixPaymentProcessor] Gerando chave e autorizacao Pix para R$ ${amount.toFixed(2)}.`,
    );
  }

  protected capture(amount: number): void {
    console.log(
      `[PixPaymentProcessor] Confirmando liquidacao Pix de R$ ${amount.toFixed(2)}.`,
    );
  }
}
