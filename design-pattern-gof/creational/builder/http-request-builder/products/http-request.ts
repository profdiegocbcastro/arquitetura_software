import { HttpMethod } from "../types/http-method";

export type HttpRequest = {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body?: string;
  timeoutInMs: number;
};
