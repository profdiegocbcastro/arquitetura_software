export interface ShippingStrategy {
  calculate(orderTotal: number): number;
}
