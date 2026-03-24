import { ReportFormat } from "./report-format";
import { ReportData } from "../types/report-data";

export class HtmlFormat implements ReportFormat {
  export(reportType: string, data: ReportData): void {
    console.log(`[HTML] Exportando relatório ${reportType}:`, data);
  }
}
