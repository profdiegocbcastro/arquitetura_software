import { ReportFormat } from "./report-format";
import { ReportData } from "../types/report-data";

export class ExcelFormat implements ReportFormat {
  export(reportType: string, data: ReportData): void {
    console.log(`[Excel] Exportando relatório ${reportType}:`, data);
  }
}
