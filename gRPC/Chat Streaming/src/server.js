import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

/**
 * Servidor de chat com bidirectional streaming.
 *
 * Cada cliente conectado mantém um stream ativo.
 * Quando um cliente envia uma mensagem, o servidor
 * retransmite essa mensagem para os demais.
 */

const clients = [];

/**
 * Implementação de:
 * rpc Chat (stream ChatMessage) returns (stream ChatMessage)
 *
 * Leitura da assinatura:
 * - o cliente pode enviar várias mensagens para o servidor
 * - o servidor também pode enviar várias mensagens para o cliente
 *
 * Nesse tipo de método não usamos callback para devolver uma única resposta.
 * Em vez disso, o parâmetro "call" representa o stream bidirecional inteiro.
 *
 * Com ele, o servidor pode:
 * - receber mensagens com call.on("data", ...)
 * - enviar mensagens com call.write(...)
 * - encerrar a conexão com call.end()
 *
 * Neste exemplo, cada cliente conectado fica armazenado em memória.
 * Quando uma mensagem chega, o servidor retransmite esse conteúdo
 * para os outros clientes conectados.
 */
function chat(call) {
  // Armazena o stream do cliente para futuros broadcasts.
  clients.push(call);

  call.on("data", (chatMessage) => {
    console.log(`[${chatMessage.user}] ${chatMessage.message}`);

    // Envia a mensagem para todos os clientes conectados,
    // exceto para quem acabou de enviar.
    clients.forEach(clientStream => {
      if (clientStream !== call) {
        clientStream.write(chatMessage);
      }
    });
  });

  call.on("end", () => {
    // Remove o cliente encerrado da lista de streams ativos.
    const idx = clients.indexOf(call);
    if (idx >= 0) {
      clients.splice(idx, 1);
    }
    call.end();
  });
}

/**
 * ===============================
 * 2) Instanciando o servidor gRPC.
 * ===============================
*/

const server = new grpc.Server();

/**
 * Carregando o contrato .proto e registrando a implementação do serviço gRPC no servidor.
 */
const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), 'proto/chat.proto'),
  {}
);
const chatPackage = grpc.loadPackageDefinition(packageDefinition).chatPackage;
server.addService(chatPackage.Chat.service, { chat });

/**
 * Publicando o servidor gRPC na porta 50051.
 */
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`🚀 Chat server running at http://127.0.0.1:${port}`);
});
