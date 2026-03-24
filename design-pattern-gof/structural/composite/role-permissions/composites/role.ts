import { PermissionNode } from "../components/permission-node";
import { PermissionCheckResult } from "../types/permission-check-result";

export class Role implements PermissionNode {
  private readonly children: PermissionNode[] = [];

  constructor(private readonly name: string) {}

  add(node: PermissionNode): void {
    this.children.push(node);
  }

  has(permission: string, indentLevel = 0): PermissionCheckResult {
    const indent = "  ".repeat(indentLevel);
    const childResults = this.children.map((child) =>
      child.has(permission, indentLevel + 1),
    );
    const granted = childResults.some((childResult) => childResult.granted);

    return {
      granted,
      lines: [
        `${indent}+ Role ${this.name}: verificando ${permission}`,
        ...childResults.flatMap((childResult) => childResult.lines),
      ],
    };
  }
}
