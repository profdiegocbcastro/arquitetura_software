import { StorageProvider } from "./storage-provider";

export class MemoryStorageProvider implements StorageProvider {
  save(collection: string, key: string, payload: object): void {
    console.log(`[Memory] Salvando em ${collection}/${key}:`, payload);
  }
}
