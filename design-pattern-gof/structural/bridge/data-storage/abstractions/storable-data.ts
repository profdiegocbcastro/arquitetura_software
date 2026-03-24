import { StorageProvider } from "../implementors/storage-provider";

export abstract class StorableData {
  constructor(protected readonly storageProvider: StorageProvider) {}

  abstract store(): void;
}
