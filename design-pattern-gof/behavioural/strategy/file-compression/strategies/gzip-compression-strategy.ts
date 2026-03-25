import { CompressionStrategy } from "./compression-strategy";

export class GzipCompressionStrategy implements CompressionStrategy {
  compress(fileName: string): string {
    return `${fileName}.gz`;
  }
}
