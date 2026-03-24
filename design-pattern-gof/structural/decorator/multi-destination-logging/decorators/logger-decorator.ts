import { Logger } from "../components/logger";
import { LogEntry } from "../types/log-entry";

export abstract class LoggerDecorator implements Logger {
  constructor(protected readonly wrappee: Logger) {}

  log(entry: LogEntry): void {
    this.wrappee.log(entry);
  }
}
