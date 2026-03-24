import { Report } from "../abstractions/report";

export class ReportService {
  publish(report: Report): void {
    report.generate();
  }
}
