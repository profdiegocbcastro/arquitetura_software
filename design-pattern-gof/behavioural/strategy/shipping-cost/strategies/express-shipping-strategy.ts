import { ShippingStrategy } from "./shipping-strategy";

export class ExpressShippingStrategy implements ShippingStrategy {
  calculate(_: number): number {
    return 45;
  }
}
