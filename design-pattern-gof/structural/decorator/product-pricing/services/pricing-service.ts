import { PriceCalculator } from "../components/price-calculator";
import { Product } from "../types/product";

export class PricingService {
  constructor(private readonly calculator: PriceCalculator) {}

  printFinalPrice(product: Product): void {
    console.log(
      `Preço final de ${product.name}: R$ ${this.calculator.calculate().toFixed(2)}`,
    );
  }
}
