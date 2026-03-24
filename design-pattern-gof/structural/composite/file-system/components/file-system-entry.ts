import { FileSystemEntryResult } from "../types/file-system-entry-result";

export interface FileSystemEntry {
  show(indentLevel?: number): FileSystemEntryResult;
}
