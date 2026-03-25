import { CompressionStrategy } from "./compression-strategy";

export class ZipCompressionStrategy implements CompressionStrategy {
  compress(fileName: string): string {
    return `${fileName}.zip`;
  }
}
