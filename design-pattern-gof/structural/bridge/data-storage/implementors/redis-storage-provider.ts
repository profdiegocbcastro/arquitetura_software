import { StorageProvider } from "./storage-provider";

export class RedisStorageProvider implements StorageProvider {
  save(collection: string, key: string, payload: object): void {
    console.log(`[Redis] Salvando em ${collection}:${key}:`, payload);
  }
}
