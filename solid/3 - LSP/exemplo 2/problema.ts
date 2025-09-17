class PaymentProcessor {
  processPayment(amount: number): string {
    if (amount <= 0) {
      throw new Error("O valor do pagamento deve ser positivo.");
    }
    return `Pagamento de R$${amount.toFixed(2)} processado.`;
  }
}

class CreditCardProcessor extends PaymentProcessor {
  processPayment(amount: number): string {
    if (amount > 10000) {
      throw new Error("Limite de pagamento no cartão excedido."); // Restrição adicional
    }
    return super.processPayment(amount);
  }
}

function handlePayment(processor: PaymentProcessor, amount: number): void {
  console.log(processor.processPayment(amount));
}

const defaultProcessor = new PaymentProcessor();
const creditCardProcessor = new CreditCardProcessor();

handlePayment(defaultProcessor, 20000); // Funciona: "Pagamento de R$20000.00 processado."
handlePayment(creditCardProcessor, 20000); // Erro inesperado: "Limite de pagamento no cartão excedido."
