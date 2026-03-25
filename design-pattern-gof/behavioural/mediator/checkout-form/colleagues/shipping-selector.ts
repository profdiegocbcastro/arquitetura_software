import { CheckoutFormMediator } from "./checkout-form-mediator";

export class ShippingSelector {
  private method = "PADRAO";
  private cost = 0;

  constructor(private readonly mediator: CheckoutFormMediator) {}

  select(method: string, cost: number): void {
    this.method = method;
    this.cost = cost;
    console.log(`[ShippingSelector] Frete ${method} selecionado.`);
    this.mediator.notify("shipping");
  }

  getMethod(): string {
    return this.method;
  }

  getCost(): number {
    return this.cost;
  }
}
