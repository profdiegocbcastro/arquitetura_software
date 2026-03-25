import { AuthenticatedUser } from "./authenticated-user";

export type AuthResult = {
  success: boolean;
  statusCode: number;
  message: string;
  user?: AuthenticatedUser;
};
