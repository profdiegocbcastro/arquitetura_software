import { PermissionNode } from "../components/permission-node";

export class AuthorizationService {
  check(rootRole: PermissionNode, permission: string): void {
    const result = rootRole.has(permission);
    console.log(result.lines.join("\n"));
    console.log(
      `Resultado final para ${permission}: ${result.granted ? "permitido" : "negado"}`,
    );
  }
}
