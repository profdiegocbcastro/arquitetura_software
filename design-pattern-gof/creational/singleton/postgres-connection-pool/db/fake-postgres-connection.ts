export class FakePostgresConnection {
  constructor(private readonly id: number) {}

  query(sql: string): void {
    console.log(`[conn:${this.id}] Executando SQL: ${sql}`);
  }
}
