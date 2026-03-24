import { DatabaseClient } from "../targets/database-client";
import { QueryResult } from "../types/query-result";

export class PostgresDatabaseClient implements DatabaseClient {
  constructor() {
    console.log("[RealSubject] Conexão real com PostgreSQL criada.");
  }

  query(statement: string): QueryResult {
    console.log(`[PostgreSQL] Executando consulta: ${statement}`);

    return {
      rows: ["row-1", "row-2", "row-3"],
    };
  }
}
