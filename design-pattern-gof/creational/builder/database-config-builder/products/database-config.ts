import { SslMode } from "../types/ssl-mode";

export type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  sslMode: SslMode;
  connectionTimeoutInMs: number;
  poolSize: number;
};
