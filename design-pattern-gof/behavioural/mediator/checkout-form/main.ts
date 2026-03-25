import { CouponField } from "./colleagues/coupon-field";
import { ShippingSelector } from "./colleagues/shipping-selector";
import { SummaryPanel } from "./colleagues/summary-panel";
import { CheckoutFormMediatorImpl } from "./mediators/checkout-form-mediator-impl";

const mediator = new CheckoutFormMediatorImpl(500);
const shippingSelector = new ShippingSelector(mediator);
const couponField = new CouponField(mediator);
const summaryPanel = new SummaryPanel();

mediator.setShippingSelector(shippingSelector);
mediator.setCouponField(couponField);
mediator.setSummaryPanel(summaryPanel);

shippingSelector.select("EXPRESSO", 40);
couponField.apply("PROMO10", 0.1);
