import { DatabaseFactory } from "../factories/database-factory";

export class ReportingService {
  constructor(private readonly databaseFactory: DatabaseFactory) {}

  generateActiveUsersReport(): void {
    const connection = this.databaseFactory.createConnection();
    const repository = this.databaseFactory.createUserRepository(connection);

    connection.connect();
    const users = repository.findActiveUsers();

    console.log("Usuários ativos encontrados:", users.join(", "));
  }
}
