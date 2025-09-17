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

  const call = client.sendNumbers((err, response) => {
    console.log(response.number)
  });

  call.write({count: 1});
  call.write({count: 2});
  call.write({count: 3});

  call.end();
}

main();
