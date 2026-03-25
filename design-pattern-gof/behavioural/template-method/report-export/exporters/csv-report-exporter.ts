import { ReportExporter } from "./report-exporter";

export class CsvReportExporter extends ReportExporter {
  protected format(rows: string[]): string {
    return rows.join(";");
  }
}
