import { BaseLogger } from "./components/base-logger";
import { ConsoleLoggerDecorator } from "./decorators/console-logger-decorator";
import { DatabaseLoggerDecorator } from "./decorators/database-logger-decorator";
import { FileLoggerDecorator } from "./decorators/file-logger-decorator";
import { ObservabilityService } from "./services/observability-service";

const logger = new DatabaseLoggerDecorator(
  new FileLoggerDecorator(new ConsoleLoggerDecorator(new BaseLogger())),
);

const observabilityService = new ObservabilityService(logger);

observabilityService.register({
  level: "INFO",
  message: "Pedido PED-2026-0008 processado com sucesso.",
  timestamp: "2026-03-24T10:15:00Z",
});

observabilityService.register({
  level: "ERROR",
  message: "Falha ao sincronizar estoque com o ERP.",
  timestamp: "2026-03-24T10:16:20Z",
});
