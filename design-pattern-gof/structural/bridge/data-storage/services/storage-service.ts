import { StorableData } from "../abstractions/storable-data";

export class StorageService {
  persist(data: StorableData): void {
    data.store();
  }
}
