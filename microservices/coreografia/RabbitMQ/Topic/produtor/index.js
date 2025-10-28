const amqp = require("amqplib");

async function produce() {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    const channel = await connection.createChannel();

    const exchangeName = "exchange_livros_topic";

    await channel.assertExchange(exchangeName, "topic", { durable: true });

    await channel.assertQueue("filaTecnologia", { durable: true });
    await channel.assertQueue("filaLog", { durable: true });

    await channel.bindQueue("filaTecnologia", exchangeName, "tecnologia.*");
    await channel.bindQueue("filaLog", exchangeName, "*.log");

    console.log("Exchange e filas criadas com sucesso.");

    const mensagens = [
      { routingKey: "tecnologia.nodejs", data: { title: "Node.js Avançado", category: "tecnologia" } },
      { routingKey: "tecnologia.python", data: { title: "Python para Data Science", category: "tecnologia" } },
      { routingKey: "tecnologia.log", data: { title: "Livros Clássicos", category: "literatura" } },
      { routingKey: "teste.log", data: { title: "Didática Moderna", category: "educacao" } },
    ];

    mensagens.forEach((msg) => {
      channel.publish(exchangeName, msg.routingKey, Buffer.from(JSON.stringify(msg.data)), { persistent: true });
      console.log(`Mensagem enviada com routingKey '${msg.routingKey}':`, msg.data);
    });

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);

  } catch (err) {
    console.error("Erro no produtor:", err);
  }
}

produce();
