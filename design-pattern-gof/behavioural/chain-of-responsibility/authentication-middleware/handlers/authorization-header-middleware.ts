import { AuthResult } from "../types/auth-result";
import { RequestContext } from "../types/request-context";
import { BaseAuthMiddleware } from "./base-auth-middleware";

export class AuthorizationHeaderMiddleware extends BaseAuthMiddleware {
  override handle(context: RequestContext): AuthResult {
    const authorizationHeader = context.headers.authorization;

    if (!authorizationHeader) {
      return this.fail(401, "Header Authorization nao informado.");
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      return this.fail(401, "O header Authorization deve usar Bearer token.");
    }

    return super.handle(context);
  }
}
