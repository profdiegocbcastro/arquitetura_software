import { ReportTemplate } from "../prototypes/report-template";

export class ReportGenerationService {
  generateFromTemplate(
    template: ReportTemplate,
    title: string,
    period: string,
    footerNote: string,
  ): ReportTemplate {
    const report = template.clone();

    report.title = title;
    report.period = period;
    report.footerNote = footerNote;

    return report;
  }

  print(report: ReportTemplate): void {
    console.log("Relatório gerado:");
    console.log(JSON.stringify(report, null, 2));
  }
}
