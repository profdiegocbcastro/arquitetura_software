import { RestApiRequestBuilder } from "./builders/rest-api-request-builder";
import { ApiRequestDirector } from "./directors/api-request-director";
import { RequestDebugService } from "./services/request-debug-service";

const builder = new RestApiRequestBuilder();
const director = new ApiRequestDirector(builder);
const debugService = new RequestDebugService();

const createOrderRequest = director.buildAuthenticatedJsonPost(
  "https://api.empresa.com/orders",
  "token-abc-123",
  JSON.stringify({
    customerId: "CUS-9001",
    total: 249.9,
  }),
);

const searchOrdersRequest = builder
  .reset()
  .setMethod("GET")
  .setUrl("https://api.empresa.com/orders")
  .addHeader("Accept", "application/json")
  .addQueryParam("status", "paid")
  .addQueryParam("page", "1")
  .setTimeoutInMs(2000)
  .build();

debugService.print(createOrderRequest);
debugService.print(searchOrdersRequest);
