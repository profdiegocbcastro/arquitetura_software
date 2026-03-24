export class SensorValueBucket {
  constructor(private readonly representativeValue: number) {}

  getRepresentativeValue(): number {
    return this.representativeValue;
  }

  getKey(): string {
    return this.representativeValue.toFixed(1);
  }
}
