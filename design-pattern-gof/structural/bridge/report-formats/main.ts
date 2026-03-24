import { FinanceReport } from "./abstractions/finance-report";
import { SalesReport } from "./abstractions/sales-report";
import { UserReport } from "./abstractions/user-report";
import { ExcelFormat } from "./implementors/excel-format";
import { HtmlFormat } from "./implementors/html-format";
import { PdfFormat } from "./implementors/pdf-format";
import { ReportService } from "./services/report-service";

const reportService = new ReportService();

reportService.publish(new SalesReport(new PdfFormat()));
reportService.publish(new UserReport(new ExcelFormat()));
reportService.publish(new FinanceReport(new HtmlFormat()));
