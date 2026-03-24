import { AnalyticsResult } from "../types/analytics-result";

export class AnalyticsCache {
  private static instance: AnalyticsCache | null = null;
  private readonly cache = new Map<string, AnalyticsResult>();

  private constructor() {}

  static getInstance(): AnalyticsCache {
    if (!AnalyticsCache.instance) {
      AnalyticsCache.instance = new AnalyticsCache();
    }

    return AnalyticsCache.instance;
  }

  get(key: string): AnalyticsResult | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: AnalyticsResult): void {
    this.cache.set(key, value);
  }

  size(): number {
    return this.cache.size;
  }
}
