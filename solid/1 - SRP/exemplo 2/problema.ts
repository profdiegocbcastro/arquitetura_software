class CheckoutService {
  processCheckout(cart: any, userId: string) {
    // Validação de estoque
    for (const item of cart.items) {
      if (item.stock < item.quantity) {
        throw new Error(`Produto ${item.name} sem estoque suficiente.`);
      }
    }

    // Cálculo de impostos e total
    let total = 0;
    for (const item of cart.items) {
      total += item.price * item.quantity;
    }
    const tax = total * 0.1;
    total += tax;

    console.log(`Total com impostos: R$${total}`);

    // Processamento de pagamento
    console.log(`Processando pagamento para o usuário ${userId}`);
  }
}

const checkoutService = new CheckoutService();

const cart = {
  items: [
    { name: "Caneta", price: 2, quantity: 5, stock: 10 },
    { name: "Caderno", price: 10, quantity: 2, stock: 5 }
  ]
};

const userId = "user123";

checkoutService.processCheckout(cart, userId);
