import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import readline from 'readline';

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), '../proto/chat.proto'),
  {}
);
const chatPackage = grpc.loadPackageDefinition(packageDefinition).chatPackage;

const username = process.argv[2];

const client = new chatPackage.Chat(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const call = client.chat();

call.on("data", (msg) => {
  if (msg.user !== username) {
    console.log(`\n[${msg.user}]: ${msg.message}`);
    rl.prompt();
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`👋 Você entrou no chat como: ${username}`);
rl.setPrompt("> ");
rl.prompt();

rl.on("line", (line) => {
  if (line.trim().length > 0) {
    call.write({ user: username, message: line });
  }
  rl.prompt();
});

rl.on("close", () => {
  call.end();
  process.exit(0);
});
