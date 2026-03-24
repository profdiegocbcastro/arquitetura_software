import { SensorValueBucket } from "../flyweights/sensor-value-bucket";

export class SensorValueBucketFactory {
  private readonly buckets = new Map<string, SensorValueBucket>();

  getBucket(rawValue: number): SensorValueBucket {
    const representativeValue = Number(rawValue.toFixed(1));
    const key = representativeValue.toFixed(1);

    if (!this.buckets.has(key)) {
      console.log(`[Factory] Criando bucket compartilhado para ${key}.`);
      this.buckets.set(key, new SensorValueBucket(representativeValue));
    }

    return this.buckets.get(key)!;
  }

  count(): number {
    return this.buckets.size;
  }
}
