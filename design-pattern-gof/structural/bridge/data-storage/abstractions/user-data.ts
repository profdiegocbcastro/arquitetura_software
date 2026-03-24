import { StorableData } from "./storable-data";
import { UserRecord } from "../types/user-record";

export class UserData extends StorableData {
  constructor(
    storageProvider: StorableData["storageProvider"],
    private readonly user: UserRecord,
  ) {
    super(storageProvider);
  }

  store(): void {
    this.storageProvider.save("users", this.user.id, this.user);
  }
}
