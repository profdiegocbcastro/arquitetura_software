import { AuthMiddleware } from "../handlers/auth-middleware";
import { RequestContext } from "../types/request-context";

export class ProtectedRouteService {
  constructor(private readonly authMiddleware: AuthMiddleware) {}

  handleRequest(context: RequestContext): void {
    console.log(
      `[ProtectedRouteService] Processando ${context.method} ${context.path}.`,
    );

    const authResult = this.authMiddleware.handle(context);

    if (!authResult.success) {
      console.log(
        `[ProtectedRouteService] Acesso negado (${authResult.statusCode}): ${authResult.message}`,
      );
      return;
    }

    console.log(
      `[ProtectedRouteService] Acesso liberado para ${authResult.user?.name}.`,
    );
  }
}
