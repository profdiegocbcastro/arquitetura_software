import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), 'proto/chat.proto'),
  {}
);

const chatPackage = grpc.loadPackageDefinition(packageDefinition).chatPackage;

const clients = [];

function chat(call) {
  clients.push(call);

  call.on("data", (chatMessage) => {
    console.log(`[${chatMessage.user}] ${chatMessage.message}`);

    clients.forEach(clientStream => {
      if (clientStream !== call) {
        clientStream.write(chatMessage);
      }
    });
  });

  call.on("end", () => {
    const idx = clients.indexOf(call);
    if (idx >= 0) {
      clients.splice(idx, 1);
    }
    call.end();
  });
}

const server = new grpc.Server();

server.addService(chatPackage.Chat.service, { chat });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`🚀 Chat server running at http://127.0.0.1:${port}`);
});
