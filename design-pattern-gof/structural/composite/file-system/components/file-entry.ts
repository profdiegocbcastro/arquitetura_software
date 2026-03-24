import { FileSystemEntry } from "./file-system-entry";
import { FileSystemEntryResult } from "../types/file-system-entry-result";

export class FileEntry implements FileSystemEntry {
  constructor(
    private readonly name: string,
    private readonly sizeInKb: number,
  ) {}

  show(indentLevel = 0): FileSystemEntryResult {
    const indent = "  ".repeat(indentLevel);

    return {
      sizeInKb: this.sizeInKb,
      lines: [`${indent}- Arquivo: ${this.name} (${this.sizeInKb} KB)`],
    };
  }
}
