import { CompressionStrategy } from "../strategies/compression-strategy";

export class BackupService {
  constructor(private strategy: CompressionStrategy) {}

  setStrategy(strategy: CompressionStrategy): void {
    this.strategy = strategy;
  }

  backup(fileName: string): void {
    const output = this.strategy.compress(fileName);
    console.log(`[BackupService] Backup gerado em ${output}.`);
  }
}
