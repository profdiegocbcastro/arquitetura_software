export abstract class PaymentProcessor {
  process(amount: number): void {
    this.validate(amount);
    this.authorize(amount);
    this.capture(amount);
    this.sendReceipt(amount);
  }

  protected validate(amount: number): void {
    console.log(`[PaymentProcessor] Validando pagamento de R$ ${amount.toFixed(2)}.`);
  }

  protected abstract authorize(amount: number): void;

  protected abstract capture(amount: number): void;

  protected sendReceipt(amount: number): void {
    console.log(
      `[PaymentProcessor] Recibo enviado para pagamento de R$ ${amount.toFixed(2)}.`,
    );
  }
}
