import { DatabaseConfigBuilder } from "./database-config-builder";
import { DatabaseConfig } from "../products/database-config";
import { SslMode } from "../types/ssl-mode";

export class ConnectionPoolConfigBuilder implements DatabaseConfigBuilder {
  private config: DatabaseConfig;

  constructor() {
    this.config = this.createEmptyConfig();
  }

  reset(): this {
    this.config = this.createEmptyConfig();
    return this;
  }

  setHost(host: string): this {
    this.config.host = host;
    return this;
  }

  setPort(port: number): this {
    this.config.port = port;
    return this;
  }

  setDatabase(database: string): this {
    this.config.database = database;
    return this;
  }

  setUser(user: string): this {
    this.config.user = user;
    return this;
  }

  setPassword(password: string): this {
    this.config.password = password;
    return this;
  }

  setSslMode(sslMode: SslMode): this {
    this.config.sslMode = sslMode;
    return this;
  }

  setConnectionTimeoutInMs(connectionTimeoutInMs: number): this {
    this.config.connectionTimeoutInMs = connectionTimeoutInMs;
    return this;
  }

  setPoolSize(poolSize: number): this {
    this.config.poolSize = poolSize;
    return this;
  }

  build(): DatabaseConfig {
    return { ...this.config };
  }

  private createEmptyConfig(): DatabaseConfig {
    return {
      host: "",
      port: 5432,
      database: "",
      user: "",
      password: "",
      sslMode: "disable",
      connectionTimeoutInMs: 1000,
      poolSize: 5,
    };
  }
}
