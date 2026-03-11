const orders = [];

/**
 * Esta classe simula uma base de pedidos em memória.
 */
export class OrderDatabase {
  /**
   * Simula um insert com ID incremental.
   */
  insert(orderData) {
    const order = {
      orderId: orders.length + 1,
      ...orderData,
    };

    orders.push(order);
    return order;
  }

  /**
   * Busca um pedido específico pelo ID.
   */
  findOrderById(orderId) {
    return orders.find((order) => order.orderId === orderId);
  }

  /**
   * Lista os pedidos de um cliente específico.
   */
  findOrdersByCustomerId(customerId) {
    return orders.filter((order) => order.customerId === customerId);
  }

  /**
   * Atualiza apenas o status do pedido,
   * como faria uma query específica de update.
   */
  updateOrderStatus(orderId, status) {
    const order = this.findOrderById(orderId);

    if (!order) {
      return null;
    }

    order.status = status;
    return order;
  }
}
