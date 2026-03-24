import { FakePostgresConnection } from "./fake-postgres-connection";

export type PostgresConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  maxConnections: number;
};

export class FakePostgresPool {
  private nextConnectionId = 1;

  constructor(private readonly config: PostgresConfig) {
    console.log(
      `Pool criado para ${config.database} em ${config.host}:${config.port} com limite de ${config.maxConnections} conexões.`,
    );
  }

  acquireConnection(): FakePostgresConnection {
    const connection = new FakePostgresConnection(this.nextConnectionId++);
    console.log("Conexão entregue pelo pool compartilhado.");
    return connection;
  }
}
