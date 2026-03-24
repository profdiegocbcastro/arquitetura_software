import { PriceDecorator } from "./price-decorator";

export class FeePriceDecorator extends PriceDecorator {
  constructor(
    wrappee: PriceDecorator | { calculate(): number },
    private readonly feeValue: number,
  ) {
    super(wrappee);
  }

  override calculate(): number {
    return super.calculate() + this.feeValue;
  }
}
