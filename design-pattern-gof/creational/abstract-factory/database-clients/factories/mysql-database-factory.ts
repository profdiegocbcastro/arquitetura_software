import { DatabaseFactory } from "./database-factory";
import { DatabaseConnection } from "../products/connections/database-connection";
import { MysqlConnection } from "../products/connections/mysql-connection";
import { UserRepository } from "../products/repositories/user-repository";
import { MysqlUserRepository } from "../products/repositories/mysql-user-repository";

export class MysqlDatabaseFactory implements DatabaseFactory {
  createConnection(): DatabaseConnection {
    return new MysqlConnection({
      host: "localhost",
      port: 3306,
      database: "analytics",
    });
  }

  createUserRepository(connection: DatabaseConnection): UserRepository {
    return new MysqlUserRepository(connection);
  }
}
