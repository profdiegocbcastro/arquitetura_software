import { FileSystemEntry } from "../components/file-system-entry";

export class FileSystemService {
  print(entry: FileSystemEntry): void {
    const result = entry.show();
    console.log(result.lines.join("\n"));
    console.log(`Tamanho total: ${result.sizeInKb} KB`);
  }
}
