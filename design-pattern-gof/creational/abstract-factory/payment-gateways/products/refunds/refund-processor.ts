import { RefundRequest } from "../../types/refund-request";

export interface RefundProcessor {
  refund(request: RefundRequest): void;
}
