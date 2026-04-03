import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

/**
 * Cliente de server streaming.
 *
 * Envia uma requisição única para o servidor e
 * recebe vários eventos de resposta ao longo do tempo.
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

  // O retorno é um stream de leitura.
  const call = client.getFibonacci({count: 10});

  call.on('data', (response) => {
    console.log(response.number)
  });

  // O evento "end" indica que o servidor concluiu o envio.
  call.on('end', () => {
    console.log("Finalizou")
  })
}

main();
