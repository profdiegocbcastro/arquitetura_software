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

    const exchangeName = "exchange_livros";
    const queueName = "Fila1";
    const routingKey = "livros";

    await channel.assertExchange(exchangeName, "direct", { durable: true });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, exchangeName, routingKey);

    console.log(`Conectado à exchange '${exchangeName}' e fila '${queueName}'`);

    setInterval(() => {
      const data = {
        title: "Livro",
        author: "Diego",
        timestamp: new Date().toISOString(),
      };
      sendData(exchangeName, routingKey, data);
    }, 2 * 60 * 1000);
  } catch (error) {
    console.log("Erro ao conectar à fila:", error);
  }
}

async function sendData(exchangeName, routingKey, data) {
  try {
    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)));
    console.log("Mensagem enviada:", data);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }
}

app.listen(PORT, () =>
  console.log("Produtor rodando na porta: " + PORT)
);
