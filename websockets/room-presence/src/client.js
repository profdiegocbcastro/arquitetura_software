import { io } from "socket.io-client";

/**
 * Cliente CLI para teste manual de rooms.
 *
 * Uso:
 * npm run client -- Ana squad-arquitetura "Mensagem da Ana"
 */
const userName = process.argv[2] ?? "Ana";
const roomName = process.argv[3] ?? "squad-arquitetura";
const message = process.argv[4] ?? "Mensagem de teste em room";

const socket = io("ws://localhost:6000");

socket.on("connect", () => {
  console.log(`[client:${userName}] conectado com id ${socket.id}`);

  socket.emit("room:join", { roomName, userName }, (ack) => {
    console.log(`[client:${userName}] ACK join:`, ack);

    if (!ack?.ok) {
      return;
    }

    socket.emit("room:typing");

    setTimeout(() => {
      socket.emit("room:send", { message }, (sendAck) => {
        console.log(`[client:${userName}] ACK send:`, sendAck);
      });
    }, 600);
  });
});

socket.on("room:presence", (payload) => {
  console.log(`[client:${userName}] room:presence`, payload);
});

socket.on("room:typing", (payload) => {
  console.log(`[client:${userName}] room:typing`, payload);
});

socket.on("room:message", (payload) => {
  console.log(`[client:${userName}] room:message`, payload);
});

setTimeout(() => {
  socket.disconnect();
}, 6000);
