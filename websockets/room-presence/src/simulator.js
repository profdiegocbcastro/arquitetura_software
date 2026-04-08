import { io } from "socket.io-client";

/**
 * Simulador para demonstração em sala.
 * Ambos clientes entram na mesma room e trocam eventos.
 */
function createRoomClient(userName, roomName, message, typingDelayMs, sendDelayMs) {
  const socket = io("ws://localhost:6000");

  socket.on("connect", () => {
    console.log(`[sim:${userName}] conectado`);

    socket.emit("room:join", { roomName, userName }, (ack) => {
      console.log(`[sim:${userName}] ACK join`, ack);

      if (!ack?.ok) {
        return;
      }

      setTimeout(() => {
        socket.emit("room:typing");
      }, typingDelayMs);

      setTimeout(() => {
        socket.emit("room:send", { message }, (sendAck) => {
          console.log(`[sim:${userName}] ACK send`, sendAck);
        });
      }, sendDelayMs);
    });
  });

  socket.on("room:presence", (payload) => {
    console.log(`[sim:${userName}] room:presence`, payload);
  });

  socket.on("room:typing", (payload) => {
    console.log(`[sim:${userName}] room:typing`, payload);
  });

  socket.on("room:message", (payload) => {
    console.log(`[sim:${userName}] room:message`, payload);
  });

  setTimeout(() => {
    socket.disconnect();
  }, 9000);
}

createRoomClient(
  "Ana",
  "squad-arquitetura",
  "Pessoal, vamos revisar o diagrama de componentes?",
  800,
  1500
);

createRoomClient(
  "Bruno",
  "squad-arquitetura",
  "Boa! Eu trago os pontos de API e observabilidade.",
  1300,
  2300
);
