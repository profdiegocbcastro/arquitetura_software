import { SimplePermission } from "./components/simple-permission";
import { Role } from "./composites/role";
import { AuthorizationService } from "./services/authorization-service";

const readerRole = new Role("Reader");
readerRole.add(new SimplePermission("document.read"));

const editorRole = new Role("Editor");
editorRole.add(readerRole);
editorRole.add(new SimplePermission("document.write"));

const adminRole = new Role("Admin");
adminRole.add(editorRole);
adminRole.add(new SimplePermission("user.manage"));
adminRole.add(new SimplePermission("billing.view"));

const authorizationService = new AuthorizationService();

authorizationService.check(adminRole, "document.write");
authorizationService.check(adminRole, "billing.delete");
