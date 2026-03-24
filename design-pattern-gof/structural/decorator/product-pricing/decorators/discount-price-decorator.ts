import { PriceDecorator } from "./price-decorator";

export class DiscountPriceDecorator extends PriceDecorator {
  constructor(
    wrappee: PriceDecorator | { calculate(): number },
    private readonly percentage: number,
  ) {
    super(wrappee);
  }

  override calculate(): number {
    const currentPrice = super.calculate();
    return currentPrice - currentPrice * this.percentage;
  }
}
