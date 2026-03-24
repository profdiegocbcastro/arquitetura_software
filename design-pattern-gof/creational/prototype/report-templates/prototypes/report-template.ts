import { Prototype } from "./prototype";
import { ReportSection } from "../types/report-section";

export class ReportTemplate implements Prototype<ReportTemplate> {
  constructor(
    public title: string,
    public period: string,
    public readonly sections: ReportSection[],
    public footerNote: string,
  ) {}

  clone(): ReportTemplate {
    return new ReportTemplate(
      this.title,
      this.period,
      this.sections.map((section) => ({ ...section })),
      this.footerNote,
    );
  }
}
