import { Report } from "./report";

export class UserReport extends Report {
  generate(): void {
    this.export("User", {
      title: "Relatório de Usuários",
      body: "Total de usuários ativos: 18.450. Novos cadastros no mês: 1.120.",
    });
  }
}
