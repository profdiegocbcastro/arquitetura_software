const amqp = require("amqplib");

async function connectQueue() {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    const channel = await connection.createChannel();

    const exchangeName = "exchange_livros";
    const queueName = "Fila1";
    const routingKey = "livros";

    await channel.assertExchange(exchangeName, "direct", { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, routingKey);

    await channel.prefetch(1);

    console.log(`Consumidor conectado à exchange '${exchangeName}' e fila '${queueName}'`);

    channel.consume(queueName, async (msg) => {
      if (msg) {
        const conteudo = JSON.parse(msg.content.toString());
        console.log("Mensagem recebida:", conteudo);

        setTimeout(() => {
          channel.ack(msg);
          console.log("Mensagem processada e confirmada");
        }, 2 * 60 * 1000); // 2 minutos
      }
    }, { noAck: false });

  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}

connectQueue();
