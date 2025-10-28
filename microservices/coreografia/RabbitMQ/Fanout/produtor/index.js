const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = process.env.PORT || 4003;
app.use(express.json());

let channel, connection;

connectQueue();

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    channel = await connection.createChannel();

    const exchangeName = "exchange_fanout_livros";
    const filas = ["Fila1", "Fila2", "Fila3"];

    await channel.assertExchange(exchangeName, "fanout", { durable: true });

    for (const fila of filas) {
      await channel.assertQueue(fila, { durable: true });
      await channel.bindQueue(fila, exchangeName, "");
      console.log(`Fila '${fila}' ligada à exchange '${exchangeName}'`);
    }

    setInterval(() => {
      const data = {
        title: "Livro Fanout",
        author: "Diego",
        timestamp: new Date().toISOString(),
      };
      channel.publish(exchangeName, "", Buffer.from(JSON.stringify(data)));
      console.log("Mensagem enviada:", data);
    }, 1 * 60 * 1000);

  } catch (error) {
    console.log("Erro ao conectar à fila:", error);
  }
}

app.listen(PORT, () =>
  console.log("Produtor rodando na porta: " + PORT)
);
