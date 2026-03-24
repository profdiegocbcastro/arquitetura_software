import { ReportGenerationFacade } from "./facades/report-generation-facade";
import { ReportAnalyzer } from "./subsystems/report-analyzer";
import { ReportDataCollector } from "./subsystems/report-data-collector";
import { ReportDeliveryService } from "./subsystems/report-delivery-service";
import { ReportExporter } from "./subsystems/report-exporter";
import { ReportRenderer } from "./subsystems/report-renderer";
import { ReportController } from "./services/report-controller";

const reportController = new ReportController(
  new ReportGenerationFacade(
    new ReportDataCollector(),
    new ReportAnalyzer(),
    new ReportRenderer(),
    new ReportExporter(),
    new ReportDeliveryService(),
  ),
);

reportController.create({
  reportName: "Relatório Financeiro Executivo",
  period: "Março de 2026",
  recipientEmail: "diretoria.financeira@empresa.com",
});
