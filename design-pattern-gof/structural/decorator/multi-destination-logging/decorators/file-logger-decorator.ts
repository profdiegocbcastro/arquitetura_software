import { LoggerDecorator } from "./logger-decorator";
import { LogEntry } from "../types/log-entry";

export class FileLoggerDecorator extends LoggerDecorator {
  override log(entry: LogEntry): void {
    super.log(entry);
    console.log(
      `[Arquivo] Gravando linha no arquivo de log: ${entry.timestamp};${entry.level};${entry.message}`,
    );
  }
}
