import { FakePostgresPool } from "./fake-postgres-pool";

export class PostgresPool {
  private static instance: PostgresPool | null = null;
  private readonly pool: FakePostgresPool;

  private constructor() {
    // O singleton centraliza um único pool reutilizado por toda a aplicação.
    this.pool = new FakePostgresPool({
      host: "localhost",
      port: 5432,
      database: "biblioteca",
      user: "postgres",
      maxConnections: 20,
    });
  }

  static getInstance(): PostgresPool {
    if (!PostgresPool.instance) {
      PostgresPool.instance = new PostgresPool();
    }

    return PostgresPool.instance;
  }

  getPool(): FakePostgresPool {
    return this.pool;
  }
}
