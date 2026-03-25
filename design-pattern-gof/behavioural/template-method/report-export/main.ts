import { CsvReportExporter } from "./exporters/csv-report-exporter";
import { PdfReportExporter } from "./exporters/pdf-report-exporter";

const rows = ["Vendas: 120", "Cancelamentos: 4", "Receita: 9800"];

new CsvReportExporter().export("relatorio-comercial", rows);
console.log("");
new PdfReportExporter().export("relatorio-comercial", rows);
