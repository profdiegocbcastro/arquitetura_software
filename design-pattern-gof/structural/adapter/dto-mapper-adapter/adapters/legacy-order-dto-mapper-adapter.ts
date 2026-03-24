import { OrderDtoMapper } from "../targets/order-dto-mapper";
import { LegacyOrderPayload } from "../types/legacy-order-payload";
import { OrderResponseDto } from "../types/order-response-dto";

export class LegacyOrderDtoMapperAdapter implements OrderDtoMapper {
  map(payload: LegacyOrderPayload): OrderResponseDto {
    return {
      orderId: payload.order_code,
      customerName: payload.buyer_full_name,
      total: payload.total_in_cents / 100,
      status: payload.current_status,
    };
  }
}
