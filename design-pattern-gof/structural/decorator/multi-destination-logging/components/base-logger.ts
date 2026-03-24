import { Logger } from "./logger";
import { LogEntry } from "../types/log-entry";

export class BaseLogger implements Logger {
  log(entry: LogEntry): void {
    console.log(
      `[Base] Pipeline de logging iniciado para ${entry.level} em ${entry.timestamp}.`,
    );
  }
}
