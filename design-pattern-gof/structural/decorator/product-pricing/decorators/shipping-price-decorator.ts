import { PriceDecorator } from "./price-decorator";

export class ShippingPriceDecorator extends PriceDecorator {
  constructor(
    wrappee: PriceDecorator | { calculate(): number },
    private readonly shippingValue: number,
  ) {
    super(wrappee);
  }

  override calculate(): number {
    return super.calculate() + this.shippingValue;
  }
}
