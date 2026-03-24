import { DatabaseFactory } from "./database-factory";
import { DatabaseConnection } from "../products/connections/database-connection";
import { MongoConnection } from "../products/connections/mongo-connection";
import { UserRepository } from "../products/repositories/user-repository";
import { MongoUserRepository } from "../products/repositories/mongo-user-repository";

export class MongoDatabaseFactory implements DatabaseFactory {
  createConnection(): DatabaseConnection {
    return new MongoConnection({
      host: "localhost",
      port: 27017,
      database: "analytics",
    });
  }

  createUserRepository(connection: DatabaseConnection): UserRepository {
    return new MongoUserRepository(connection);
  }
}
