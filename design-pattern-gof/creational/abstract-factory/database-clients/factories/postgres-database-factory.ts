import { DatabaseFactory } from "./database-factory";
import { DatabaseConnection } from "../products/connections/database-connection";
import { PostgresConnection } from "../products/connections/postgres-connection";
import { UserRepository } from "../products/repositories/user-repository";
import { PostgresUserRepository } from "../products/repositories/postgres-user-repository";
import { DatabaseConfig } from "../types/database-config";

export class PostgresDatabaseFactory implements DatabaseFactory {
  createConnection(): DatabaseConnection {
    return new PostgresConnection({
      host: "localhost",
      port: 5432,
      database: "analytics",
    });
  }

  createUserRepository(connection: DatabaseConnection): UserRepository {
    return new PostgresUserRepository(connection);
  }
}
