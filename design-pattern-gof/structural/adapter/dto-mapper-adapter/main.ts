import { LegacyOrderDtoMapperAdapter } from "./adapters/legacy-order-dto-mapper-adapter";
import { OrderQueryService } from "./services/order-query-service";

const orderQueryService = new OrderQueryService(
  new LegacyOrderDtoMapperAdapter(),
);

orderQueryService.showOrder({
  order_code: "ORD-LEGACY-88",
  buyer_full_name: "Camila Rocha",
  total_in_cents: 159990,
  current_status: "PAID",
});
