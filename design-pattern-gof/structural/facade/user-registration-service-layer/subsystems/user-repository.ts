import { RegisteredUser } from "../types/registered-user";

export class UserRepository {
  save(user: RegisteredUser): RegisteredUser {
    console.log("[UserRepository] Usuário persistido:", user);
    return user;
  }
}
