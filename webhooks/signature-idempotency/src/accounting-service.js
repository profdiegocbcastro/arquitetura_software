import express from "express";

import { isSignatureValid } from "./shared/signature.js";
import { WebhookEventStore } from "./shared/webhook-event-store.js";

/**
 * Serviço receptor de webhook.
 *
 * Responsabilidades:
 * - validar assinatura
 * - controlar idempotência
 * - processar eventos válidos
 */
const app = express();
const port = Number(process.env.PORT ?? 4001);
const webhookSecret = process.env.WEBHOOK_SECRET ?? "webhook-secret-demo";
const processedEvents = new WebhookEventStore();

/**
 * Endpoint auxiliar para inspecionar quais eventos já foram processados.
 */
app.get("/processed-events", (_req, res) => {
  return res.status(200).json({
    processedEvents: processedEvents.list(),
  });
});

/**
 * =========================================================
 * Endpoint de recebimento de webhook
 * =========================================================
 */
app.post(
  "/webhooks/payments",
  express.raw({ type: "application/json" }),
  (req, res) => {
    /**
     * O corpo bruto é necessário para validar assinatura corretamente.
     */
    const rawBody = req.body.toString("utf8");
    const receivedSignature = req.header("x-webhook-signature");

    /**
     * 1) Valida assinatura para confirmar origem do webhook.
     */
    if (!isSignatureValid(rawBody, webhookSecret, receivedSignature)) {
      console.log("[accounting-service] assinatura inválida");
      return res.status(401).json({ message: "assinatura inválida" });
    }

    const event = JSON.parse(rawBody);
    const deliveryId = req.header("x-webhook-id") ?? event.id;

    /**
     * 2) Valida idempotência para ignorar reentregas.
     */
    if (processedEvents.has(deliveryId)) {
      console.log(
        `[accounting-service] evento duplicado ignorado: ${deliveryId}`
      );
      return res.status(200).json({
        received: true,
        duplicate: true,
        eventId: deliveryId,
      });
    }

    /**
     * 3) Marca evento como processado e executa lógica de negócio.
     */
    processedEvents.save(deliveryId);

    console.log("[accounting-service] webhook válido recebido");
    console.log(`[accounting-service] evento: ${event.type}`);
    console.log(
      `[accounting-service] conciliando pagamento ${event.data.id} do cliente ${event.data.customerId}`
    );

    return res.status(200).json({
      received: true,
      duplicate: false,
      eventId: deliveryId,
    });
  }
);

/**
 * Inicialização do serviço.
 */
app.listen(port, () => {
  console.log(
    `[accounting-service] online em http://localhost:${port}/webhooks/payments`
  );
});
