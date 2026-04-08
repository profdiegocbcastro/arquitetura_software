import { io } from "socket.io-client";

/**
 * Simulador automático com dois clientes para demonstração rápida.
 */
function createSimulatedClient(userName, message, delayMs) {
  const socket = io("ws://localhost:5000", {
    query: { userName },
  });

  socket.on("connect", () => {
    console.log(`[sim:${userName}] conectado`);

    setTimeout(() => {
      socket.emit("chat:send", { message }, (ack) => {
        console.log(`[sim:${userName}] ACK:`, ack);
      });
    }, delayMs);
  });

  socket.on("chat:message", (payload) => {
    console.log(`[sim:${userName}] recebeu chat:message`, payload);
  });

  socket.on("chat:presence", (payload) => {
    console.log(`[sim:${userName}] recebeu chat:presence`, payload);
  });

  setTimeout(() => {
    socket.disconnect();
  }, 7000);
}

createSimulatedClient("Alice", "Oi Bob, tudo certo?", 1000);
createSimulatedClient("Bob", "Tudo sim, Alice. Vamos comecar a aula!", 2000);
