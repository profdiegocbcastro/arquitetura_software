const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer-app',
  brokers: ['localhost:9092'],
});

const groupId = process.argv[2] || 'group-default';
const consumer = kafka.consumer({ groupId });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  console.log(`🟢 Consumer iniciado no grupo: ${groupId}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log(
          `📩 [${groupId}] recebeu da partição ${partition}:`,
          data
        );
      } catch (err) {
        console.log('JSON inválido');
      }
    },
  });
};

run().catch(console.error);
