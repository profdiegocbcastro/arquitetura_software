import { HttpMethod } from "../types/http-method";
import { HttpRequest } from "../products/http-request";

export interface HttpRequestBuilder {
  reset(): this;
  setMethod(method: HttpMethod): this;
  setUrl(url: string): this;
  addHeader(name: string, value: string): this;
  addQueryParam(name: string, value: string): this;
  setBody(body: string): this;
  setTimeoutInMs(timeoutInMs: number): this;
  build(): HttpRequest;
}
