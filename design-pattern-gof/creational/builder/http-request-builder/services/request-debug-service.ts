import { HttpRequest } from "../products/http-request";

export class RequestDebugService {
  print(request: HttpRequest): void {
    console.log("HTTP Request montado:");
    console.log(JSON.stringify(request, null, 2));
  }
}
