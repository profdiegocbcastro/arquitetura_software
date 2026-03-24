import { PermissionCheckResult } from "../types/permission-check-result";

export interface PermissionNode {
  has(permission: string, indentLevel?: number): PermissionCheckResult;
}
