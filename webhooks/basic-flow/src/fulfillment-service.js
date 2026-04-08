import express from "express";

/**
 * Serviço receptor do webhook.
 *
 * Neste exemplo, ele representa a etapa de separação de pedidos
 * após o evento order.created.
 */
const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json());

/**
 * =========================================================
 * Endpoint de recebimento de webhook
 * =========================================================
 */
app.post("/webhooks/orders", (req, res) => {
  /**
   * O payload do webhook chega como JSON no corpo da requisição.
   */
  const event = req.body;

  console.log("[fulfillment-service] webhook recebido");
  console.log(`[fulfillment-service] evento: ${event.type}`);
  console.log(
    `[fulfillment-service] separando pedido ${event.data.id} para ${event.data.customerName}`
  );
  console.log(
    `[fulfillment-service] itens: ${(event.data.items ?? []).join(", ")}`
  );

  return res.status(200).json({
    received: true,
    eventId: event.id,
  });
});

/**
 * Inicialização do serviço.
 */
app.listen(port, () => {
  console.log(
    `[fulfillment-service] online em http://localhost:${port}/webhooks/orders`
  );
});
