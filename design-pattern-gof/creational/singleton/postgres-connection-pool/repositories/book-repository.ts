import { PostgresPool } from "../db/postgres-pool";

export class BookRepository {
  findAll(): void {
    const pool = PostgresPool.getInstance().getPool();
    const connection = pool.acquireConnection();

    connection.query("SELECT * FROM books;");
  }
}
