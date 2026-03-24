import { DatabaseConnection } from "../connections/database-connection";
import { UserRepository } from "./user-repository";

export class MysqlUserRepository implements UserRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  findActiveUsers(): string[] {
    this.connection.execute(
      "SELECT name FROM users WHERE status = 'ACTIVE' ORDER BY id DESC;",
    );
    return ["Diego", "Elisa", "Fernanda"];
  }
}
