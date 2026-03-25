import { AuthenticatedUser, UserRole } from "./authenticated-user";

export type RequestContext = {
  method: string;
  path: string;
  headers: Record<string, string | undefined>;
  requiredRole?: UserRole;
  authenticatedUser?: AuthenticatedUser;
};
