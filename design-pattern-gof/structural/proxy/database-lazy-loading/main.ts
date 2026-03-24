import { LazyDatabaseClientProxy } from "./proxies/lazy-database-client-proxy";
import { QueryService } from "./services/query-service";

const queryService = new QueryService(new LazyDatabaseClientProxy());

queryService.listUsers();
queryService.listOrders();
