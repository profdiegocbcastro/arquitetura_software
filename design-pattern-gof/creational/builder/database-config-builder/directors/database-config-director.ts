import { DatabaseConfigBuilder } from "../builders/database-config-builder";
import { DatabaseConfig } from "../products/database-config";

export class DatabaseConfigDirector {
  constructor(private readonly builder: DatabaseConfigBuilder) {}

  buildProductionProfile(): DatabaseConfig {
    return this.builder
      .reset()
      .setHost("prod-db.empresa.internal")
      .setPort(5432)
      .setDatabase("billing")
      .setUser("app_user")
      .setPassword("strong-secret")
      .setSslMode("require")
      .setConnectionTimeoutInMs(5000)
      .setPoolSize(30)
      .build();
  }
}
