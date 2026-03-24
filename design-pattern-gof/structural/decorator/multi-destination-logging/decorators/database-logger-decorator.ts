import { LoggerDecorator } from "./logger-decorator";
import { LogEntry } from "../types/log-entry";

export class DatabaseLoggerDecorator extends LoggerDecorator {
  override log(entry: LogEntry): void {
    super.log(entry);
    console.log(
      `[Banco de dados] Inserindo registro de log: ${entry.level} - ${entry.message}`,
    );
  }
}
