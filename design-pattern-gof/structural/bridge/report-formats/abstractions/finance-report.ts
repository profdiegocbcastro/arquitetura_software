import { Report } from "./report";

export class FinanceReport extends Report {
  generate(): void {
    this.export("Finance", {
      title: "Relatório Financeiro",
      body: "Margem operacional: 21%. EBITDA: R$ 430.000,00.",
    });
  }
}
