import { ActiveUserMiddleware } from "./handlers/active-user-middleware";
import { AuthorizationHeaderMiddleware } from "./handlers/authorization-header-middleware";
import { RolePermissionMiddleware } from "./handlers/role-permission-middleware";
import { TokenVerificationMiddleware } from "./handlers/token-verification-middleware";
import { ProtectedRouteService } from "./services/protected-route-service";
import { RequestContext } from "./types/request-context";

const middlewareChain = new AuthorizationHeaderMiddleware();

middlewareChain
  .setNext(new TokenVerificationMiddleware())
  .setNext(new ActiveUserMiddleware())
  .setNext(new RolePermissionMiddleware());

const protectedRouteService = new ProtectedRouteService(middlewareChain);

const missingHeaderRequest: RequestContext = {
  method: "GET",
  path: "/admin/reports",
  headers: {},
  requiredRole: "ADMIN",
};

const blockedUserRequest: RequestContext = {
  method: "GET",
  path: "/admin/reports",
  headers: {
    authorization: "Bearer blocked-token",
  },
  requiredRole: "ADMIN",
};

const insufficientPermissionRequest: RequestContext = {
  method: "GET",
  path: "/admin/reports",
  headers: {
    authorization: "Bearer support-token",
  },
  requiredRole: "ADMIN",
};

const allowedRequest: RequestContext = {
  method: "GET",
  path: "/admin/reports",
  headers: {
    authorization: "Bearer admin-token",
  },
  requiredRole: "ADMIN",
};

protectedRouteService.handleRequest(missingHeaderRequest);
console.log("");
protectedRouteService.handleRequest(blockedUserRequest);
console.log("");
protectedRouteService.handleRequest(insufficientPermissionRequest);
console.log("");
protectedRouteService.handleRequest(allowedRequest);
