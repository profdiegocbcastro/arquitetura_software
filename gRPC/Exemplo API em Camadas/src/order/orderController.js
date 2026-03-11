import { toGrpcError } from "../shared/toGrpcError.js";

/**
 * Esta função devolve a controladora concreta do serviço gRPC.
 *
 * Papel desta camada:
 * - ler os dados recebidos via gRPC
 * - delegar a regra para a camada de service
 * - devolver a resposta final ao cliente
 * - converter erros da aplicação para o formato do gRPC
 */
export function getOrderController(orderService) {
  return {
    /**
     * Implementação de:
     * rpc CreateOrder (CreateOrderRequest) returns (OrderResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma única mensagem do tipo CreateOrderRequest
     * - o servidor devolve uma única mensagem do tipo OrderResponse
     *
     * Neste caso, os dados do pedido chegam em call.request.
     * A controller delega a criação para o service
     * e devolve o resultado final usando callback(...).
     */
    CreateOrder(call, callback) {
      try {
        const order = orderService.createOrder(call.request);
        callback(null, order);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc GetOrder (GetOrderRequest) returns (OrderResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma única mensagem do tipo GetOrderRequest
     * - o servidor devolve uma única mensagem do tipo OrderResponse
     *
     * Aqui o ID do pedido fica em call.request.orderId.
     * A controller usa esse valor para chamar o service
     * e devolve o pedido encontrado com callback(...).
     */
    GetOrder(call, callback) {
      try {
        const order = orderService.getOrder(call.request.orderId);
        callback(null, order);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc ListOrdersByCustomer (ListOrdersByCustomerRequest) returns (OrdersListResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma única mensagem do tipo ListOrdersByCustomerRequest
     * - o servidor devolve uma única mensagem do tipo OrdersListResponse
     *
     * O identificador do cliente fica em call.request.customerId.
     * A controller delega a listagem para o service
     * e devolve a resposta final usando callback(...).
     */
    ListOrdersByCustomer(call, callback) {
      try {
        const response = orderService.listOrdersByCustomer(call.request.customerId);
        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc UpdateOrderStatus (UpdateOrderStatusRequest) returns (OrderResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma única mensagem do tipo UpdateOrderStatusRequest
     * - o servidor devolve uma única mensagem do tipo OrderResponse
     *
     * Aqui os valores relevantes ficam em call.request.orderId
     * e call.request.status.
     * A controller chama o service para aplicar a transição
     * e devolve o pedido atualizado usando callback(...).
     */
    UpdateOrderStatus(call, callback) {
      try {
        const order = orderService.updateOrderStatus(call.request.orderId, call.request.status);
        callback(null, order);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },
  };
}
