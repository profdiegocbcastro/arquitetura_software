const { io } = require("socket.io-client");

const username = process.argv[2] || "Anônimo";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log(`Conectado como ${username}`);
    socket.emit("join", username);
});

socket.on("chat message", (msg) => {
    console.log(msg);
});

process.stdin.on("data", (data) => {
    const msg = data.toString().trim();
    if (msg.length > 0) {
        socket.emit("chat message", msg);
    }
});
