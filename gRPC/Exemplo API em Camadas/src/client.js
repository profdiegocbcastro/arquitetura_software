import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

/**
 * Cliente gRPC de exemplo.
 *
 * Fluxo executado:
 * 1) Conecta ao servidor
 * 2) Cria um pedido
 * 3) Consulta o pedido por ID
 * 4) Atualiza o status do pedido
 * 5) Lista os pedidos do cliente
 * 6) Tenta criar um pedido com estoque insuficiente
 */

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "proto/orderApi.proto"),
  {}
);
const orderPackage = grpc.loadPackageDefinition(packageDefinition).orderPackage;

/**
 * Cria um cliente gRPC para o serviço OrderApi, conectando ao servidor na porta 50051.
 */
const client = new orderPackage.OrderApi(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

/**
 * Helper para usar chamadas unary com async/await no cliente de exemplo.
 */
function promisifyUnary(methodName, payload) {
  return new Promise((resolve, reject) => {
    client[methodName](payload, (error, response) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
}

async function main() {
  try {
    /**
 * Cria um pedido válido e, em seguida,
 * executa as operações principais do fluxo.
     */
    const createdOrder = await promisifyUnary("CreateOrder", {
      customerId: "cust-001",
      customerName: "Gabriel Ramos",
      paymentMethod: "PIX",
      items: [
        { productId: "notebook-01", quantity: 1 },
        { productId: "mouse-01", quantity: 2 },
      ],
    });

    console.log("Pedido criado:");
    console.log(createdOrder);

    const fetchedOrder = await promisifyUnary("GetOrder", {
      orderId: createdOrder.orderId,
    });

    console.log("\nPedido consultado por ID:");
    console.log(fetchedOrder);

    const paidOrder = await promisifyUnary("UpdateOrderStatus", {
      orderId: createdOrder.orderId,
      status: "PAID",
    });

    console.log("\nPedido atualizado para PAID:");
    console.log(paidOrder);

    const ordersByCustomer = await promisifyUnary("ListOrdersByCustomer", {
      customerId: "cust-001",
    });

    console.log("\nPedidos do cliente cust-001:");
    console.log(ordersByCustomer);

    /**
     * Ao final, tenta criar um pedido inválido
     * para demonstrar o tratamento de erro do gRPC.
     */
    await promisifyUnary("CreateOrder", {
      customerId: "cust-002",
      customerName: "Cliente sem estoque",
      paymentMethod: "CARTÃO",
      items: [{ productId: "monitor-01", quantity: 10 }],
    });
  } catch (error) {
    console.error("\nErro esperado do fluxo:");
    console.error({
      code: error.code,
      details: error.details,
      message: error.message,
    });
  }
}

main();
