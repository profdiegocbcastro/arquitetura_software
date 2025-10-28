const amqp = require("amqplib");

async function consume(queueName) {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    console.log(`Consumidor conectado à fila '${queueName}'`);

    channel.consume(queueName, (msg) => {
      if (msg) {
        const conteudo = JSON.parse(msg.content.toString());
        console.log(`Mensagem recebida na ${queueName}:`, conteudo);
        channel.ack(msg);
      }
    }, { noAck: false });

  } catch (err) {
    console.error("Erro no consumidor:", err);
  }
}

// Consumidores para cada fila
consume("filaTecnologia");
consume("filaLog");
