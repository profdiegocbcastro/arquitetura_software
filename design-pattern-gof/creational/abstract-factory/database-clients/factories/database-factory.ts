import { DatabaseConnection } from "../products/connections/database-connection";
import { UserRepository } from "../products/repositories/user-repository";

export interface DatabaseFactory {
  createConnection(): DatabaseConnection;
  createUserRepository(connection: DatabaseConnection): UserRepository;
}
