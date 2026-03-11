import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import readline from 'readline';

/**
 * Cliente de terminal para o chat gRPC.
 *
 * Fluxo deste arquivo:
 * 1) Carregar o contrato .proto
 * 2) Criar o client stub
 * 3) Abrir um stream bidirecional com o servidor
 * 4) Ler mensagens digitadas no terminal
 * 5) Exibir mensagens recebidas de outros usuários
 */

/**
 * ===============================
 * 1) Carregando o contrato gRPC
 * ===============================
 *
 * Este contrato define o serviço Chat e a mensagem ChatMessage.
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), '../proto/chat.proto'),
  {}
);
const chatPackage = grpc.loadPackageDefinition(packageDefinition).chatPackage;

/**
 * ===============================
 * 2) Identificando o usuário
 * ===============================
 *
 * O nome do usuário é recebido pela linha de comando:
 *
 * node src/client.js Gabriel
 */
const username = process.argv[2];

if (!username) {
  console.error('Informe um nome de usuário. Exemplo: node src/client.js Gabriel');
  process.exit(1);
}

/**
 * ===============================
 * 3) Criando o client stub
 * ===============================
 *
 * O client stub representa localmente o serviço remoto.
 */
const client = new chatPackage.Chat(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

/**
 * ===============================
 * 4) Abrindo o stream de chat
 * ===============================
 *
 * Como o método Chat é bidirecional, este stream permite:
 * - enviar mensagens para o servidor
 * - receber mensagens do servidor
 */
const call = client.chat();

/**
 * ===============================
 * 5) Configurando a interface do terminal
 * ===============================
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`👋 Você entrou no chat como: ${username}`);
rl.setPrompt('> ');
rl.prompt();

/**
 * ===============================
 * 6) Recebendo mensagens do servidor
 * ===============================
 *
 * Sempre que outro cliente enviar uma mensagem, o servidor
 * retransmitirá esse conteúdo para os demais participantes.
 */
call.on('data', (message) => {
  if (message.user === username) {
    return;
  }

  console.log(`\n[${message.user}]: ${message.message}`);
  rl.prompt();
});

/**
 * Caso ocorra alguma falha na conexão ou no stream.
 */
call.on('error', (error) => {
  console.error('Erro no stream do chat:', error.message);
});

/**
 * ===============================
 * 7) Enviando mensagens ao servidor
 * ===============================
 *
 * Cada linha digitada no terminal vira uma mensagem ChatMessage.
 */
rl.on('line', (line) => {
  const message = line.trim();

  if (message.length === 0) {
    rl.prompt();
    return;
  }

  call.write({ user: username, message });
  rl.prompt();
});

/**
 * ===============================
 * 8) Encerrando o cliente
 * ===============================
 *
 * Quando o usuário fecha o terminal, o stream é encerrado.
 */
rl.on('close', () => {
  call.end();
  process.exit(0);
});
