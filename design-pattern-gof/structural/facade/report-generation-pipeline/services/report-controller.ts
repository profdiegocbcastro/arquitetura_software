import { ReportGenerationFacade } from "../facades/report-generation-facade";
import { ReportRequest } from "../types/report-request";

export class ReportController {
  constructor(private readonly reportGenerationFacade: ReportGenerationFacade) {}

  create(request: ReportRequest): void {
    const fileName = this.reportGenerationFacade.generate(request);
    console.log("Relatório gerado com sucesso:", fileName);
  }
}
