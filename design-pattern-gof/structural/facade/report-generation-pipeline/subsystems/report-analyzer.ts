import { AnalyzedReportData } from "../types/analyzed-report-data";
import { RawReportData } from "../types/raw-report-data";

export class ReportAnalyzer {
  analyze(rawData: RawReportData): AnalyzedReportData {
    console.log("[Analyzer] Calculando indicadores do relatório.");

    return {
      revenue: rawData.sales,
      margin: (rawData.sales - rawData.costs) / rawData.sales,
      activeUsers: rawData.activeUsers,
    };
  }
}
