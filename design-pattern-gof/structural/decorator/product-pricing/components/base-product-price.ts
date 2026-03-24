import { PriceCalculator } from "./price-calculator";
import { Product } from "../types/product";

export class BaseProductPrice implements PriceCalculator {
  constructor(private readonly product: Product) {}

  calculate(): number {
    return this.product.basePrice;
  }
}
