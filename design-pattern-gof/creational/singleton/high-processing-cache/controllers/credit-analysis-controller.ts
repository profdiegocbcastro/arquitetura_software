import { FraudAnalyticsService } from "../services/fraud-analytics-service";

export class CreditAnalysisController {
  constructor(private readonly analyticsService: FraudAnalyticsService) {}

  generateReport(customerId: string, transactions: number[]): void {
    const result = this.analyticsService.analyze(customerId, transactions);

    console.log(`Relatório de risco para ${customerId}:`, result);
  }
}
