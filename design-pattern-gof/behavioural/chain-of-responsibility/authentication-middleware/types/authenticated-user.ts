export type UserRole = "USER" | "SUPPORT" | "ADMIN";

export type AuthenticatedUser = {
  id: string;
  name: string;
  role: UserRole;
  active: boolean;
};
