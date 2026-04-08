import express from "express";
import http from "node:http";
import { Server } from "socket.io";

/**
 * Servidor didático com rooms e presença.
 *
 * Estrutura:
 * - cada sala tem um Set de usuários conectados
 * - eventos são emitidos apenas para membros da sala
 */
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const port = Number(process.env.PORT ?? 6000);

/**
 * roomMembers:
 * key   -> roomName
 * value -> Set de userName
 */
const roomMembers = new Map();

app.get("/", (_req, res) => {
  const snapshot = {};

  for (const [roomName, members] of roomMembers.entries()) {
    snapshot[roomName] = Array.from(members.values());
  }

  res.status(200).json({
    status: "ok",
    service: "room-presence",
    rooms: snapshot,
  });
});

io.on("connection", (socket) => {
  console.log(`[server] socket conectado: ${socket.id}`);

  socket.on("room:join", ({ roomName, userName }, ack) => {
    const safeRoomName = (roomName ?? "").trim();
    const safeUserName = (userName ?? "").trim();

    if (!safeRoomName || !safeUserName) {
      ack?.({
        ok: false,
        error: "roomName e userName são obrigatórios.",
      });
      return;
    }

    socket.data.roomName = safeRoomName;
    socket.data.userName = safeUserName;

    socket.join(safeRoomName);

    if (!roomMembers.has(safeRoomName)) {
      roomMembers.set(safeRoomName, new Set());
    }

    roomMembers.get(safeRoomName).add(safeUserName);

    io.to(safeRoomName).emit("room:presence", {
      roomName: safeRoomName,
      members: Array.from(roomMembers.get(safeRoomName).values()),
      changedBy: safeUserName,
      action: "join",
    });

    ack?.({ ok: true });
  });

  socket.on("room:typing", () => {
    const roomName = socket.data.roomName;
    const userName = socket.data.userName;

    if (!roomName || !userName) {
      return;
    }

    socket.to(roomName).emit("room:typing", {
      roomName,
      userName,
      at: new Date().toISOString(),
    });
  });

  socket.on("room:send", ({ message }, ack) => {
    const roomName = socket.data.roomName;
    const userName = socket.data.userName;
    const safeMessage = (message ?? "").trim();

    if (!roomName || !userName) {
      ack?.({ ok: false, error: "Usuário não entrou em nenhuma sala." });
      return;
    }

    if (!safeMessage) {
      ack?.({ ok: false, error: "Mensagem vazia não pode ser enviada." });
      return;
    }

    const outboundEvent = {
      id: `room_msg_${Date.now()}`,
      roomName,
      from: userName,
      message: safeMessage,
      sentAt: new Date().toISOString(),
    };

    io.to(roomName).emit("room:message", outboundEvent);

    ack?.({ ok: true, deliveredEventId: outboundEvent.id });
  });

  socket.on("disconnect", () => {
    const roomName = socket.data.roomName;
    const userName = socket.data.userName;

    if (!roomName || !userName || !roomMembers.has(roomName)) {
      return;
    }

    const members = roomMembers.get(roomName);
    members.delete(userName);

    if (members.size === 0) {
      roomMembers.delete(roomName);
    }

    io.to(roomName).emit("room:presence", {
      roomName,
      members: members ? Array.from(members.values()) : [],
      changedBy: userName,
      action: "leave",
    });

    console.log(`[server] socket desconectado: ${socket.id}`);
  });
});

httpServer.listen(port, () => {
  console.log(`[server] room-presence online em http://localhost:${port}`);
});
