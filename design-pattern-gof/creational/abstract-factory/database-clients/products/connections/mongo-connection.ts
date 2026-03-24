import { DatabaseConfig } from "../../types/database-config";
import { DatabaseConnection } from "./database-connection";

export class MongoConnection implements DatabaseConnection {
  constructor(private readonly config: DatabaseConfig) {}

  connect(): void {
    console.log(
      `[MongoDB] Conectando em ${this.config.host}:${this.config.port}/${this.config.database}.`,
    );
  }

  execute(statement: string): void {
    console.log(`[MongoDB] Executando operação: ${statement}`);
  }
}
