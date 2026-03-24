import { HttpRequestBuilder } from "./http-request-builder";
import { HttpMethod } from "../types/http-method";
import { HttpRequest } from "../products/http-request";

export class RestApiRequestBuilder implements HttpRequestBuilder {
  private request: HttpRequest;

  constructor() {
    this.request = this.createEmptyRequest();
  }

  reset(): this {
    this.request = this.createEmptyRequest();
    return this;
  }

  setMethod(method: HttpMethod): this {
    this.request.method = method;
    return this;
  }

  setUrl(url: string): this {
    this.request.url = url;
    return this;
  }

  addHeader(name: string, value: string): this {
    this.request.headers[name] = value;
    return this;
  }

  addQueryParam(name: string, value: string): this {
    this.request.queryParams[name] = value;
    return this;
  }

  setBody(body: string): this {
    this.request.body = body;
    return this;
  }

  setTimeoutInMs(timeoutInMs: number): this {
    this.request.timeoutInMs = timeoutInMs;
    return this;
  }

  build(): HttpRequest {
    return {
      ...this.request,
      headers: { ...this.request.headers },
      queryParams: { ...this.request.queryParams },
    };
  }

  private createEmptyRequest(): HttpRequest {
    return {
      method: "GET",
      url: "",
      headers: {},
      queryParams: {},
      timeoutInMs: 3000,
    };
  }
}
