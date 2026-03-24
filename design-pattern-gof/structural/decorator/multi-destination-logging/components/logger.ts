import { LogEntry } from "../types/log-entry";

export interface Logger {
  log(entry: LogEntry): void;
}
