import grpc from "@grpc/grpc-js";

import { ApplicationError } from "../shared/applicationError.js";

const allowedTransitions = {
  RECEIVED: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

/**
 * Serviço de pedido.
 */
export class OrderService {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  /**
   * Cria um pedido validando:
   * - dados obrigatórios do cliente
   * - existência dos produtos
   * - disponibilidade de estoque
   *
   * Depois disso, calcula o total, atualiza o estoque dos produtos e persiste o pedido via repository.
   */
  createOrder(payload) {
    this.validateCreateOrderPayload(payload);

    /**
     * Se o mesmo produto vier repetido em mais de um item,
     * somamos tudo antes de comparar com o estoque disponível.
     */
    const requestedQuantities = payload.items.reduce((accumulator, item) => {
      const currentQuantity = accumulator.get(item.productId) || 0;
      accumulator.set(item.productId, currentQuantity + item.quantity);
      return accumulator;
    }, new Map());

    /**
     * A validação consulta os produtos via repository,
     * mantendo a regra desacoplada da implementação da base.
     */
    requestedQuantities.forEach((requestedQuantity, productId) => {
      const product = this.productRepository.findById(productId);

      if (!product) {
        throw new ApplicationError(
          `Produto ${productId} não encontrado no catálogo.`,
          grpc.status.NOT_FOUND
        );
      }

      if (requestedQuantity > product.stock) {
        throw new ApplicationError(
          `Estoque insuficiente para o produto ${product.name}.`,
          grpc.status.FAILED_PRECONDITION
        );
      }
    });

    /**
     * Depois da validação, montamos os itens no formato
     * esperado pela resposta do contrato gRPC.
     */
    const items = payload.items.map((item) => {
      const product = this.productRepository.findById(item.productId);

      const lineTotal = product.price * item.quantity;

      return {
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal,
      };
    });

    /**
     * A baixa de estoque só acontece depois que toda a validação passou,
     * evitando alterações parciais em caso de erro.
     */
    items.forEach((item) => {
      this.productRepository.decrementStock(item.productId, item.quantity);
    });

    const totalAmount = items.reduce((total, item) => total + item.lineTotal, 0);

    return this.orderRepository.create({
      customerId: payload.customerId,
      customerName: payload.customerName,
      paymentMethod: payload.paymentMethod,
      status: "RECEIVED",
      totalAmount,
      items,
    });
  }

  /**
   * Busca um pedido pelo ID.
   *
   * Se o pedido não existir, a camada de serviço devolve um erro de negócio apropriado.
   */
  getOrder(orderId) {
    this.validateOrderId(orderId);

    const order = this.orderRepository.findById(orderId);

    if (!order) {
      throw new ApplicationError("Pedido não encontrado.", grpc.status.NOT_FOUND);
    }

    return order;
  }

  /**
   * Lista os pedidos de um cliente específico.
   */
  listOrdersByCustomer(customerId) {
    if (!customerId) {
      throw new ApplicationError(
        "customer_id é obrigatório para listar pedidos.",
        grpc.status.INVALID_ARGUMENT
      );
    }

    return {
      orders: this.orderRepository.findByCustomerId(customerId),
    };
  }

  /**
   * Atualiza o status do pedido respeitando as transições permitidas.
   */
  updateOrderStatus(orderId, newStatus) {
    this.validateOrderId(orderId);

    if (!newStatus) {
      throw new ApplicationError("status é obrigatório.", grpc.status.INVALID_ARGUMENT);
    }

    const normalizedStatus = newStatus.toUpperCase();
    const order = this.getOrder(orderId);
    const nextStatuses = allowedTransitions[order.status] || [];

    if (!allowedTransitions[normalizedStatus] && normalizedStatus !== order.status) {
      throw new ApplicationError("Status informado é inválido.", grpc.status.INVALID_ARGUMENT);
    }

    if (normalizedStatus === order.status) {
      return order;
    }

    if (!nextStatuses.includes(normalizedStatus)) {
      throw new ApplicationError(
        `Transição de status inválida: ${order.status} -> ${normalizedStatus}.`,
        grpc.status.FAILED_PRECONDITION
      );
    }

    /**
     * A persistência do novo estado continua encapsulada no repository,
     * mantendo a camada de serviço sem acesso direto à base.
     */
    return this.orderRepository.updateStatus(orderId, normalizedStatus);
  }

  /**
   * Valida os campos obrigatórios da criação de pedido.
   */
  validateCreateOrderPayload(payload) {
    if (!payload.customerId || !payload.customerName || !payload.paymentMethod) {
      throw new ApplicationError(
        "customer_id, customer_name e payment_method são obrigatórios.",
        grpc.status.INVALID_ARGUMENT
      );
    }

    if (!payload.items || payload.items.length === 0) {
      throw new ApplicationError(
        "O pedido precisa ter ao menos um item.",
        grpc.status.INVALID_ARGUMENT
      );
    }

    payload.items.forEach((item) => {
      if (!item.productId || item.quantity <= 0) {
        throw new ApplicationError(
          "Cada item precisa informar product_id e quantity maior que zero.",
          grpc.status.INVALID_ARGUMENT
        );
      }
    });
  }

  /**
   * Valida se o identificador do pedido é um inteiro positivo.
   */
  validateOrderId(orderId) {
    if (!Number.isInteger(orderId) || orderId <= 0) {
      throw new ApplicationError("order_id inválido.", grpc.status.INVALID_ARGUMENT);
    }
  }
}
