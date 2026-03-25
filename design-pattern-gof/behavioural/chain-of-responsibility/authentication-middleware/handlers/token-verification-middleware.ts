import { AuthenticatedUser } from "../types/authenticated-user";
import { AuthResult } from "../types/auth-result";
import { RequestContext } from "../types/request-context";
import { BaseAuthMiddleware } from "./base-auth-middleware";

export class TokenVerificationMiddleware extends BaseAuthMiddleware {
  private readonly usersByToken = new Map<string, AuthenticatedUser>([
    [
      "admin-token",
      { id: "U-01", name: "Marina", role: "ADMIN", active: true },
    ],
    [
      "support-token",
      { id: "U-02", name: "Rafael", role: "SUPPORT", active: true },
    ],
    [
      "blocked-token",
      { id: "U-03", name: "Lucia", role: "ADMIN", active: false },
    ],
  ]);

  override handle(context: RequestContext): AuthResult {
    const token = context.headers.authorization?.replace("Bearer ", "").trim();

    if (!token) {
      return this.fail(401, "Token de acesso ausente.");
    }

    const authenticatedUser = this.usersByToken.get(token);

    if (!authenticatedUser) {
      return this.fail(401, "Token invalido ou expirado.");
    }

    context.authenticatedUser = authenticatedUser;

    return super.handle(context);
  }
}
