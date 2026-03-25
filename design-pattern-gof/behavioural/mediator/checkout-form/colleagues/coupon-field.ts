import { CheckoutFormMediator } from "./checkout-form-mediator";

export class CouponField {
  private code = "";
  private discountPercentage = 0;

  constructor(private readonly mediator: CheckoutFormMediator) {}

  apply(code: string, discountPercentage: number): void {
    this.code = code;
    this.discountPercentage = discountPercentage;
    console.log(`[CouponField] Cupom ${code} aplicado.`);
    this.mediator.notify("coupon");
  }

  getDiscountPercentage(): number {
    return this.discountPercentage;
  }

  getCode(): string {
    return this.code;
  }
}
