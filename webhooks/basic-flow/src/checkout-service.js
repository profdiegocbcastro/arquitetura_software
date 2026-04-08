import express from "express";

/**
 * Serviço emissor do webhook.
 *
 * Fluxo deste exemplo:
 *
 * Cliente -> POST /orders -> cria pedido -> envia webhook order.created
 */
const app = express();
const port = Number(process.env.PORT ?? 3000);
const webhookUrl =
  process.env.WEBHOOK_URL ?? "http://localhost:4000/webhooks/orders";

/**
 * Persistência em memória para manter o foco no fluxo de webhook.
 */
const orders = [];

app.use(express.json());

/**
 * =========================================================
 * Endpoint para criação de pedidos
 * =========================================================
 */
app.post("/orders", async (req, res) => {
  /**
   * 1) Validação de entrada
   */
  const customerName = (req.body?.customerName ?? "").trim();
  const items = Array.isArray(req.body?.items) ? req.body.items : [];

  if (!customerName) {
    return res.status(400).json({ message: "customerName é obrigatório" });
  }

  if (items.length === 0) {
    return res.status(400).json({ message: "informe pelo menos 1 item" });
  }

  /**
   * 2) Criação do pedido
   */
  const order = {
    id: `order_${Date.now()}`,
    customerName,
    items,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  console.log(`[checkout-service] pedido criado: ${order.id}`);

  /**
   * 3) Montagem do evento de webhook
   */
  const webhookEvent = {
    id: `evt_${Date.now()}`,
    type: "order.created",
    occurredAt: new Date().toISOString(),
    data: order,
  };

  /**
   * 4) Disparo do webhook para o serviço de destino
   */
  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookEvent),
    });

    console.log(
      `[checkout-service] webhook enviado com status ${webhookResponse.status}`
    );
  } catch (error) {
    console.error(
      `[checkout-service] falha ao enviar webhook: ${error.message}`
    );
  }

  /**
   * 5) Resposta para o cliente que criou o pedido
   */
  return res.status(201).json({
    message: "pedido criado e webhook disparado",
    order,
    totalOrders: orders.length,
  });
});

/**
 * Inicialização do serviço.
 */
app.listen(port, () => {
  console.log(
    `[checkout-service] online em http://localhost:${port} -> webhook ${webhookUrl}`
  );
});
