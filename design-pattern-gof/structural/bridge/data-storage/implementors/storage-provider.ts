export interface StorageProvider {
  save(collection: string, key: string, payload: object): void;
}
