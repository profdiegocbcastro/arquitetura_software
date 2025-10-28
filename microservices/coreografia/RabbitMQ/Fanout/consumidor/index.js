const amqp = require("amqplib");

async function connectQueue(queueName) {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    const channel = await connection.createChannel();

    console.log(`Consumidor conectado à fila '${queueName}'`);

    channel.consume(queueName, (msg) => {
      if (msg) {
        const conteudo = JSON.parse(msg.content.toString());
        console.log(`Mensagem recebida na ${queueName}:`, conteudo);

        setTimeout(() => {
          channel.ack(msg);
          console.log(`Mensagem processada na ${queueName}`);
        }, 1 * 20 * 1000);
      }
    }, { noAck: false });

  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}

// Exemplo: criar 3 consumidores, poderia ser 3 microserviços diferentes, fiz assim para simplificar
connectQueue("Fila1");
connectQueue("Fila2");
connectQueue("Fila3");
