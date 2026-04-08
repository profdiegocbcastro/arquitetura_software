import { io } from "socket.io-client";

/**
 * Cliente CLI para testes manuais.
 *
 * Uso:
 * npm run client -- Alice "Ola turma"
 */
const userName = process.argv[2] ?? "Alice";
const message = process.argv[3] ?? "Mensagem de teste do cliente CLI";

const socket = io("ws://localhost:5000", {
  query: { userName },
});

socket.on("connect", () => {
  console.log(`[client:${userName}] conectado com id ${socket.id}`);

  socket.emit("chat:send", { message }, (ack) => {
    console.log(`[client:${userName}] ACK recebido:`, ack);
  });
});

socket.on("chat:welcome", (payload) => {
  console.log(`[client:${userName}] welcome:`, payload);
});

socket.on("chat:message", (payload) => {
  console.log(`[client:${userName}] chat:message:`, payload);
});

socket.on("chat:presence", (payload) => {
  console.log(`[client:${userName}] chat:presence:`, payload);
});

setTimeout(() => {
  socket.disconnect();
}, 4000);
