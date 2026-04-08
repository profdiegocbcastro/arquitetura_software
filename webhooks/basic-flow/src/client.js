/**
 * Cliente auxiliar para disparar o fluxo completo do exemplo.
 */
const payload = {
  customerName: "Maria Silva",
  items: ["Notebook", "Mouse", "Teclado"],
};

async function main() {
  /**
   * Chama o endpoint de criação de pedido.
   * O checkout-service cuidará de disparar o webhook automaticamente.
   */
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("[client] resposta do checkout-service:");
  console.log(JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error(`[client] erro: ${error.message}`);
  process.exit(1);
});
