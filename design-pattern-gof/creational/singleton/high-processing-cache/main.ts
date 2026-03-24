import { AnalyticsCache } from "./cache/analytics-cache";
import { CreditAnalysisController } from "./controllers/credit-analysis-controller";
import { FraudAnalyticsService } from "./services/fraud-analytics-service";

const analyticsService = new FraudAnalyticsService();
const creditAnalysisController = new CreditAnalysisController(analyticsService);

creditAnalysisController.generateReport("customer-10", [100, 200, 150, 400]);
creditAnalysisController.generateReport("customer-10", [100, 200, 150, 400]);

console.log(
  "Entradas no cache compartilhado:",
  AnalyticsCache.getInstance().size(),
);
