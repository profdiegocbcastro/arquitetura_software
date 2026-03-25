import { ReportExporter } from "./report-exporter";

export class PdfReportExporter extends ReportExporter {
  protected format(rows: string[]): string {
    return `[PDF]\n${rows.join("\n")}`;
  }
}
