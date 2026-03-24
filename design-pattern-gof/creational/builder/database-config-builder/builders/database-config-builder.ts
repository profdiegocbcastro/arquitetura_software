import { DatabaseConfig } from "../products/database-config";
import { SslMode } from "../types/ssl-mode";

export interface DatabaseConfigBuilder {
  reset(): this;
  setHost(host: string): this;
  setPort(port: number): this;
  setDatabase(database: string): this;
  setUser(user: string): this;
  setPassword(password: string): this;
  setSslMode(sslMode: SslMode): this;
  setConnectionTimeoutInMs(connectionTimeoutInMs: number): this;
  setPoolSize(poolSize: number): this;
  build(): DatabaseConfig;
}
