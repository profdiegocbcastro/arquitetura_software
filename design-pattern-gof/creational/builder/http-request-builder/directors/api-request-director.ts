import { HttpRequestBuilder } from "../builders/http-request-builder";
import { HttpRequest } from "../products/http-request";

export class ApiRequestDirector {
  constructor(private readonly builder: HttpRequestBuilder) {}

  buildAuthenticatedJsonPost(
    url: string,
    token: string,
    body: string,
  ): HttpRequest {
    return this.builder
      .reset()
      .setMethod("POST")
      .setUrl(url)
      .addHeader("Authorization", `Bearer ${token}`)
      .addHeader("Content-Type", "application/json")
      .setBody(body)
      .setTimeoutInMs(5000)
      .build();
  }
}
