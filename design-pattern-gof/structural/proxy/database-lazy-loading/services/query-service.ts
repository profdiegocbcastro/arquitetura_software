import { DatabaseClient } from "../targets/database-client";

export class QueryService {
  constructor(private readonly databaseClient: DatabaseClient) {}

  listUsers(): void {
    const result = this.databaseClient.query("SELECT * FROM users;");
    console.log("Resultado da consulta de usuários:", result.rows);
  }

  listOrders(): void {
    const result = this.databaseClient.query("SELECT * FROM orders;");
    console.log("Resultado da consulta de pedidos:", result.rows);
  }
}
