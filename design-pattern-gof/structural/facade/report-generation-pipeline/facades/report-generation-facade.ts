import { ReportAnalyzer } from "../subsystems/report-analyzer";
import { ReportDataCollector } from "../subsystems/report-data-collector";
import { ReportDeliveryService } from "../subsystems/report-delivery-service";
import { ReportExporter } from "../subsystems/report-exporter";
import { ReportRenderer } from "../subsystems/report-renderer";
import { ReportRequest } from "../types/report-request";

export class ReportGenerationFacade {
  constructor(
    private readonly collector: ReportDataCollector,
    private readonly analyzer: ReportAnalyzer,
    private readonly renderer: ReportRenderer,
    private readonly exporter: ReportExporter,
    private readonly deliveryService: ReportDeliveryService,
  ) {}

  generate(request: ReportRequest): string {
    const rawData = this.collector.collect(request);
    const analyzedData = this.analyzer.analyze(rawData);
    const content = this.renderer.render(request, analyzedData);
    const fileName = this.exporter.export(content);

    this.deliveryService.deliver(fileName, request.recipientEmail);

    return fileName;
  }
}
