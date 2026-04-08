import express from "express";
import http from "node:http";
import { Server } from "socket.io";

/**
 * Servidor WebSocket didático para broadcast global.
 *
 * Fluxo:
 * 1) Cliente conecta
 * 2) Cliente envia chat:send
 * 3) Servidor publica chat:message para todos
 * 4) Servidor confirma com ACK para quem enviou
 */
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const port = Number(process.env.PORT ?? 5000);
let connectedClients = 0;

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "chat-broadcast",
    connectedClients,
  });
});

io.on("connection", (socket) => {
  connectedClients += 1;

  const userName = socket.handshake.query.userName ?? `guest-${socket.id.slice(0, 5)}`;

  console.log(`[server] cliente conectado: ${userName} (${socket.id})`);

  socket.emit("chat:welcome", {
    message: `Conexão estabelecida com sucesso, ${userName}.`,
    socketId: socket.id,
  });

  io.emit("chat:presence", {
    type: "join",
    userName,
    connectedClients,
  });

  socket.on("chat:send", (payload, ack) => {
    const messageText = (payload?.message ?? "").trim();

    if (!messageText) {
      ack?.({
        ok: false,
        error: "Mensagem vazia não pode ser enviada.",
      });
      return;
    }

    const outboundEvent = {
      id: `msg_${Date.now()}`,
      from: userName,
      message: messageText,
      sentAt: new Date().toISOString(),
    };

    io.emit("chat:message", outboundEvent);

    ack?.({
      ok: true,
      deliveredEventId: outboundEvent.id,
    });
  });

  socket.on("disconnect", () => {
    connectedClients -= 1;

    console.log(`[server] cliente desconectado: ${userName} (${socket.id})`);

    io.emit("chat:presence", {
      type: "leave",
      userName,
      connectedClients,
    });
  });
});

httpServer.listen(port, () => {
  console.log(`[server] chat-broadcast online em http://localhost:${port}`);
});
