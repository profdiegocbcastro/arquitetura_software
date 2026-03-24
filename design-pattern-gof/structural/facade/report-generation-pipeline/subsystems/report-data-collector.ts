import { RawReportData } from "../types/raw-report-data";
import { ReportRequest } from "../types/report-request";

export class ReportDataCollector {
  collect(request: ReportRequest): RawReportData {
    console.log(`[Collector] Coletando dados para ${request.reportName} em ${request.period}.`);

    return {
      sales: 980000,
      costs: 620000,
      activeUsers: 18450,
    };
  }
}
