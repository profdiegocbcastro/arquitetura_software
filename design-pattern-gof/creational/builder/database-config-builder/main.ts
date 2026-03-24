import { ConnectionPoolConfigBuilder } from "./builders/connection-pool-config-builder";
import { DatabaseConfigDirector } from "./directors/database-config-director";
import { ConfigPreviewService } from "./services/config-preview-service";

const builder = new ConnectionPoolConfigBuilder();
const director = new DatabaseConfigDirector(builder);
const previewService = new ConfigPreviewService();

const productionConfig = director.buildProductionProfile();

const localDevelopmentConfig = builder
  .reset()
  .setHost("localhost")
  .setPort(5432)
  .setDatabase("billing_dev")
  .setUser("postgres")
  .setPassword("postgres")
  .setSslMode("disable")
  .setConnectionTimeoutInMs(1500)
  .setPoolSize(10)
  .build();

previewService.print(productionConfig);
previewService.print(localDevelopmentConfig);
