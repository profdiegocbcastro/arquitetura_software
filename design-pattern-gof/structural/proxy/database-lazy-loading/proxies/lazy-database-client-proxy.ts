import { DatabaseClient } from "../targets/database-client";
import { PostgresDatabaseClient } from "../subjects/postgres-database-client";
import { QueryResult } from "../types/query-result";

export class LazyDatabaseClientProxy implements DatabaseClient {
  private realClient: PostgresDatabaseClient | null = null;

  query(statement: string): QueryResult {
    if (!this.realClient) {
      console.log("[Proxy] Inicializando conexão sob demanda.");
      this.realClient = new PostgresDatabaseClient();
    }

    return this.realClient.query(statement);
  }
}
