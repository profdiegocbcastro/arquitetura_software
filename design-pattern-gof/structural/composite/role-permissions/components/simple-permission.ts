import { PermissionNode } from "./permission-node";
import { PermissionCheckResult } from "../types/permission-check-result";

export class SimplePermission implements PermissionNode {
  constructor(private readonly permission: string) {}

  has(permission: string, indentLevel = 0): PermissionCheckResult {
    const indent = "  ".repeat(indentLevel);
    const granted = this.permission === permission;

    return {
      granted,
      lines: [
        `${indent}- Permissão ${this.permission}: ${granted ? "concede" : "não concede"} ${permission}`,
      ],
    };
  }
}
