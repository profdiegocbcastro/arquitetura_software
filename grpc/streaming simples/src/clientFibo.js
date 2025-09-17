import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

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

  const call = client.getFibonacci({count: 10});
  call.on('data', (response) => {
    console.log(response.number)
  });

  call.on('end', (response) => {
    console.log("Finalizou")
  })
}

main();
