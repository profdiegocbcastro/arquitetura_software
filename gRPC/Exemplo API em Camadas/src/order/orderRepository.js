/**
 * Repositório de pedido.
 */
export class OrderRepository {
  constructor(orderDatabase) {
    this.orderDatabase = orderDatabase;
  }

  /**
   * Persiste um novo pedido na base.
   */
  create(orderData) {
    return this.orderDatabase.insert(orderData);
  }

  /**
   * Busca um pedido pelo ID.
   */
  findById(orderId) {
    return this.orderDatabase.findOrderById(orderId);
  }

  /**
   * Lista os pedidos de um cliente específico.
   */
  findByCustomerId(customerId) {
    return this.orderDatabase.findOrdersByCustomerId(customerId);
  }

  /**
   * Atualiza o status do pedido sem expor a estrutura da base.
   */
  updateStatus(orderId, status) {
    return this.orderDatabase.updateOrderStatus(orderId, status);
  }
}
