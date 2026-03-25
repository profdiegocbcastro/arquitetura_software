import { AuthResult } from "../types/auth-result";
import { RequestContext } from "../types/request-context";
import { UserRole } from "../types/authenticated-user";
import { BaseAuthMiddleware } from "./base-auth-middleware";

export class RolePermissionMiddleware extends BaseAuthMiddleware {
  private readonly allowedRolesByRequirement: Record<UserRole, UserRole[]> = {
    USER: ["USER", "SUPPORT", "ADMIN"],
    SUPPORT: ["SUPPORT", "ADMIN"],
    ADMIN: ["ADMIN"],
  };

  override handle(context: RequestContext): AuthResult {
    if (!context.requiredRole) {
      return super.handle(context);
    }

    if (!context.authenticatedUser) {
      return this.fail(500, "Usuario autenticado nao foi carregado no contexto.");
    }

    const allowedRoles =
      this.allowedRolesByRequirement[context.requiredRole] ?? [];

    if (!allowedRoles.includes(context.authenticatedUser.role)) {
      return this.fail(
        403,
        `A rota exige perfil ${context.requiredRole}, mas o usuario possui perfil ${context.authenticatedUser.role}.`,
      );
    }

    return super.handle(context);
  }
}
