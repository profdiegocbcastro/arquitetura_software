import { AuthResult } from "../types/auth-result";
import { RequestContext } from "../types/request-context";
import { BaseAuthMiddleware } from "./base-auth-middleware";

export class ActiveUserMiddleware extends BaseAuthMiddleware {
  override handle(context: RequestContext): AuthResult {
    if (!context.authenticatedUser) {
      return this.fail(500, "Usuario autenticado nao foi carregado no contexto.");
    }

    if (!context.authenticatedUser.active) {
      return this.fail(403, "O usuario autenticado esta inativo.");
    }

    return super.handle(context);
  }
}
