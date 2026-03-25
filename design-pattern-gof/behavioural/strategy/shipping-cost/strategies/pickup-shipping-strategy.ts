import { ShippingStrategy } from "./shipping-strategy";

export class PickupShippingStrategy implements ShippingStrategy {
  calculate(_: number): number {
    return 0;
  }
}
