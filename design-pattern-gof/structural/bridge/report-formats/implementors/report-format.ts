import { ReportData } from "../types/report-data";

export interface ReportFormat {
  export(reportType: string, data: ReportData): void;
}
