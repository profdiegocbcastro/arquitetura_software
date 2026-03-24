import { LegacyOrderPayload } from "../types/legacy-order-payload";
import { OrderResponseDto } from "../types/order-response-dto";

export interface OrderDtoMapper {
  map(payload: LegacyOrderPayload): OrderResponseDto;
}
