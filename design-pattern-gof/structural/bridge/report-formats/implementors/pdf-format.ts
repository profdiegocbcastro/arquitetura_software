import { ReportFormat } from "./report-format";
import { ReportData } from "../types/report-data";

export class PdfFormat implements ReportFormat {
  export(reportType: string, data: ReportData): void {
    console.log(`[PDF] Exportando relatório ${reportType}:`, data);
  }
}
