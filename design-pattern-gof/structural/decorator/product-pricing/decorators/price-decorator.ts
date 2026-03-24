import { PriceCalculator } from "../components/price-calculator";

export abstract class PriceDecorator implements PriceCalculator {
  constructor(protected readonly wrappee: PriceCalculator) {}

  calculate(): number {
    return this.wrappee.calculate();
  }
}
