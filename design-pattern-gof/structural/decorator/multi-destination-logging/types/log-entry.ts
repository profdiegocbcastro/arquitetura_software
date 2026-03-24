export type LogEntry = {
  level: "INFO" | "WARN" | "ERROR";
  message: string;
  timestamp: string;
};
