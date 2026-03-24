import { LoggerDecorator } from "./logger-decorator";
import { LogEntry } from "../types/log-entry";

export class ConsoleLoggerDecorator extends LoggerDecorator {
  override log(entry: LogEntry): void {
    super.log(entry);
    console.log(`[Console] ${entry.level}: ${entry.message}`);
  }
}
