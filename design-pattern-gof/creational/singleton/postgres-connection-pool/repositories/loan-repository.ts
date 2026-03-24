import { PostgresPool } from "../db/postgres-pool";

export class LoanRepository {
  findOpenLoans(): void {
    const pool = PostgresPool.getInstance().getPool();
    const connection = pool.acquireConnection();

    connection.query("SELECT * FROM loans WHERE returned_at IS NULL;");
  }
}
