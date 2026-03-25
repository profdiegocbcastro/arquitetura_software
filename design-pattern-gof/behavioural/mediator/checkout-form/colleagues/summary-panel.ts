type SummaryView = {
  subtotal: number;
  shippingMethod: string;
  shippingCost: number;
  couponCode: string;
  discountValue: number;
  total: number;
};

export class SummaryPanel {
  render(view: SummaryView): void {
    console.log("[SummaryPanel] Resumo atualizado:");
    console.log(`- Subtotal: R$ ${view.subtotal.toFixed(2)}`);
    console.log(
      `- Frete: ${view.shippingMethod} (R$ ${view.shippingCost.toFixed(2)})`,
    );
    console.log(`- Cupom: ${view.couponCode || "nenhum"}`);
    console.log(`- Desconto: R$ ${view.discountValue.toFixed(2)}`);
    console.log(`- Total: R$ ${view.total.toFixed(2)}`);
  }
}
