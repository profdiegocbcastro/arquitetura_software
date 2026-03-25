import { AuthResult } from "../types/auth-result";
import { RequestContext } from "../types/request-context";
import { AuthMiddleware } from "./auth-middleware";

export abstract class BaseAuthMiddleware implements AuthMiddleware {
  private nextMiddleware?: AuthMiddleware;

  setNext(handler: AuthMiddleware): AuthMiddleware {
    this.nextMiddleware = handler;
    return handler;
  }

  handle(context: RequestContext): AuthResult {
    if (!this.nextMiddleware) {
      return {
        success: true,
        statusCode: 200,
        message: "Acesso liberado.",
        user: context.authenticatedUser,
      };
    }

    return this.nextMiddleware.handle(context);
  }

  protected fail(statusCode: number, message: string): AuthResult {
    return {
      success: false,
      statusCode,
      message,
    };
  }
}
