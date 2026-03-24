import { Report } from "./report";

export class SalesReport extends Report {
  generate(): void {
    this.export("Sales", {
      title: "Relatório de Vendas",
      body: "Receita total: R$ 1.240.000,00. Ticket médio: R$ 315,00.",
    });
  }
}
