import { AnalyzedReportData } from "../types/analyzed-report-data";
import { ReportRequest } from "../types/report-request";

export class ReportRenderer {
  render(request: ReportRequest, data: AnalyzedReportData): string {
    console.log("[Renderer] Montando o conteúdo do relatório.");

    return [
      `Relatório: ${request.reportName}`,
      `Período: ${request.period}`,
      `Receita: R$ ${data.revenue.toFixed(2)}`,
      `Margem: ${(data.margin * 100).toFixed(2)}%`,
      `Usuários ativos: ${data.activeUsers}`,
    ].join("\n");
  }
}
