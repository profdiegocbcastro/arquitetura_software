const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('join', (username) => {
        socket.username = username;
        console.log(`${username} entrou no chat`);
        socket.broadcast.emit('chat message', `${username} entrou no chat`);
    });

    socket.on('chat message', (msg) => {
        console.log(`${socket.username}: ${msg}`);
        socket.broadcast.emit('chat message', `${socket.username}: ${msg}`);
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            console.log(`${socket.username} saiu do chat`);
            socket.broadcast.emit('chat message', `${socket.username} saiu do chat`);
        }
    });
});

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
