export interface DatabaseConnection {
  connect(): void;
  execute(statement: string): void;
}
