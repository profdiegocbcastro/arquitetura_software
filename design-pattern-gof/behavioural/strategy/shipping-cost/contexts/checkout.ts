import { ShippingStrategy } from "../strategies/shipping-strategy";

export class Checkout {
  constructor(private strategy: ShippingStrategy) {}

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }

  printShippingCost(orderTotal: number): void {
    const cost = this.strategy.calculate(orderTotal);
    console.log(`[Checkout] Frete calculado: R$ ${cost.toFixed(2)}`);
  }
}
