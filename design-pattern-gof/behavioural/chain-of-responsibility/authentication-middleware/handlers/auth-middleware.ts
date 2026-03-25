import { AuthResult } from "../types/auth-result";
import { RequestContext } from "../types/request-context";

export interface AuthMiddleware {
  setNext(handler: AuthMiddleware): AuthMiddleware;
  handle(context: RequestContext): AuthResult;
}
