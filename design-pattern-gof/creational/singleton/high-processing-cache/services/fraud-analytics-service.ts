import { AnalyticsCache } from "../cache/analytics-cache";
import { AnalyticsResult } from "../types/analytics-result";

export class FraudAnalyticsService {
  private readonly cache = AnalyticsCache.getInstance();

  analyze(customerId: string, monthlyTransactions: number[]): AnalyticsResult {
    const cacheKey = `${customerId}:${monthlyTransactions.join("-")}`;
    const cachedResult = this.cache.get(cacheKey);

    if (cachedResult) {
      console.log(`Cache hit para ${customerId}.`);
      return cachedResult;
    }

    console.log(`Cache miss para ${customerId}. Executando análise pesada...`);

    const score = monthlyTransactions.reduce((acc, value, index) => {
      const weight = index + 1;
      return acc + value * weight;
    }, 0);

    const result = {
      score,
      generatedAt: new Date().toISOString(),
    };

    this.cache.set(cacheKey, result);
    return result;
  }
}
