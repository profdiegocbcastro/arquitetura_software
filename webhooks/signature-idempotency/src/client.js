/**
 * Cliente auxiliar do exemplo.
 *
 * forceDuplicateDelivery = true faz o provider reenviar o mesmo evento,
 * permitindo observar o comportamento idempotente do receiver.
 */
const payload = {
  customerId: "customer_9001",
  amount: 249.9,
  forceDuplicateDelivery: true,
};

async function main() {
  /**
   * Dispara a aprovação de pagamento no provider.
   */
  const response = await fetch("http://localhost:3001/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("[client] resposta do billing-provider:");
  console.log(JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error(`[client] erro: ${error.message}`);
  process.exit(1);
});
