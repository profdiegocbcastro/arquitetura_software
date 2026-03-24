import { SensorValueBucketFactory } from "../factories/sensor-value-bucket-factory";
import { SensorSummary } from "../types/sensor-summary";

export class SensorHistogramService {
  private readonly histogram = new Map<string, number>();

  constructor(private readonly bucketFactory: SensorValueBucketFactory) {}

  ingest(value: number): void {
    const bucket = this.bucketFactory.getBucket(value);
    const key = bucket.getKey();
    const currentCount = this.histogram.get(key) ?? 0;

    this.histogram.set(key, currentCount + 1);
  }

  summarize(): SensorSummary {
    let totalReadings = 0;
    let weightedSum = 0;

    for (const [key, count] of this.histogram.entries()) {
      const representativeValue = Number(key);
      totalReadings += count;
      weightedSum += representativeValue * count;
    }

    return {
      totalReadings,
      averageValue: totalReadings === 0 ? 0 : weightedSum / totalReadings,
      bucketCount: this.bucketFactory.count(),
    };
  }

  printHistogram(): void {
    console.log("Histograma agregado:");
    for (const [key, count] of this.histogram.entries()) {
      console.log(`Valor ${key}: ${count} ocorrência(s)`);
    }
  }
}
