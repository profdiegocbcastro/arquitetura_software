import express from "express";

import { createSignature } from "./shared/signature.js";

/**
 * Serviço emissor do webhook de pagamento.
 *
 * Fluxo:
 * 1) Aprova pagamento
 * 2) Monta evento payment.approved
 * 3) Assina payload com HMAC
 * 4) Entrega webhook ao receiver
 */
const app = express();
const port = Number(process.env.PORT ?? 3001);
const webhookUrl =
  process.env.WEBHOOK_URL ?? "http://localhost:4001/webhooks/payments";
const webhookSecret = process.env.WEBHOOK_SECRET ?? "webhook-secret-demo";

app.use(express.json());

/**
 * Entrega o webhook com:
 * - corpo JSON do evento
 * - cabeçalho de assinatura
 * - identificador de entrega
 */
async function deliverWebhook(event) {
  const rawPayload = JSON.stringify(event);
  const signature = createSignature(rawPayload, webhookSecret);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-id": event.id,
      "x-webhook-signature": signature,
    },
    body: rawPayload,
  });

  const body = await response.text();
  console.log(
    `[billing-provider] webhook ${event.id} entregue com status ${response.status}`
  );
  console.log(`[billing-provider] resposta receiver: ${body}`);
}

/**
 * =========================================================
 * Endpoint de criação/aprovação de pagamento
 * =========================================================
 */
app.post("/payments", async (req, res) => {
  /**
   * 1) Validação de entrada
   */
  const customerId = (req.body?.customerId ?? "").trim();
  const amount = Number(req.body?.amount);
  const forceDuplicateDelivery = Boolean(req.body?.forceDuplicateDelivery);

  if (!customerId) {
    return res.status(400).json({ message: "customerId é obrigatório" });
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "amount deve ser maior que zero" });
  }

  /**
   * 2) Criação da entidade de pagamento aprovada
   */
  const payment = {
    id: `payment_${Date.now()}`,
    customerId,
    amount,
    status: "approved",
    approvedAt: new Date().toISOString(),
  };

  /**
   * 3) Evento de domínio convertido para webhook
   */
  const event = {
    id: `evt_${Date.now()}`,
    type: "payment.approved",
    occurredAt: new Date().toISOString(),
    data: payment,
  };

  console.log(`[billing-provider] pagamento aprovado: ${payment.id}`);

  /**
   * 4) Entrega inicial + reentrega opcional para testar idempotência
   */
  try {
    await deliverWebhook(event);

    if (forceDuplicateDelivery) {
      console.log(`[billing-provider] reenviando evento ${event.id}`);
      await deliverWebhook(event);
    }
  } catch (error) {
    return res.status(502).json({
      message: "pagamento aprovado, mas webhook falhou",
      error: error.message,
    });
  }

  /**
   * 5) Resposta para quem chamou o endpoint de pagamentos
   */
  return res.status(201).json({
    message: "pagamento aprovado e webhook enviado",
    payment,
    duplicatedDelivery: forceDuplicateDelivery,
  });
});

/**
 * Inicialização do serviço.
 */
app.listen(port, () => {
  console.log(
    `[billing-provider] online em http://localhost:${port} -> webhook ${webhookUrl}`
  );
});
