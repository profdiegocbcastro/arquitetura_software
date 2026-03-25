import { CheckoutFormMediator } from "../colleagues/checkout-form-mediator";
import { CouponField } from "../colleagues/coupon-field";
import { ShippingSelector } from "../colleagues/shipping-selector";
import { SummaryPanel } from "../colleagues/summary-panel";

export class CheckoutFormMediatorImpl implements CheckoutFormMediator {
  private shippingSelector?: ShippingSelector;
  private couponField?: CouponField;
  private summaryPanel?: SummaryPanel;

  constructor(private readonly subtotal: number) {}

  setShippingSelector(shippingSelector: ShippingSelector): void {
    this.shippingSelector = shippingSelector;
  }

  setCouponField(couponField: CouponField): void {
    this.couponField = couponField;
  }

  setSummaryPanel(summaryPanel: SummaryPanel): void {
    this.summaryPanel = summaryPanel;
  }

  notify(_: string): void {
    if (!this.shippingSelector || !this.couponField || !this.summaryPanel) {
      return;
    }

    const discountValue =
      this.subtotal * this.couponField.getDiscountPercentage();
    const total =
      this.subtotal + this.shippingSelector.getCost() - discountValue;

    this.summaryPanel.render({
      subtotal: this.subtotal,
      shippingMethod: this.shippingSelector.getMethod(),
      shippingCost: this.shippingSelector.getCost(),
      couponCode: this.couponField.getCode(),
      discountValue,
      total,
    });
  }
}
