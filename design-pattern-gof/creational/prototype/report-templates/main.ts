import { ReportTemplate } from "./prototypes/report-template";
import { ReportGenerationService } from "./services/report-generation-service";

const baseTemplate = new ReportTemplate(
  "Relatório Base",
  "Período padrão",
  [
    {
      title: "Resumo Executivo",
      content: "Estrutura base do relatório corporativo.",
    },
    {
      title: "Indicadores Principais",
      content: "KPIs serão preenchidos conforme o período analisado.",
    },
  ],
  "Documento interno. Uso restrito.",
);

const reportService = new ReportGenerationService();

const monthlySalesReport = reportService.generateFromTemplate(
  baseTemplate,
  "Relatório de Vendas Mensais",
  "Janeiro de 2026",
  "Distribuição restrita à diretoria comercial.",
);
monthlySalesReport.sections[1].content =
  "Receita total: R$ 890.000,00. Ticket médio: R$ 320,00.";

const quarterlyFinanceReport = reportService.generateFromTemplate(
  baseTemplate,
  "Relatório Financeiro Trimestral",
  "1º trimestre de 2026",
  "Distribuição restrita à diretoria financeira.",
);
quarterlyFinanceReport.sections[1].content =
  "Margem operacional: 18%. Crescimento trimestral: 7,4%.";

reportService.print(monthlySalesReport);
reportService.print(quarterlyFinanceReport);
reportService.print(baseTemplate);
