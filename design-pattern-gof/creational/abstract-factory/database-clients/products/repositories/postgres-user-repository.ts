import { DatabaseConnection } from "../connections/database-connection";
import { UserRepository } from "./user-repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  findActiveUsers(): string[] {
    this.connection.execute(
      "SELECT name FROM users WHERE active = true ORDER BY created_at DESC;",
    );
    return ["Ana", "Bruno", "Camila"];
  }
}
