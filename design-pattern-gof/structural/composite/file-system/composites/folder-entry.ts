import { FileSystemEntry } from "../components/file-system-entry";
import { FileSystemEntryResult } from "../types/file-system-entry-result";

export class FolderEntry implements FileSystemEntry {
  private readonly children: FileSystemEntry[] = [];

  constructor(private readonly name: string) {}

  add(entry: FileSystemEntry): void {
    this.children.push(entry);
  }

  show(indentLevel = 0): FileSystemEntryResult {
    const indent = "  ".repeat(indentLevel);
    const childResults = this.children.map((child) => child.show(indentLevel + 1));
    const totalSize = childResults.reduce(
      (accumulator, childResult) => accumulator + childResult.sizeInKb,
      0,
    );

    return {
      sizeInKb: totalSize,
      lines: [
        `${indent}+ Pasta: ${this.name} (${totalSize} KB)`,
        ...childResults.flatMap((childResult) => childResult.lines),
      ],
    };
  }
}
