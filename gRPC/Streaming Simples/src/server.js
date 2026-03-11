import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

/**
 * Arquivo principal do servidor gRPC.
 *
 * Este exemplo possui:
 * 1) Server streaming com Fibonacci
 * 2) Client streaming com soma de números
 */


/**
 * Implementação de:
 * rpc getFibonacci (Contador) returns (stream Resposta)
 *
 * Leitura da assinatura:
 * - o cliente envia uma única mensagem do tipo Contador
 * - o servidor responde com várias mensagens do tipo Resposta
 *
 * Por isso este método escreve vários itens no stream com call.write(...)
 * e finaliza a transmissão com call.end().
 */
function getFibonacci(call) {
  const count = call.request.count;
  let a = 0, b = 1;
  let sent = 0;

  // Envia um número por vez para o cliente, mantendo o stream aberto.
  const interval = setInterval(() => {
    if (sent >= count) {
      clearInterval(interval);
      call.end();
      return;
    }

    call.write({ number: a });

    const next = a + b;
    a = b;
    b = next;
    sent++;
  }, 1000);
}

/**
 * Implementação de:
 * rpc sendNumbers (stream Contador) returns (Resposta)
 *
 * Leitura da assinatura:
 * - o cliente envia várias mensagens do tipo Contador
 * - o servidor devolve uma única mensagem do tipo Resposta
 *
 * Por isso os dados chegam em vários eventos "data".
 * Quando o cliente termina o envio, o evento "end" é disparado
 * e o servidor devolve a resposta final usando callback(...).
 */
function sendNumbers(call, callback) {
  let total = 0;

  // Cada evento "data" representa uma nova mensagem enviada pelo cliente.
  call.on("data", (request) => {
    total += request.count;
  });

  // Quando o cliente termina o envio, o servidor devolve a soma acumulada.
  call.on("end", () => {
    callback(null, { number: total });
  });
}

const server = new grpc.Server();

/**
 * Carregando o contrato .proto e registrando as implementações dos métodos do serviço gRPC no servidor.
 */
const packageDefinition = protoLoader.loadSync( path.join(process.cwd(), 'proto/calculadora.proto'),{});
const calculadoraPackage = grpc.loadPackageDefinition(packageDefinition).calculadoraPackage;

server.addService(calculadoraPackage.Calculadora.service, {
  getFibonacci: getFibonacci,
  sendNumbers: sendNumbers
});

/**
 * Publicando o servidor gRPC na porta 50051.
 */
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});
