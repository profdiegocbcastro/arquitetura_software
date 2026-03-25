export interface CompressionStrategy {
  compress(fileName: string): string;
}
