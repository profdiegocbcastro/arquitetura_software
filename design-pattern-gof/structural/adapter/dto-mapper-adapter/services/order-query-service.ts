import { OrderDtoMapper } from "../targets/order-dto-mapper";
import { LegacyOrderPayload } from "../types/legacy-order-payload";

export class OrderQueryService {
  constructor(private readonly mapper: OrderDtoMapper) {}

  showOrder(payload: LegacyOrderPayload): void {
    const dto = this.mapper.map(payload);
    console.log("DTO retornado pela API:", dto);
  }
}
