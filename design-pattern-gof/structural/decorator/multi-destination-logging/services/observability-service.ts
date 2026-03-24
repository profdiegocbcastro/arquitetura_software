import { Logger } from "../components/logger";
import { LogEntry } from "../types/log-entry";

export class ObservabilityService {
  constructor(private readonly logger: Logger) {}

  register(entry: LogEntry): void {
    this.logger.log(entry);
  }
}
