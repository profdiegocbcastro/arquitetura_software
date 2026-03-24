import { StorageProvider } from "./storage-provider";

export class PostgresStorageProvider implements StorageProvider {
  save(collection: string, key: string, payload: object): void {
    console.log(
      `[Postgres] Inserindo registro em ${collection} com chave ${key}:`,
      payload,
    );
  }
}
