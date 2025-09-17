import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

function getFibonacci(call) {
  const count = call.request.count;
  let a = 0, b = 1;
  let sent = 0;

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

function sendNumbers(call, callback) {
  let total = 0;

  call.on("data", (request) => {
    total += request.count;
  });

  call.on("end", () => {
    callback(null, { number: total });
  });
}

const server = new grpc.Server();

const packageDefinition = protoLoader.loadSync( path.join(process.cwd(), 'proto/calculadora.proto'),{});
const calculadoraPackage = grpc.loadPackageDefinition(packageDefinition).calculadoraPackage;

server.addService(calculadoraPackage.Calculadora.service, {
  getFibonacci: getFibonacci,
  sendNumbers: sendNumbers
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});