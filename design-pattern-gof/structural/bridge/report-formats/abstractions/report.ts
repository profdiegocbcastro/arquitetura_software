import { ReportFormat } from "../implementors/report-format";
import { ReportData } from "../types/report-data";

export abstract class Report {
  constructor(protected readonly format: ReportFormat) {}

  abstract generate(): void;

  protected export(reportType: string, data: ReportData): void {
    this.format.export(reportType, data);
  }
}
