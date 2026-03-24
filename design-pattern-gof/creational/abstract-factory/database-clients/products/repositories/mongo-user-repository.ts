import { DatabaseConnection } from "../connections/database-connection";
import { UserRepository } from "./user-repository";

export class MongoUserRepository implements UserRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  findActiveUsers(): string[] {
    this.connection.execute(
      "db.users.find({ active: true }).sort({ createdAt: -1 })",
    );
    return ["Gabriela", "Henrique", "Isabela"];
  }
}
