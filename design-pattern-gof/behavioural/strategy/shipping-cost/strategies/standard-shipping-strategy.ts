import { ShippingStrategy } from "./shipping-strategy";

export class StandardShippingStrategy implements ShippingStrategy {
  calculate(orderTotal: number): number {
    return orderTotal >= 250 ? 0 : 20;
  }
}
