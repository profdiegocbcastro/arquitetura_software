export class ReportExporter {
  export(content: string): string {
    console.log("[Exporter] Gerando arquivo final do relatório.");
    console.log(content);
    return "financial-report.pdf";
  }
}
