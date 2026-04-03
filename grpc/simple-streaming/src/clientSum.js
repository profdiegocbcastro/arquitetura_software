import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

/**
 * Cliente de client streaming.
 *
 * O cliente abre um stream de envio, manda vários números
 * e recebe uma única resposta ao final.
 */

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), 'proto/calculadora.proto'),
  {}
);
const calculadoraPackage = grpc.loadPackageDefinition(packageDefinition).calculadoraPackage;

function main() {
  const client = new calculadoraPackage.Calculadora(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  // A resposta será recebida apenas depois que o cliente encerrar o stream.
  const call = client.sendNumbers((err, response) => {
    if (err) {
      console.error("Erro ao enviar números:", err);
      return;
    }

    console.log(response.number)
  });

  // Cada write envia uma nova mensagem no stream.
  call.write({count: 1});
  call.write({count: 2});
  call.write({count: 3});

  // Indica ao servidor que não há mais mensagens a enviar.
  call.end();
}

main();
